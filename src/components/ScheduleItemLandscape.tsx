import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../src/styles/globalTheme/theme';
import { createScheduleItemStyles } from '../styles/ScheduleItemLandscapeStyles';
import SubjectName from './ui/SubjectName';
import RoomInfo from './ui/RoomInfo';
import LetterIcon from './ui/letterIcon';
import type { ScheduleItemLandscapeProps } from '../types/global';
import { BAR_WIDTH, BAR_HEIGHT } from './../constants/constants';

const ScheduleItemLandscape: React.FC<ScheduleItemLandscapeProps> = ({
  subject,
  room,
  type,
  bgColor,
  isActive,
}) => {
  const theme = useTheme<Theme>();
  const styles = createScheduleItemStyles(theme);

  return (
    <View
      style={[
        styles.ScreenContainer,
        !room && { backgroundColor: 'transparent' },
        isActive && {
          borderColor: theme.colors.confirmAccent + 'ce',
          borderWidth: 1,
        },
      ]}
    >
      <View style={ActiveBarStyles.bar} />

      <View style={styles.contentContainer}>
        <View style={styles.leftColumn}>
          <SubjectName subject={subject} />
          {room && <RoomInfo room={room} />}
        </View>

        <View style={styles.rightColumn}>
          <LetterIcon bgColor={bgColor} letter={type} />
        </View>
      </View>
    </View>
  );
};

const ActiveBarStyles = StyleSheet.create({
  bar: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    borderRadius: BAR_WIDTH / 2,
    marginVertical: 4,
  },
});

export default ScheduleItemLandscape;
