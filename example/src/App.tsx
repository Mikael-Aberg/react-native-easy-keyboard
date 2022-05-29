import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import EasyKeyboard, {presets} from 'react-native-easy-keyboard';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <EasyKeyboard config={presets.english} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
