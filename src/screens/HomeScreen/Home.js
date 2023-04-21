import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, Button} from "react-native";
import 'firebase/auth';
import DailyReadsCard from "./CardComponent/DailyReadsCard";
import PrayerCard from "./CardComponent/PrayerCard";
import MusicVideos from "./CardComponent/Music Videos/MusicVideos";
import Reflections from "./CardComponent/Reflections/Reflections";
import LiturgicalCard from "./CardComponent/Music Videos/ReligiousAndInspirationalCard";
export default function YoutubeCard({ route })  {
  
  const { user } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../../assets/background/altar.png')}>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.info}> Welcome, {user ? user.fullName : ''}!</Text>
      <DailyReadsCard/>
      <PrayerCard/>
      <MusicVideos/>
      <LiturgicalCard/>
      <Reflections/>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#fff",
      width: '100%',
      height: '100%'
    },
    scrollView: {
      marginHorizontal: 0,
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
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    info: {
      fontSize: 24, 
      fontWeight: 'bold', 
      fontStyle: 'italic',
      marginTop: 30,
      alignSelf: "center",
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 5,
    }
});