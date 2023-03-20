import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../../src/header/header';

export default function Journey() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <Header/>
      <Text style={styles.text}>No Materials Yet</Text>
    </ScrollView>
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
