import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
  cartText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7159c1',
  },
});

export default function Home({ navigation }) {
  const handleNavigate = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Component</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Text style={styles.cartText}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
