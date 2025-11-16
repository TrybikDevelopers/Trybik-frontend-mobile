import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { CalcItem } from '../types';
import ItemRow from './ItemRow';
import { createSubjectsListStyles } from './styles/SubjectsList.styles.ts';

interface SubjectsListProps {
  data: CalcItem[];
  selectedItems: string[];
  onToggleSelect: (key: string) => void;
  onPressItem: (item: CalcItem) => void;
  checkedIcon: string;
}

const SubjectsList: React.FC<SubjectsListProps> = ({
  data,
  selectedItems,
  onToggleSelect,
  onPressItem,
  checkedIcon,
}) => {
  const theme = useTheme();
  const styles = createSubjectsListStyles(theme as Theme);
  const renderItem = ({ item }: { item: CalcItem }) => (
    <ItemRow
      item={item}
      isSelected={selectedItems.includes(item.key)}
      onToggleSelect={onToggleSelect}
      onPressItem={onPressItem}
      checkedIcon={checkedIcon}
    />
  );

  return (
    <View style={styles.subjectsListContainer}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={i => i.key} />
    </View>
  );
};

export default SubjectsList;
