import React, {useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import type {KeyConfig} from './keyboard';

interface Props {
  onPress: (value: string) => void;
  config: KeyConfig;
  baseSize?: number;
  margin?: number;
  fontSize?: number;
}

const Cell = ({onPress, config, ...props}: Props) => {
  const handleCellPress = useCallback(() => {
    onPress(config.value);
  }, [onPress, config.value]);

  const margin = props.margin !== undefined ? props.margin / 2 : 0;

  const width =
    props.baseSize !== undefined
      ? props.baseSize * config.size + margin * 2 * (config.size - 1)
      : undefined;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          height: props.baseSize,
          width,
          minWidth: width,
          marginVertical: margin,
          marginHorizontal: margin,
        },
        config.keyStyle,
      ]}
      onPress={handleCellPress}>
      <Text style={[styles.text, {fontSize: props.fontSize}, config.textStyle]}>
        {config.display || config.value}
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
  text: {
    color: '#000',
    textAlign: 'center',
  },
});

export default Cell;
