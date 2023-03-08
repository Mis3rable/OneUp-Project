import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";

import Row1 from "./VideoComponent/row1";
import Row2 from "./VideoComponent/row2";
import VideoCarousel from "./VideoComponent/VideoPlayer";

const videoIds = ["npHIpM1BE8k", "oth9-0gkYnw", "UeGdCxH_oHY", "Fk8-XldewAk"];

export default function YoutubeCard() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <VideoCarousel />
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
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
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