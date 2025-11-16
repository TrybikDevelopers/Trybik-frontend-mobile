import { useTheme } from '@shopify/restyle';
import {
  LucideFlaskConical,
  LucideFolder,
  LucideMonitor,
  LucideUsers,
} from 'lucide-react-native';
import type { ReactElement } from 'react';
import React from 'react';
import { Text, View } from 'react-native';
import GroupSelect from '../../../../components/ui/GroupSelectModal';
import type { Theme } from '../../../../styles/globalTheme/theme';
import { GroupSelectTypes } from '../../../../types/uiTypes/GroupSelectTypes';
import { createGroupCardStyles } from './styles/GroupCard.style';


const iconMap: Record<string, ReactElement> = {
  GG: <LucideUsers size={20} color={'white'} />,
  L: <LucideFlaskConical size={20} color="white" />,
  K: <LucideMonitor size={20} color="white" />,
  P: <LucideFolder size={20} color="white" />,
};

const GroupCard: React.FC<GroupSelectTypes> = ({
  groupTitle,
  groupName,
  activeDropdown,
  setActiveDropdown,
  hasError,
  isOffline,
}) => {
  const theme = useTheme<Theme>();
  const styles = createGroupCardStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={[styles[groupName], styles.icon]}>
          {iconMap[groupName]}
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {groupTitle}
        </Text>
      </View>
      <View style={styles.dropdownContainer}>
        <GroupSelect
          isOffline={isOffline}
          groupTitle={''}
          groupName={groupName}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          hasError={hasError}
        />
      </View>
    </View>
  );
};

export default GroupCard;
