import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onPress: (value: string) => void;
  display?: string;
  size?: number;
  margin?: number;
  fontSize?: number;
}

const Cell = (props: Props) => {
  const onPress = useCallback(() => {
    props.onPress(props.value);
  }, [props.onPress, props.value]);

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          height: props.size,
          width: props.size,
          marginVertical: props.margin ? props.margin / 2 : undefined,
          marginHorizontal: props.margin ? props.margin / 2 : undefined,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: props.fontSize }]}>
        {props.display || props.value}
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
