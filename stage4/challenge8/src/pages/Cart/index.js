import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default function Cart() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cart Component</Text>
    </View>
  );
}
