import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Video } from 'expo-av';
import firebase from '../../../firebase/config';

const VideosCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoPlayer = useRef(null);

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
    };
    fetchVideos();
  }, []);

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
          shouldPlay={currentVideoIndex === index}
        />
        <Text style={styles.videoTitle}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos</Text>
      <Carousel
        data={videos}
        renderItem={renderVideo}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={250}
        onSnapToItem={handleSnapToItem}
      />
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
});

export default VideosCarousel;
