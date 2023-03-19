import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
import DailyReadsCard from "./VideoComponent/DailyReads";
import Listen from "./VideoComponent/Listen";
import Header from '../../../src/header/header';
import Watch from "./VideoComponent/Watch";

export default function YoutubeCard() {

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Header/>
        <Text style={styles.start}>Start your</Text>
        <Text style={styles.text}>Journey with</Text>
        <Text style={styles.oneup}>ONE UP</Text>
        <DailyReadsCard/>
        <Watch/>
        <Listen/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
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
  start: {
    marginTop: 20,
    fontSize: 50,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 6,
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
  oneup: {
    fontSize: 50,
    color: "blue",
    marginBottom: 20,
  }
});