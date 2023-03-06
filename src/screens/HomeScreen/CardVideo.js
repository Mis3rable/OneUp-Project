import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";

import Row1 from "./VideoComponent/row1";
import Row2 from "./VideoComponent/row2";
import VideoPlayer from "./VideoComponent/VideoPlayer";

const videoIds = ["npHIpM1BE8k", "oth9-0gkYnw", "UeGdCxH_oHY", "Fk8-XldewAk"];

export default function YoutubeCard() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <VideoPlayer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollView: {
    marginHorizontal: 20,
  },
});