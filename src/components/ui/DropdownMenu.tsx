import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { DropdownMenuProps } from '../../types/uiTypes/DropdownMenuTypes';
// import MenuStyles from '../../styles/uiStyles/DropdownMenuStyles';
import { createDropdownMenuStyles } from '../../styles/uiStyles/DropdownMenuStyles';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../styles/globalTheme/theme';

const ITEM_HEIGHT = 45;
const MAX_LIST_HEIGHT = 200;

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  width,
  height,
  listPosUp,
  items,
  selectedValue,
  onSelect,
  isOpen,
  onOpen,
  onClose,
  placeholder,
}) => {
  const listHeight = Math.min(items.length * ITEM_HEIGHT, MAX_LIST_HEIGHT);

  const theme = useTheme<Theme>();
  const MenuStyles = createDropdownMenuStyles(theme);

  return (
    <View style={[{ width: width ?? 130, height: height ?? 40 }]}>
      <TouchableOpacity
        style={[MenuStyles.button, MenuStyles.buttonSizes]}
        onPress={() => (isOpen ? onClose() : onOpen())}
      >
        {selectedValue ? (
          <Text style={MenuStyles.groupSelectText}>{selectedValue}</Text>
        ) : (
          <Text style={MenuStyles.placeholderText}>{placeholder}</Text>
        )}
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            MenuStyles.modal,
            MenuStyles.list,
            {
              top: listPosUp ? -listHeight : height ?? 40,
              height: listHeight,
            },
          ]}
        >
          <FlatList
            data={items}
            keyExtractor={item => item}
            style={{ flexGrow: 0 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={MenuStyles.option}
              >
                <Text style={MenuStyles.groupSelectText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

// Memoize to prevent unnecessary re-renders
  export default React.memo(DropdownMenu);
