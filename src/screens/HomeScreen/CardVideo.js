import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, Button} from "react-native";
import DailyReadsCard from "./VideoComponent/DailyReads";
import Listen from "./VideoComponent/Listen";
import Header from '../../../src/header/header';
import Watch from "./VideoComponent/Watch";
import PrayerCard from "./VideoComponent/PrayerCard";
import 'firebase/auth';

export default function YoutubeCard({ route })  {
  
  const [userState, setUserState] = useState(route.params.user);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
          source={require('../../../assets/background/bgmenu.png')}
          style={styles.background}>
      <ScrollView style={styles.scrollView}>
      <Header/>
      <Text style={styles.info}> Welcome, {userState ? userState.fullName : ''}!</Text>
        {/* <Text style={styles.start}>Start your journey with</Text>
        <Text style={styles.oneup}>ONE UP</Text> */}
        <DailyReadsCard/>
        <PrayerCard/>
        <Watch/>
        <Listen/>
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
      marginTop: 100,
      alignSelf: "center",
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 5,
    }
});