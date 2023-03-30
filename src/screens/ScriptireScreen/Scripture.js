import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const currentDate = new Date();
  const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${currentDate.getFullYear().toString().slice(-2)}`;
  const url = `https://bible.usccb.org/bible/readings/${formattedDate}.cfm`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
