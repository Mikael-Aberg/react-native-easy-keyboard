import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import EasyKeyboard, {presets} from 'react-native-easy-keyboard';

export default function App() {
  const onKeyPress = (key: string) => {
    console.log('Key pressed: ', key);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EasyKeyboard onKeyPress={onKeyPress} config={presets.english} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
