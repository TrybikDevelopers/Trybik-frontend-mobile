import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import GroupCard from './GroupCard.tsx';
import type { GroupKey } from '../../../../store/settingsStoreTypes.d.ts';
import { styles } from './styles/GroupCards.styles.ts';

// Mapping of store keys to UI labels/icons used by GroupCard.
// This centralizes the list of group types rendered on the Settings screen.
const GROUP_CONFIGS = [
  { key: 'dean' as GroupKey, name: 'GG', titleKey: 'deanGroup' },
  { key: 'lab' as GroupKey, name: 'L', titleKey: 'labGroup' },
  { key: 'comp' as GroupKey, name: 'K', titleKey: 'compGroup' },
  { key: 'proj' as GroupKey, name: 'P', titleKey: 'projGroup' },
] as const;

interface GroupCardsProps {
  /** Available options for each group type fetched from the store */
  options: Record<GroupKey, string[]>;
  /** Disable interactions when offline */
  isOffline: boolean;
  /** Which dropdown is currently open (managed by parent screen) */
  activeDropdown: string | null;
  /** Sets the currently open dropdown key, or null to close */
  setActiveDropdown: (value: string | null) => void;
  /** Returns true when the given group key is missing and should be highlighted */
  hasError: (groupKey: string) => boolean;
}

export const GroupCards = ({
  options,
  isOffline,
  activeDropdown,
  setActiveDropdown,
  hasError,
}: GroupCardsProps) => {
  const { t } = useTranslation();

  // Rendered group cards
  // useMemo avoids re-creating the card list unless inputs change.
  const groupCards = useMemo(() => {
    return (
      <View style={styles.cardWrappersContainer}>
        {GROUP_CONFIGS.map(({ key, name, titleKey }) => {
          // Always show dean group. Only show L/K/P if options for that group exist.
          if (key !== 'dean' && options[key].length === 0) return null;

          return (
            <View key={key} style={styles.cardWrapper}>
              <GroupCard
                // Disable UI interactions when offline
                isOffline={isOffline}
                // Localized title for the card (e.g., "General Group", "Computer Lab")
                groupTitle={t(titleKey)}
                // Visual identity of the card and which group picker to use inside
                groupName={name}
                // Dropdown coordination: only one dropdown across all cards should be open
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                // Highlight the card/picker if validation says this group is missing
                hasError={hasError(key)}
              />
            </View>
          );
        }).filter(Boolean)}
      </View>
    );
  }, [options, isOffline, t, activeDropdown, setActiveDropdown, hasError]);

  return <View>{groupCards}</View>;
};
