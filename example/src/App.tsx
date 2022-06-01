import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import EasyKeyboard, {
  KeyboardConfig,
  PRESET_ENGLISH,
} from 'react-native-easy-keyboard';
import type {KeyboardTheme} from 'src/keyboard';

const myLayout: KeyboardConfig = {
  displayOptions: {
    marginPercent: 5,
  },
  layouts: {
    default: [
      [
        '1',
        '2',
        '3',
        {
          value: '{del}',
          display: '< Delete',
          size: 2,
          keyStyle: {
            backgroundColor: 'red',
            borderRadius: 5,
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      ],
    ],
  },
};

const myTheme: KeyboardTheme = {
  containerStyle: {marginTop: 20},
  rowStyle: {backgroundColor: 'blue'},
  keyStyle: {borderRadius: 5, backgroundColor: 'green'},
  textStyle: {color: 'white', fontWeight: 'bold'},
};

export default function App() {
  const onKeyPress = (key: string) => {
    console.log('Key pressed: ', key);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EasyKeyboard
        onKeyPress={onKeyPress}
        config={PRESET_ENGLISH}
        theme={myTheme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
