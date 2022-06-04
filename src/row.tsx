import React from 'react';
import {StyleSheet, View} from 'react-native';
import Cell from './cell';
import type {KeyboardTheme, KeyConfig} from './keyboard';

interface Props {
  row: KeyConfig[];
  onKeyPress?: (key: string) => void;
  onTriggerPress?: (trigger: string) => void;
  triggers?: Record<string, string>;
  cellSize?: number;
  cellMargin?: number;
  cellFontSize?: number;
  theme?: KeyboardTheme;
}

const Row = (props: Props) => {
  return (
    <View style={[styles.row, props.theme?.rowStyle]}>
      {props.row.map((cell, i) => (
        <Cell
          config={cell}
          baseSize={props.cellSize}
          onPress={cell.isTrigger ? props.onTriggerPress : props.onKeyPress}
          key={cell.value + i}
          keyStyle={props.theme?.keyStyle}
          textStyle={props.theme?.textStyle}
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
