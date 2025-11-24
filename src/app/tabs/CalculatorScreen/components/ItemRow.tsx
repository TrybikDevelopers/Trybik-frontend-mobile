import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { CalcItem } from '../types';
import { createItemRowStyles } from './styles/ItemRow.styles.ts';

interface ItemRowProps {
  item: CalcItem;
  isSelected: boolean;
  onToggleSelect: (key: string) => void;
  onPressItem: (item: CalcItem) => void;
  checkedIcon: string;
}

const ItemRow: React.FC<ItemRowProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onPressItem,
  checkedIcon,
}) => {
  const theme = useTheme();
  const styles = createItemRowStyles(theme as Theme);
  return (
    <TouchableOpacity onPress={() => onPressItem(item)}>
      <View style={styles.rootItemContainer}>
        <TouchableOpacity
          style={[
            styles.ItemSelectBox,
            isSelected && styles.ItemSelectBoxSelected,
          ]}
          onPress={() => onToggleSelect(item.key)}
        >
          <Text style={styles.deleteButtonText}>
            {isSelected ? checkedIcon : ''}
          </Text>
        </TouchableOpacity>
        <View style={styles.itemContainer}>
          <Text style={[styles.bottomMenu, styles.singleItem, styles.leftText]}>
            {item.subjectName}
          </Text>
          <Text
            style={[styles.bottomMenu, styles.singleItem, styles.centerText]}
          >
            {item.ects}
          </Text>
          <Text
            style={[styles.bottomMenu, styles.singleItem, styles.rightText]}
          >
            {item.grade}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemRow;
