import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import YoutubePlayer from "react-native-youtube-iframe";

const videoIds = ["npHIpM1BE8k", "oth9-0gkYnw", "UeGdCxH_oHY", "Fk8-XldewAk", "g51fhEZbUtg", "zvt0lCHtbmc"];

export default function Row1() {
  const [videoTitles, setVideoTitles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const titles = [];
      for (const id of videoIds) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyAg5_aLPPwUcdhnvrsOYI6icZsrkx4_LQs`
        );
        titles.push(response.data.items[0].snippet.title);
      }
      setVideoTitles(titles);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.videoContainer}>
          <Text style={styles.title}>Deepening</Text>
          <Text style={styles.text}>{videoTitles[currentIndex]}</Text>
          <YoutubePlayer
            height={200}
            width={350}
            videoId={videoIds[currentIndex]}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : videoIds.length - 1)}
          >
            <Text>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setCurrentIndex(currentIndex < videoIds.length - 1 ? currentIndex + 1 : 0)}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
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
