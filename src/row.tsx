import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cell from './cell';

interface Props {
  row: string[];
  onKeyPress: (key: string) => void;
  onTriggerPress: (trigger: string) => void;
  triggers?: Record<string, string>;
  cellSize?: number;
  cellMargin?: number;
}

const Row = (props: Props) => {
  return (
    <View style={[styles.row]}>
      {props.row.map((cell) => (
        <Cell
          size={props.cellSize}
          onPress={
            props.triggers?.[cell] ? props.onTriggerPress : props.onKeyPress
          }
          value={cell}
          key={cell}
          margin={props.cellMargin}
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
