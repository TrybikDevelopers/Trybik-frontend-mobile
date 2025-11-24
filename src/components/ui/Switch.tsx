import React from 'react';
import { Text, View } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';

import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../styles/globalTheme/theme';
import type { SwitchTypes } from '../../types/uiTypes/SwitchTypes';
import { createSwitchStyles } from './styles/Switch.styles.ts';
interface Props extends SwitchTypes {
  value: boolean;
  onChange: (newVal: boolean) => void;
  hasError?: boolean;
}

const Switch: React.FC<Props> = ({ label, value, onChange }) => {
  const theme = useTheme<Theme>();
  const styles = createSwitchStyles(theme);
  const { colors } = theme;

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.label}>{label ?? 'name'}</Text>
      <View style={styles.switchContainer}>
        <SwitchToggle
          switchOn={value}
          onPress={() => onChange(!value)}
          circleColorOff={colors.textSecondary}
          circleColorOn={colors.confirmAccent}
          backgroundColorOn={colors.switchOnBg}
          backgroundColorOff={colors.border}
          containerStyle={styles.containerStyle}
          circleStyle={styles.circleStyle}
        />
      </View>
    </View>
  );
};

export default React.memo(Switch);
