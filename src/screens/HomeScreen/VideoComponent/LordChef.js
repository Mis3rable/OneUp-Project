import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LordChef() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Materials Yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
