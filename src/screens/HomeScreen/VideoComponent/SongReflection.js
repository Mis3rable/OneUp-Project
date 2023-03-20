import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, AppState } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import { Card } from 'react-native-paper';
import firebase from '../../../firebase/config';

const SkeletonVideo = () => {
  return (
    <View style={styles.videoContainer}>
      <View style={styles.skeletonVideo} />
    </View>
  );
};

export default function Words() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoPlayer = useRef(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const fetchVideos = async () => {
      const storageRef = firebase.storage().ref();
      const videosRef = storageRef.child('Videos/Song Reflections');
      const videosList = await videosRef.listAll();
      const urls = await Promise.all(
        videosList.items.map(async (video) => {
          const url = await video.getDownloadURL();
          const name = video.name.split('.')[0];
          const cleanName = name.replace(/[^\w\s]/gi, ' ');
          return { url, name: cleanName };
        })
      );
      setVideos(urls);
      setIsLoading(false);
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    // Add an event listener for changes in the app state
    AppState.addEventListener('change', handleAppStateChange);

    // Clean up the event listener on unmount
    return () => {
      if (AppState.removeEventListener) {
        AppState.removeEventListener('change', handleAppStateChange);
      }
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/active/) &&
      nextAppState !== 'active' &&
      videoPlayer.current != null
    ) {
      // Pause the video if the app is in the background
      videoPlayer.current.pauseAsync();
    }
    appState.current = nextAppState;
  };

  const handleSnapToItem = (index) => {
    setCurrentVideoIndex(index);
  };

  const renderVideo = ({ item, index }) => {
    return (
      <Card style={styles.cardVideo}>
          <Video
            ref={videoPlayer}
            source={{ uri: item.url }}
            style={styles.video}
            useNativeControls
            resizeMode="cover"
            isLooping
            shouldPlay={currentVideoIndex === index}
          />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.cardText}>{item.name}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos</Text>
      {isLoading ? (
        <SkeletonVideo />
      ) : (
        <Carousel
          data={videos}
          renderItem={renderVideo}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={250}
          onSnapToItem={handleSnapToItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  cardContent: {
    marginTop: 10,
  },
  cardText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  videoContainer: {
    width: 255,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardVideo: {
    height: 250,
    borderColor: 'black',
  },
  skeletonVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
});
