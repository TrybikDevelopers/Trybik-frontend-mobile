import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createBatchActionsStyles } from './styles/BatchActions.styles.ts';
import { Plus } from 'lucide-react-native';

interface BatchActionsProps {
  hasSelection: boolean;
  onDelete: () => void;
  onAdd: () => void;
}

const BatchActions: React.FC<BatchActionsProps> = ({
  hasSelection,
  onDelete,
  onAdd,
}) => {
  const theme = useTheme();
  const styles = createBatchActionsStyles(theme as Theme);
  if (hasSelection) {
    return (
      <TouchableOpacity onPress={onDelete} style={styles.removeCourseMenuBtn}>
        <View style={styles.removeButtonContents}>
          <MaterialIcons name="delete" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onAdd} style={styles.addCourseMenuBtn}>
      <Text style={styles.addCourseMenuBtnText}>
        <Plus size={30} strokeWidth={3} color="#fff" />
      </Text>
    </TouchableOpacity>
  );
};

export default BatchActions;
