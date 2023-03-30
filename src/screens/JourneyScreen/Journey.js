import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function Journey() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>No Materials Yet</Text>
    </SafeAreaView>
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
