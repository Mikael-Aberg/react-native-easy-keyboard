import React from 'react';
import { SafeAreaView } from 'react-native';
import EasyKeyboard, { KeyboardConfig } from 'react-native-easy-keyboard';

const test: KeyboardConfig = {
  marginPercent: 5,
  layouts: {
    default: [
      ['q', 'w', { value: 'e' }, 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', { value: 'k' }, 'l'],
      ['{caps}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{del}'],
    ],
    numeric: [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
    ],
  },
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EasyKeyboard config={test} />
    </SafeAreaView>
  );
}
