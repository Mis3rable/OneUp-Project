import React, { useState, useEffect, useRef } from 'react';
import { Video } from 'expo-av';
import firebase from '../../../firebase/config';
import { View } from 'react-native';

const VideoPlayer = ({ videoPath, loadOnMount }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const loadVideo = async () => {
      const storageRef = firebase.storage().ref();
      const videoRef = storageRef.child(videoPath);
      const downloadUrl = await videoRef.getDownloadURL();
      setVideoUrl(downloadUrl);
      setIsLoaded(true);
    };
    if (loadOnMount) {
      loadVideo();
    }
  }, [videoPath, loadOnMount]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isLoaded) {
      const handleVisibilityChange = () => {
        if (document.hidden || !video.paused) return;
        loadVideo();
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [videoRef, isLoaded, loadVideo]);

  const loadVideo = async () => {
    const storageRef = firebase.storage().ref();
    const videoRef = storageRef.child(videoPath);
    const downloadUrl = await videoRef.getDownloadURL();
    setVideoUrl(downloadUrl);
    setIsLoaded(true);
  };

  return (
    <Video
      ref={videoRef}
      source={{ uri: videoUrl }}
      style={{ width: 300, height: 300 }}
      useNativeControls
    />
  );
};

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        // console.log("rError:", fetchVideos);
        const storageRef = firebase.storage().ref();
        const videosRef = storageRef.child('ICMAS');
        const videoList = await videosRef.listAll();
        // console.log(error.code, storageRef);
        // console.log(error.code, videosRef);
        // console.log(error.code, videoList.items);
        setVideoList(videoList.items);
    };
    fetchVideos();
  }, []);
  
  
  return (
    <View>
      {videoList.map((video, index) => (
        <VideoPlayer
          key={video.fullPath}
          videoPath={video.fullPath}
          loadOnMount={index === 0}
        />
      ))}
    </View>
  );
};

export default VideoList;
