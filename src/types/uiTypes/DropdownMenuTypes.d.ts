export interface DropdownMenuProps {
  width?: number;
  height?: number;
  listPosUp?: boolean;
  // Optional style prop to allow caller to override width/height
  style?: any;
  items: string[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  placeholder: string;
}
