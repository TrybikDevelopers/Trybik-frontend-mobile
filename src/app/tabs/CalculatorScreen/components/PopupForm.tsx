import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DropdownMenu from '../../../../components/ui/DropdownMenu';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createPopupFormStyles } from './styles/PopupForm.styles.ts';
import { useTranslation } from 'react-i18next';

interface FormValues {
  subjectName: string;
  ectsPoints: string;
  grade: string;
}

interface FormErrors {
  subject: boolean;
  ects: boolean;
  grade: boolean;
}

interface PopupFormProps {
  isVisible: boolean;
  isEditMode: boolean;
  values: FormValues;
  errors: FormErrors;
  allSubjects: string[];
  onChange: {
    subject: (val: string) => void;
    ects: (val: string) => void;
    grade: (val: string) => void;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({
  isVisible,
  values,
  errors,
  onChange,
  onConfirm,
  onCancel,
  allSubjects,
}) => {
  const theme = useTheme();
  const styles = createPopupFormStyles(theme as Theme);
  const { t } = useTranslation();
  const ectsInputRef = useRef<TextInput>(null);
  const gradeInputRef = useRef<TextInput>(null);
  const [ectsFocused, setEctsFocused] = useState(false);
  const [gradeFocused, setGradeFocused] = useState(false);

  const {
    subject: onChangeSubject,
    ects: onChangeEcts,
    grade: onChangeGrade,
  } = onChange;
  const { subjectName, ectsPoints, grade } = values;
  const { subject: subjectError, ects: ectsError, grade: gradeError } = errors;

  if (!isVisible) return null;

  // Field titles & placeholders
  const subjectTitle = t('subjectName');
  const ectsTitle = t('ECTSVal');
  const gradeTitle = t('gradeName');
  const subjectPlaceholder = t('placeholderCalc');
  const ectsPlaceholder = t('placeholderCalc2');
  const gradePlaceholder = t('gradePlaceholder');

  // Action button labels
  const confirmLabel = t('confirmButton');
  const cancelLabel = t('cancelButton');

  const ectsInputStyle = [
    styles.userInput,
    ectsError && styles.invalidUserInput,
    ectsFocused && styles.userInputFocused,
    ectsError && ectsFocused && styles.userInputFocusedError,
  ];
  const gradeInputStyle = [
    styles.userInput,
    gradeError && styles.invalidUserInput,
    gradeFocused && styles.userInputFocused,
    gradeError && gradeFocused && styles.userInputFocusedError,
  ];

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.popUpMenu}>
        <View
          style={[
            styles.subjectSelect,
            subjectError && styles.subjectSelectError,
          ]}
        >
          <Text
            style={[
              styles.overlayLabel,
              subjectError && styles.overlayLabelErr,
            ]}
          >
            {subjectTitle}
          </Text>
          <View style={styles.subjectSelectDropdown}>
            <DropdownMenu
              items={allSubjects}
              selectedValue={subjectName}
              onSelect={onChangeSubject}
              placeholder={subjectPlaceholder}
              error={subjectError}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputField}>
            <Text
              style={[styles.overlayLabel, ectsError && styles.overlayLabelErr]}
            >
              {ectsTitle}
            </Text>
            <TextInput
              ref={ectsInputRef}
              style={ectsInputStyle}
              placeholder={ectsPlaceholder}
              placeholderTextColor={'#a1a1a1'}
              value={ectsPoints}
              onChangeText={onChangeEcts}
              keyboardType="numeric"
              onFocus={() => setEctsFocused(true)}
              onBlur={() => setEctsFocused(false)}
            />
          </View>

          <View style={styles.inputField}>
            <Text
              style={[
                styles.overlayLabel,
                gradeError && styles.overlayLabelErr,
              ]}
            >
              {gradeTitle}
            </Text>
            <TextInput
              ref={gradeInputRef}
              style={gradeInputStyle}
              placeholder={gradePlaceholder}
              placeholderTextColor={'#a1a1a1'}
              value={grade}
              onChangeText={onChangeGrade}
              keyboardType="numeric"
              onFocus={() => setGradeFocused(true)}
              onBlur={() => setGradeFocused(false)}
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>{cancelLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PopupForm;
