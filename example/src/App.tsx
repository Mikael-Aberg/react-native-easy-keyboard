import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import EasyKeyboard, {KeyboardConfig} from 'react-native-easy-keyboard';
import type {KeyboardTheme} from 'src/keyboard';

const myLayout: KeyboardConfig = {
  displayOptions: {
    marginPercent: 5,
    display: {
      '{shift}': '\u21E7',
      '{numeric}': '123',
      '{return}': 'return',
      '{del}': '\u21E6',
    },
  },
  layouts: {
    default: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      [
        '{shift}{1.5}',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        {isTrigger: true, value: '{del}', size: 1.5},
      ],
      ['{numeric}{2.5}', ' {5}', '{return}{2.5}'],
    ],
  },
};

const myTheme: KeyboardTheme = {
  containerStyle: {
    alignItems: 'center',
  },
  rowStyle: {},
  keyStyle: {},
  textStyle: {},
};

export default function App() {
  const onKeyPress = (key: string) => {
    console.log(`Key pressed: ${key}`);
  };

  const onTriggerPress = (trigger: string) => {
    console.log(`Trigger pressed: ${trigger}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EasyKeyboard
        theme={myTheme}
        config={myLayout}
        onKeyPress={onKeyPress}
        onTriggerPress={onTriggerPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
