import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, AppState } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import firebase from '../../../firebase/config';

const SkeletonVideo = () => {
  return (
    <View style={styles.videoContainer}>
      <View style={styles.skeletonVideo} />
    </View>
  );
};

const VideosCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const videoPlayer = useRef(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const fetchVideos = async () => {
      const storageRef = firebase.storage().ref();
      const videosRef = storageRef.child('images');
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
      <View style={styles.videoContainer}>
        <Video
          ref={videoPlayer}
          source={{ uri: item.url }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          // shouldPlay={currentVideoIndex === index}
        />
        <Text style={styles.videoTitle}>{item.name}</Text>
      </View>
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
  },
  videoContainer: {
    width: 250,
    height: 200,
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
  },
  videoTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  skeletonVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
});

export default VideosCarousel;
