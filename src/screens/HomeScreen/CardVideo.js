import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import DailyReadsCard from "./VideoComponent/DailyReads";
import Listen from "./VideoComponent/Listen";
import Header from '../../../src/header/header';
import Watch from "./VideoComponent/Watch";

export default function YoutubeCard() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
    <Header/>
        {/* <Text style={styles.start}>Start your journey with</Text>
        <Text style={styles.oneup}>ONE UP</Text> */}
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
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#fff"
    },
    scrollView: {
      marginHorizontal: 5,
    },
    start: {
      marginTop: 5,
      fontSize: 20,
      alignSelf: "center",
    },
    oneup: {
      fontSize: 50,
      marginBottom: 20,
      fontWeight: 'bold',
      fontStyle: 'italic',
      alignSelf: "center",
    }
});