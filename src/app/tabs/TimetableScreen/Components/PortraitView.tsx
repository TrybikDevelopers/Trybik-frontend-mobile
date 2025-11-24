import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LessonSeparator from './LessonSeparator';
import ScheduleItem from '../../../../components/ScheduleItem';
import { TimetableItem } from '../../../../types/global';
import { useTranslation } from 'react-i18next';
import { getFullSchedule } from '../../../../utils/getFullSchedule';
import { getCorrectColor } from '../../../../utils/getCorrectColor';
import getCorrectLetter from '../../../../utils/getCorrectLetter';
import checkActiveLesson from '../../../../services/timetable/checkActiveLesson';
import { createPortraitViewStyles } from './styles/PortraitView.styles.ts';

const RenderLeftArrow = ({ color, size }: { color: string; size: number }) => (
  <Icon name="arrow-back-ios" color={color} size={size} />
);

const RenderRightArrow = ({ color, size }: { color: string; size: number }) => (
  <Icon name="arrow-forward-ios" color={color} size={size} />
);

const dayNameMap: Record<string, string> = {
  Poniedziałek: 'Monday',
  Wtorek: 'Tuesday',
  Środa: 'Wednesday',
  Czwartek: 'Thursday',
  Piątek: 'Friday',
  Sobota: 'Saturday',
  Niedziela: 'Sunday',
};

interface PortraitViewProps {
  theme: any;
  timetable: any[];
  academicHours: string[];
  currentDayIndex: number;
  isOddWeek: boolean;
  refreshing: boolean;
  showEmptySlots: boolean;
  showLectures: boolean;
  onRefresh: () => void;
  navigateToPrevDay: () => void;
  navigateToNextDay: () => void;
  setIsOddWeek: React.Dispatch<React.SetStateAction<boolean>>;
}

const PortraitView: React.FC<PortraitViewProps> = ({
  theme,
  timetable,
  academicHours,
  currentDayIndex,
  isOddWeek,
  refreshing,
  showEmptySlots,
  showLectures,
  onRefresh,
  navigateToPrevDay,
  navigateToNextDay,
  setIsOddWeek,
}) => {
  const { t } = useTranslation();
  const styles = createPortraitViewStyles(theme);

  const getWeekTypeText = () => (isOddWeek ? t('oddWeek') : t('evenWeek'));

  const getCurrentDayData = () => {
    const currentDay = timetable[currentDayIndex];
    if (!currentDay) return [];
    let lessons = isOddWeek ? currentDay.odd : currentDay.even;
    if (showLectures)
      lessons = lessons.filter(
        (item: TimetableItem) => item.type !== 'LECTURE',
      );
    if (!showEmptySlots) return lessons;
    return getFullSchedule(academicHours, lessons);
  };

  const renderLesson = ({ item }: { item: TimetableItem }) => {
    if (!item || typeof item.rowId !== 'number') return null;
    const hourString = academicHours[item.rowId];
    const [startTime = '??', endTime = '??'] =
      hourString?.split('-').map(s => s.trim()) ?? [];
    const isActive = checkActiveLesson(
      item,
      academicHours,
      timetable[currentDayIndex]?.name,
      isOddWeek,
    );
    const isEmptySlot = !item.name;
    return (
      <ScheduleItem
        subject={item.name || ''}
        startTime={startTime}
        endTime={endTime}
        room={item.classroom}
        bgColor={
          isEmptySlot ? '' : getCorrectColor(getCorrectLetter(item.type))
        }
        type={isEmptySlot ? '' : getCorrectLetter(item.type)}
        letterColor="white"
        isActive={isActive}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Navigation header */}
      <View style={styles.navigationHeader}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToPrevDay}>
          <RenderLeftArrow color={theme.colors.navButtonIcon} size={18} />
        </TouchableOpacity>

        <Text style={styles.dayTitle}>
          {t(
            `dayNames.${
              dayNameMap[timetable[currentDayIndex]?.name] || 'Monday'
            }`,
          )}
        </Text>

        <TouchableOpacity style={styles.navButton} onPress={navigateToNextDay}>
          <RenderRightArrow color={theme.colors.navButtonIcon} size={18} />
        </TouchableOpacity>
      </View>

      {/* Week indicator */}
      <TouchableOpacity
        style={styles.weekIndicator}
        onPress={() => setIsOddWeek(prev => !prev)}
        hitSlop={15}
      >
        <Icon name="sync-alt" size={15} color={theme.colors.themeOpposite} />
        <Text style={styles.weekText}>{getWeekTypeText()}</Text>
      </TouchableOpacity>

      {/* Lessons list */}
      {timetable[currentDayIndex] && (
        <FlatList
          key={showEmptySlots ? 'with-empty' : 'without-empty'}
          data={getCurrentDayData()}
          renderItem={renderLesson}
          keyExtractor={item =>
            `${item.rowId}-${item.classroom}-${isOddWeek ? 'odd' : 'even'}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={LessonSeparator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default PortraitView;
