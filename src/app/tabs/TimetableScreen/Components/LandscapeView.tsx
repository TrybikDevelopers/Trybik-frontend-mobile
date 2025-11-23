import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LessonSeparator from './LessonSeparator';
import HourDisplay from '../../../../components/ui/HourDisplay';
import ScheduleItemLandscape from '../../../../components/ScheduleItemLandscape';
import { getFullSchedule } from '../../../../utils/getFullSchedule';
import { getCorrectColor } from '../../../../utils/getCorrectColor';
import getCorrectLetter from '../../../../utils/getCorrectLetter';
import checkActiveLesson from '../../../../services/timetable/checkActiveLesson';
import { TimetableItem } from '../../../../types/global';
import { useTranslation } from 'react-i18next';
import { createLandscapeViewStyles } from './styles/LandscapeView.styles.ts';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';

const dayNameMap: Record<string, string> = {
  Poniedziałek: 'Monday',
  Wtorek: 'Tuesday',
  Środa: 'Wednesday',
  Czwartek: 'Thursday',
  Piątek: 'Friday',
  Sobota: 'Saturday',
  Niedziela: 'Sunday',
};

interface LandscapeViewProps {
  timetable: any[];
  academicHours: string[];
  isOddWeek: boolean;
  setIsOddWeek: React.Dispatch<React.SetStateAction<boolean>>;
  hideLectures: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}

const LandscapeView: React.FC<LandscapeViewProps> = ({
  timetable,
  academicHours,
  isOddWeek,
  setIsOddWeek,
  hideLectures,
  refreshing,
  onRefresh,
}) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createLandscapeViewStyles(theme);

  const getWeekTypeText = () => (isOddWeek ? t('oddWeek') : t('evenWeek'));

  const renderLesson = (item: TimetableItem, currentDay: string) => {
    const isActive = checkActiveLesson(
      item,
      academicHours,
      currentDay,
      isOddWeek,
    );
    const isEmptySlot = !item.name;

    return (
      <ScheduleItemLandscape
        subject={item.name || ''}
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.mainRow}>
        {/* Hours column */}
        <View style={styles.hoursColumn}>
          <TouchableOpacity
            style={styles.weekIndicator}
            onPress={() => setIsOddWeek(prev => !prev)}
            hitSlop={15}
          >
            <Icon
              name="sync-alt"
              size={15}
              color={theme.colors.themeOpposite}
            />
            <Text style={styles.weekTypeText}>{getWeekTypeText()}</Text>
          </TouchableOpacity>

          {academicHours.map((hour, index) => {
            const [startTime, endTime] = hour.split('-').map(s => s.trim());
            return (
              <View key={index} style={styles.hourBlock}>
                <HourDisplay
                  startTime={startTime}
                  endTime={endTime}
                  isActive={false}
                />
                {index < academicHours.length - 1 && <LessonSeparator />}
              </View>
            );
          })}
        </View>

        {/* Days columns */}
        {timetable.map(day => {
          let lessons = isOddWeek ? day.odd : day.even;

          if (hideLectures) {
            lessons = lessons.filter(
              (item: TimetableItem) => item.type !== 'LECTURE',
            );
          }

          const fullLessons = getFullSchedule(academicHours, lessons);

          return (
            <View key={day.name} style={styles.dayColumn}>
              <Text style={styles.dayTitleLandscape}>
                {t(`dayNames.${dayNameMap[day.name]}`)}
              </Text>
              {fullLessons.map((lesson: TimetableItem, index: number) => (
                <View
                  key={`${lesson.rowId}-${lesson.classroom}`}
                  style={styles.lessonBlock}
                >
                  {renderLesson(lesson, day.name)}
                  {index < fullLessons.length - 1 && <LessonSeparator />}
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LandscapeView;
