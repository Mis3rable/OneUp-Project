import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import DailyReadsCard from "./VideoComponent/DailyReads";
import Listen from "./VideoComponent/Listen";

import Watch from "./VideoComponent/Watch";

export default function YoutubeCard() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Start your</Text>
        <Text style={styles.text}>Journey with</Text>
        <Text style={[styles.text, { marginBottom: 30 }]}>ONE UP.</Text>
        <DailyReadsCard/>
        <Watch/>
        <Listen/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  videoContainer: {
    alignItems: "center",
    marginTop: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  prevButton: {
    backgroundColor: "#ddd",
    padding: 10,
    marginRight: 20
  },
  nextButton: {
    backgroundColor: "#ddd",
    padding: 10,
    marginLeft: 20
  },
  scrollView: {
    marginHorizontal: 20,
  },
});