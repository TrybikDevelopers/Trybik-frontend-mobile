import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createSwitchStyles } from './styles/AuthenticationStatus.styles.ts';
/**
 * Renders the representative section on the Settings screen.
 *
 * - If the user is already a representative and has a group assigned, we show an info text.
 * - If the user is not a representative, we show an action button that opens a modal
 *   to confirm representative status.
 */
interface Props {
  /** Truthy value when the current user is a representative. */
  role: string | null;
  /** Name of the group the user represents (when applicable). */
  repGroup: string | null;
  /** Handler to open the representative confirmation modal. */
  onShowModal: () => void;
}

export const AuthenticationStatus = ({ 
  role, 
  repGroup, 
  onShowModal 
}: Props) => {
  const { t } = useTranslation();
    const theme = useTheme<Theme>();
const styles = createSwitchStyles(theme);
  // Already a representative of some group -> render info text
  if (role && repGroup) {
    return (
      <Text style={styles.statusText}>
        {t('repOfGroup', { group: repGroup }) || `Starosta grupy ${repGroup}`}
      </Text>
    );
  }

  // Not a representative -> show call-to-action button
  if (!role) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={onShowModal}
        disabled={!!repGroup}
      >
        <Text style={styles.buttonText}>
          {t('confirmRepStatus')}
        </Text>
      </TouchableOpacity>
    );
  }

  return null;
};