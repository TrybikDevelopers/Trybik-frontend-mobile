import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../styles/globalTheme/theme';
import { createTimetableStyles } from './timetable.styles';
import { useTranslation } from 'react-i18next';

import {
  getAcademicHours,
  getTimetableByGroup,
} from '../../../services/timetable/TimetableService';
import getCurrentWeekType from '../../../utils/getCurrentWeekType';

import {
  useSettingsStore,
  useSettingsActions,
} from '../../../store/settingsStore';
import { useTimetableStore } from '../../../store/timetableStore';

import ConnectionAlertModal from '../../../components/modals/ConnectionAlertModal';
import LandscapeView from './Components/LandscapeView';
import PortraitView from './Components/PortraitView';

const TimetableScreen = () => {
  const { timetable, academicHours, actions } = useTimetableStore();
  const { setTimetable, setAcademicHours, markOffline } = actions;

  const [DayIndex, setDayIndex] = useState(0);
  const [OddWeek, setOddWeek] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { t } = useTranslation();
  const error = useSettingsStore(state => state.error);
  const { clearError, setError } = useSettingsActions();

  const groups = useSettingsStore(state => state.groups);
  const loading = useSettingsStore(state => state.loading);
  const showEmptySlots = useSettingsStore(state => state.showEmptySlots);
  const showLectures = useSettingsStore(state => state.showLectures);
  const { fetchInitialDeanGroups } = useSettingsActions();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const theme = useTheme<Theme>();
  const styles = createTimetableStyles(theme);

  const navigationRef = useRef({
    DayIndex,
    OddWeek,
    timetableLength: 0,
  });

  useEffect(() => {
    navigationRef.current = {
      DayIndex,
      OddWeek,
      timetableLength: timetable.length,
    };
  }, [DayIndex, OddWeek, timetable.length]);

  const areAllGroupsSelected = useCallback(() => !!groups.dean, [groups.dean]);

  useEffect(() => {
    if (!groups.dean) fetchInitialDeanGroups();
  }, [groups.dean, fetchInitialDeanGroups]);

  useEffect(() => {
    if (!areAllGroupsSelected()) {
      setTimetable([]);
      return;
    }

    const initialiseData = async () => {
      try {
        if (!groups.dean)
          throw new Error('General group name is required to fetch timetable');

        const [hours, timetableResponse] = await Promise.all([
          getAcademicHours(),
          getTimetableByGroup(
            groups.dean,
            groups.comp || undefined,
            groups.lab || undefined,
            groups.proj || undefined,
          ),
        ]);

        setAcademicHours(hours);
        setTimetable(timetableResponse.data);
        setOddWeek(getCurrentWeekType());

        const today = new Date();
        const jsDay = today.getDay();
        const index = jsDay === 0 || jsDay === 6 ? 0 : jsDay - 1;
        setDayIndex(index);

        markOffline(false);
      } catch (err: any) {
        markOffline(true);
        setError(err.message || 'Server error');
      }
    };

    initialiseData();
  }, [
    groups.dean,
    groups.comp,
    groups.lab,
    groups.proj,
    areAllGroupsSelected,
    setAcademicHours,
    setTimetable,
    setError,
    markOffline,
  ]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (!groups.dean)
        throw new Error('General group name is required to fetch timetable');

      const [hours, timetableResponse] = await Promise.all([
        getAcademicHours(),
        getTimetableByGroup(
          groups.dean,
          groups.comp || undefined,
          groups.lab || undefined,
          groups.proj || undefined,
        ),
      ]);

      setAcademicHours(hours);
      setTimetable([...timetableResponse.data]);
      markOffline(false);
    } catch (err: any) {
      markOffline(true);
      setError(err.message || 'Refresh error');
    } finally {
      setRefreshing(false);
    }
  }, [
    groups.comp,
    groups.dean,
    groups.lab,
    groups.proj,
    setError,
    setAcademicHours,
    setTimetable,
    markOffline,
  ]);

  // Navigation between days
  const navigateToNextDay = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);

    const { DayIndex: currentIndex, timetableLength } = navigationRef.current;

    if (currentIndex < timetableLength - 1) {
      setDayIndex(currentIndex + 1);
    } else {
      setOddWeek(prev => !prev);
      setDayIndex(0);
    }

    setTimeout(() => setIsNavigating(false), 200);
  }, [isNavigating]);

  const navigateToPrevDay = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);

    const { DayIndex: currentIndex, timetableLength } = navigationRef.current;

    if (currentIndex > 0) {
      setDayIndex(currentIndex - 1);
    } else {
      setOddWeek(prev => !prev);
      setDayIndex(timetableLength - 1);
    }

    setTimeout(() => setIsNavigating(false), 200);
  }, [isNavigating]);

  // Ekran ładowania
  if (loading) {
    return (
      <View style={styles.bgContainer}>
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{t('groupLoad')}</Text>
          </View>
        </View>
      </View>
    );
  }

  // Main render
  return (
    <View style={styles.bgContainer}>
      {!isLandscape ? (
        <PortraitView
          theme={theme}
          timetable={timetable}
          academicHours={academicHours}
          currentDayIndex={DayIndex}
          isOddWeek={OddWeek}
          refreshing={refreshing}
          showEmptySlots={showEmptySlots}
          showLectures={showLectures}
          onRefresh={onRefresh}
          navigateToPrevDay={navigateToPrevDay}
          navigateToNextDay={navigateToNextDay}
          setIsOddWeek={setOddWeek}
        />
      ) : (
        <LandscapeView
          timetable={timetable}
          academicHours={academicHours}
          isOddWeek={OddWeek}
          setIsOddWeek={setOddWeek}
          showLectures={showLectures}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      <ConnectionAlertModal
        visible={!!error}
        onRetry={() => {
          clearError();
          onRefresh();
        }}
        onClose={clearError}
      />
    </View>
  );
};

export default TimetableScreen;
