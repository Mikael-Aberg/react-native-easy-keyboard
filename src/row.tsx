import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './cell';
import type { KeyConfig } from './keyboard';

interface Props {
  row: KeyConfig[];
  onKeyPress: (key: string) => void;
  onTriggerPress: (trigger: string) => void;
  triggers?: Record<string, string>;
  cellSize?: number;
  cellMargin?: number;
  cellFontSize?: number;
}

const Row = (props: Props) => {
  return (
    <View style={[styles.row]}>
      {props.row.map((cell) => (
        <Cell
          size={props.cellSize}
          onPress={props.onKeyPress}
          value={cell.value}
          // TODO - Better key value
          key={cell.value}
          margin={props.cellMargin}
          fontSize={props.cellFontSize}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default Row;
