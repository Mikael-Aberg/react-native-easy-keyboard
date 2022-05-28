import React from 'react';
import { SafeAreaView } from 'react-native';
import EasyKeyboard, { KeyboardConfig } from 'react-native-easy-keyboard';

const test: KeyboardConfig = {
  marginPercent: 5,
  layouts: {
    default: [
      [
        'q',
        'w{2}',
        { value: 'e', size: 2, display: 'Hello world!' },
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
      ],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', { value: 'k', size: 4 }, 'l'],
      ['{caps}{5}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{del}'],
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
