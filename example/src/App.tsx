import React from 'react';
import { SafeAreaView } from 'react-native';
import EasyKeyboard, { KeyboardConfig } from 'react-native-easy-keyboard';

const test: KeyboardConfig = {
  marginPercent: 5,
  layouts: {
    default: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['{caps}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{del}'],
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
