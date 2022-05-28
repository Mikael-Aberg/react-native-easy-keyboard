import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { KeyConfig } from './keyboard';

interface Props {
  onPress: (value: string) => void;
  config: KeyConfig;
  baseSize?: number;
  margin?: number;
  fontSize?: number;
}

const Cell = (props: Props) => {
  const onPress = useCallback(() => {
    props.onPress(props.config.value);
  }, [props.onPress, props.config.value]);

  const margin = props.margin !== undefined ? props.margin / 2 : 0;

  const width =
    props.baseSize !== undefined
      ? props.baseSize * props.config.size +
        margin * 2 * (props.config.size - 1)
      : undefined;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          height: props.baseSize,
          width,
          marginVertical: margin,
          marginHorizontal: margin,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: props.fontSize }]}>
        {props.config.display || props.config.value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    backgroundColor: 'lightgray',
    flex: 0,
    justifyContent: 'center',
  },
  text: { color: '#000', textAlign: 'center' },
});

export default Cell;
