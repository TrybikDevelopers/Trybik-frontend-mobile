import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../styles/globalTheme/theme';
import { createSummaryPanelStyles } from './styles/SummaryPanel.styles.ts';

interface SummaryPanelProps {
  gradeAverageLabel: string;
  ectsSumLabel: string;
  weightedAverageLabel: string;
  averageGrade: string;
  totalEcts: number;
  weightedAverage: string;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  gradeAverageLabel,
  ectsSumLabel,
  weightedAverageLabel,
  averageGrade,
  totalEcts,
  weightedAverage,
}) => {
  const theme = useTheme();
  const styles = createSummaryPanelStyles(theme as Theme);
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summarySpacer}>
        <Text style={[styles.countersText, styles.singleItem, styles.centerText]}>{gradeAverageLabel}</Text>
        <Text style={[styles.countersText, styles.singleItem, styles.centerText]}>{ectsSumLabel}</Text>
        <Text style={[styles.countersText, styles.singleItem, styles.centerText]}>{weightedAverageLabel}</Text>
      </View>
      <View style={styles.summarySpacer}>
        <Text style={[styles.bottomMenu, styles.singleItem, styles.centerText]}>{averageGrade}</Text>
        <Text style={[styles.bottomMenu, styles.singleItem, styles.centerText]}>{totalEcts}</Text>
        <Text style={[styles.bottomMenu, styles.singleItem, styles.centerText]}>{weightedAverage}</Text>
      </View>
    </View>
  );
};

export default SummaryPanel;
