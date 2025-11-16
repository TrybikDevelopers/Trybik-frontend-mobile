import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LetterIcon from '../ui/letterIcon';
import { getCorrectColor } from '../../utils/getCorrectColor';
import { ActivityLegendModalProps } from '../../types/global';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../styles/globalTheme/theme';

const ActivityLegendModal: React.FC<ActivityLegendModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);

  const activityTypes = [
    { letter: 'W', label: t('lecture') },
    { letter: 'Ć', label: t('excercises') },
    { letter: 'L', label: t('lab') },
    { letter: 'K', label: t('compLab') },
    { letter: 'P', label: t('project') },
    { letter: 'S', label: t('seminar') },
    { letter: 'I', label: t('other') },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            hitSlop={20}
          >
            <Icon name="close" size={12} style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.title}>{t('activityLegendText')}</Text>

          <View style={styles.items}>
            {activityTypes.map(({ letter, label }) => (
              <View key={letter} style={styles.itemRow}>
                <LetterIcon bgColor={getCorrectColor(letter)} letter={letter} />
                <Text style={styles.itemText}>{label}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    modalOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: colors.settingsBackground,
      borderRadius: 8,
      padding: 20,
      alignItems: 'center',
    },
    closeBtn: {
      alignSelf: 'flex-end',
    },
    icon: {
      color: colors.textPrimary,
    },
    title: {
      fontSize: 15,
      marginBottom: 12,
      color: colors.textPrimary,
    },
    items: {
      width: '100%',
      marginTop: 10,
      marginLeft: '50%',
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    itemText: {
      marginLeft: 10,
      fontSize: 14,
      color: colors.textPrimary,
    },
  });
};

export default ActivityLegendModal;
