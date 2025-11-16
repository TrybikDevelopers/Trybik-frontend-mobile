import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text } from 'react-native';
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';
import { getSubjectList } from '../../../services/calculator/CalculatorService';
import { useSettingsStore } from '../../../store/settingsStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';
import createCalculatorStyles from './styles/CalculatorScreen.styles.ts';
import HeaderRow from './components/HeaderRow';
import SummaryPanel from './components/SummaryPanel';
import BatchActions from './components/BatchActions';
import PopupForm from './components/PopupForm';
import { CalcItem } from './types';
import SubjectsList from './components/SubjectsList';

// Constants promoted outside the component to avoid re-creation
const STORAGE_KEY = '@calculator_subject_list';
const GRADE_REGEX = /^(2(\.0)?|2\.5|3(\.0)?|3\.5|4(\.0)?|4\.5|5(\.0)?)$/;
const ICON_CHECK = '\u2713';
const ICON_SQUARE = '\u25A0';

function CalculatorScreen() {
  const theme = useTheme();
  const styles = createCalculatorStyles(theme as Theme);
  const { t } = useTranslation();

  const [subjectList, setSubjectList] = useState<CalcItem[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [ectsPoints, setEctsPoints] = useState('');
  const [grade, setGrade] = useState('');

  const [subjectError, setSubjectError] = useState(false);
  const [ectsError, setEctsError] = useState(false);
  const [gradeError, setGradeError] = useState(false);

  const [popUpMenuVisible, setPopUpMenuVisible] = useState(false);
  // Focus states now handled inside PopupForm
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Dropdown and focus states now handled inside PopupForm; removed local state.
  const deanGroup = useSettingsStore(state => state.groups.dean);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);

  const [itemBeingEdited, setItemBeingEdited] = useState<CalcItem | null>(null);

  // Fetch subjects when deanGroup changes
  useEffect(() => {
    if (!deanGroup) return;
    (async () => {
      try {
        const response = await getSubjectList(deanGroup.toString());
        if (response) setAllSubjects(response);
      } catch (error) {
        console.error('Error fetching subject list:', error);
      }
    })();
  }, [deanGroup]);

  const saveSubjectList = async (list: CalcItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.error('Błąd zapisu listy przedmiotów:', error);
    }
  };

  const loadSubjectList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) setSubjectList(JSON.parse(jsonValue));
    } catch (error) {
      console.error('Błąd odczytu listy przedmiotów:', error);
    }
  };

  useEffect(() => {
    loadSubjectList();
  }, []);
  useEffect(() => {
    saveSubjectList(subjectList);
  }, [subjectList]);

  // Derived values memoized to avoid repeated computations on render
  const totalEcts = useMemo(
    () => subjectList.reduce((sum, item) => sum + parseInt(item.ects, 10), 0),
    [subjectList],
  );

  const averageGrade = useMemo(() => {
    if (subjectList.length === 0) return '0.00';
    const sum = subjectList.reduce(
      (acc, item) => acc + parseFloat(item.grade),
      0,
    );
    return (sum / subjectList.length).toFixed(2);
  }, [subjectList]);

  const weightedAverage = useMemo(() => {
    if (subjectList.length === 0 || totalEcts === 0) return '0.00';
    const weightedSum = subjectList.reduce(
      (acc, item) => acc + parseFloat(item.grade) * parseInt(item.ects, 10),
      0,
    );
    return (weightedSum / totalEcts).toFixed(2);
  }, [subjectList, totalEcts]);

  const resetPopupFields = () => {
    setSubjectName('');
    setEctsPoints('');
    setGrade('');
    setSubjectError(false);
    setEctsError(false);
    setGradeError(false);
    setItemBeingEdited(null);
    // Focus state resets handled internally by PopupForm now.
  };

  const handleCancel = () => {
    resetPopupFields();
    setPopUpMenuVisible(false);
  };

  const validate = () => {
    let valid = true;
    setSubjectError(false);
    setEctsError(false);
    setGradeError(false);

    if (!subjectName.trim()) {
      setSubjectError(true);
      valid = false;
    }

    const ectsInt = parseInt(ectsPoints, 10);
    if (isNaN(ectsInt) || ectsInt <= 0) {
      setEctsError(true);
      valid = false;
    }

    if (!GRADE_REGEX.test(grade)) {
      setGradeError(true);
      valid = false;
    }

    return valid;
  };

  const handleConfirm = () => {
    if (!validate()) return;

    setSubjectList(list =>
      itemBeingEdited
        ? list.map(i =>
            i.key === itemBeingEdited.key
              ? { ...i, subjectName, ects: ectsPoints, grade }
              : i,
          )
        : [
            ...list,
            {
              key: uuid.v4().toString(),
              subjectName,
              ects: ectsPoints,
              grade,
            },
          ],
    );

    handleCancel();
  };

  const openAddMenu = () => {
    resetPopupFields();
    setPopUpMenuVisible(true);
  };

  const openEditMenu = (item: CalcItem) => {
    setItemBeingEdited(item);
    setSubjectName(item.subjectName);
    setEctsPoints(item.ects);
    setGrade(item.grade);
    setPopUpMenuVisible(true);
  };

  const selectItem = useCallback((key: string) => {
    setSelectedItems(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
    );
  }, []);

  const selectAllItems = useCallback(() => {
    setSelectedItems(prev =>
      prev.length === subjectList.length ? [] : subjectList.map(i => i.key),
    );
  }, [subjectList]);

  const deleteSelectedItems = useCallback(() => {
    setSubjectList(list => list.filter(i => !selectedItems.includes(i.key)));
    setSelectedItems([]);
  }, [selectedItems]);

  const selectedIcon = useMemo(() => {
    if (selectedItems.length === subjectList.length && selectedItems.length > 0)
      return ICON_CHECK;
    if (selectedItems.length > 0) return ICON_SQUARE;
    return '';
  }, [selectedItems, subjectList.length]);

  // --- PopupForm grouped props for readability ---
  const popupVisibility = {
    isVisible: popUpMenuVisible,
    isEditMode: !!itemBeingEdited,
  };

  const popupValues = {
    subjectName,
    ectsPoints,
    grade,
  };

  const popupErrors = {
    subject: subjectError,
    ects: ectsError,
    grade: gradeError,
  };

  const popupChangeHandlers = {
    subject: setSubjectName,
    ects: setEctsPoints,
    grade: setGrade,
  };

  const popupActions = {
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  };

  // renderItem now lives inside SubjectsList

  return (
    <View style={styles.container}>
      {/* Summary */}
      <SummaryPanel
        gradeAverageLabel={t('gradeAverage').replace(' ', '\n')}
        ectsSumLabel={t('ectsSum').replace(' ', '\n')}
        weightedAverageLabel={t('weightedAverage').replace(' ', '\n')}
        averageGrade={averageGrade}
        totalEcts={totalEcts}
        weightedAverage={weightedAverage}
      />

      {/* Header row */}
      <HeaderRow
        subjectLabel={t('subjectName')}
        gradeLabel={t('gradeName')}
        onToggleSelectAll={selectAllItems}
        selectedIcon={selectedIcon}
        hasSelection={selectedItems.length > 0}
      />

      {subjectList.length === 0 && (
        <View style={styles.noItemsInfo}>
          <Text style={styles.noItemsInfoText}>
            {t('noItemsAddedInfoText')}
          </Text>
          <Text style={styles.noItemsInfoText}>{t('noItemsInfoText')}</Text>
        </View>
      )}

      <SubjectsList
        data={subjectList}
        selectedItems={selectedItems}
        onToggleSelect={selectItem}
        onPressItem={openEditMenu}
        checkedIcon={ICON_CHECK}
      />

      {/* Batch delete / Add button */}
      <BatchActions
        hasSelection={selectedItems.length > 0}
        onDelete={deleteSelectedItems}
        onAdd={openAddMenu}
        removeCourseLabel={t('removeCourseMenuBtnText')}
      />

      {/* Popup form for adding/editing subjects */}
      <PopupForm
        {...popupVisibility}
        values={popupValues}
        errors={popupErrors}
        onChange={popupChangeHandlers}
        allSubjects={allSubjects}
        {...popupActions}
      />
    </View>
  );
}

export default CalculatorScreen;
