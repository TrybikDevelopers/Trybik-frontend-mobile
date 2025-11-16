import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createBatchActionsStyles } from './styles/BatchActions.styles.ts';

interface BatchActionsProps {
  hasSelection: boolean;
  onDelete: () => void;
  onAdd: () => void;
  removeCourseLabel: string;
}

const BatchActions: React.FC<BatchActionsProps> = ({
  hasSelection,
  onDelete,
  onAdd,
  removeCourseLabel,
}) => {
  const theme = useTheme();
  const styles = createBatchActionsStyles(theme as Theme);
  if (hasSelection) {
    return (
      <View style={styles.removeCourseMenuBtn}>
        <TouchableOpacity onPress={onDelete}>
          <View style={styles.removeButtonContents}>
            <MaterialIcons name="delete" size={24} color="#fff" />
            <Text style={styles.removeCourseMenuBtnText}>{removeCourseLabel}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.addCourseMenuBtn}>
      <TouchableOpacity onPress={onAdd}>
        <Text style={styles.addCourseMenuBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BatchActions;
