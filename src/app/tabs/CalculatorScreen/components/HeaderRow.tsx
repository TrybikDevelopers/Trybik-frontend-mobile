import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createHeaderRowStyles } from './styles/HeaderRow.styles';

interface HeaderRowProps {
  subjectLabel: string;
  gradeLabel: string;
  onToggleSelectAll: () => void;
  selectedIcon: string;
  hasSelection: boolean;
}

const HeaderRow: React.FC<HeaderRowProps> = ({
  subjectLabel,
  gradeLabel,
  onToggleSelectAll,
  selectedIcon,
  hasSelection,
}) => {
  const theme = useTheme();
  const styles = createHeaderRowStyles(theme as Theme);
  return (
    <View style={styles.headerRootItemContainer}>
      <TouchableOpacity
        style={[styles.itemSelectAllBox, hasSelection && styles.itemSelectAllBoxSelected]}
        onPress={onToggleSelectAll}
      >
        <Text style={styles.deleteButtonText}>{selectedIcon}</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text
          style={[styles.bottomMenu, styles.singleItemHeader, styles.leftText]}
        >
          {subjectLabel}
        </Text>
        <Text
          style={[
            styles.bottomMenu,
            styles.singleItemHeader,
            styles.centerText,
          ]}
        >
          ECTS
        </Text>
        <Text
          style={[styles.bottomMenu, styles.singleItemHeader, styles.rightText]}
        >
          {gradeLabel}
        </Text>
      </View>
    </View>
  );
};

export default HeaderRow;
