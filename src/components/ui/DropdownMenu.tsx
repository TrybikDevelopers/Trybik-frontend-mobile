import { useTheme } from '@shopify/restyle';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../styles/globalTheme/theme';
import { createDropdownMenuStyles } from '../../styles/uiStyles/DropdownMenuStyles';
// Local props interface for DropdownMenu component
interface Props {
  items: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  placeholder: string;
  error?: boolean;
}

const DropdownMenu: React.FC<Props> = ({
  items,
  selectedValue,
  onSelect,
  placeholder,
  error,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const theme = useTheme<Theme>();
  const MenuStyles = createDropdownMenuStyles(theme);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <View>
      <TouchableOpacity
        style={[MenuStyles.button, isOpen && MenuStyles.buttonPressed, error && MenuStyles.errorBorder]}
        onPress={() => handleClick()}
      >
        {selectedValue ? (
          <Text style={MenuStyles.groupSelectText}>{selectedValue}</Text>
        ) : (
          <Text style={MenuStyles.placeholderText}>{placeholder}</Text>
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={[MenuStyles.modal, MenuStyles.list]}>
          <FlatList
            data={items}
            keyExtractor={item => item}
            style={[MenuStyles.flatList]}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  handleClick();
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
