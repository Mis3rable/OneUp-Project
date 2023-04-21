import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { Audio, Video } from 'expo-av';
import firebase from '../../../../firebase/config';

const PianoContent = () => {
  const [folders, setFolders] = useState([]);
  const [modalVisibility, setModalVisibility] = useState([]);
  const [modalFiles, setModalFiles] = useState({ audioFiles: [], imageFiles: [] });
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const storageRef = firebase.storage().ref('/Audio/Selected Bulacan Liturgical Music for Meditation');

    storageRef.listAll().then(async (result) => {
      const folderNames = result.prefixes.map(prefix => prefix.name);
      const visibility = new Array(folderNames.length).fill(false);
      setFolders(folderNames);
      setModalVisibility(visibility);

      const urls = await Promise.all(
        folderNames.map(async (folderName) => {
          const folderRef = firebase.storage().ref(`/Audio/Selected Bulacan Liturgical Music for Meditation/${folderName}`);
          const items = await folderRef.list();
          const imageItem = items.items.find(item => item.name.endsWith('.jpg') || item.name.endsWith('.png'));
          if (imageItem) {
            return imageItem.getDownloadURL();
          } else {
            return null;
          }
        })
      );
      setImageUrls(urls);
    }).catch(error => {
      console.log('Error getting folder names:', error);
    });

  }, []);

  const toggleModalVisibility = async (index) => {
    try {
      setIsLoading(true);
      const storageRef = firebase.storage().ref(`/Audio/Selected Bulacan Liturgical Music for Meditation/${folders[index]}`);
  
      const files = await storageRef.listAll().then(async (result) => {
        const audioFiles = [];
        const imageFiles = [];
        for (const item of result.items) {
          const url = await item.getDownloadURL();
          if (item.name.endsWith('.mp3')) {
            audioFiles.push({ fileName: item.name, url });
          } else if (item.name.endsWith('.jpg') || item.name.endsWith('.png')) {
            imageFiles.push({ fileName: item.name, url });
          }
        }
        return { audioFiles, imageFiles };
      });
  
      console.log(`Files under /Audio/Rosary/${folders[index]}`, files);
  
      const newVisibility = [...modalVisibility];
      newVisibility[index] = !modalVisibility[index];
      setModalVisibility(newVisibility);
      setModalFiles(files);
  
      // Load the sound object
      const { sound } = await Audio.Sound.createAsync({ uri: files.audioFiles[0].url });
      await setSound(sound);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error getting files', error);
    }
  };
  
  useEffect(() => {
    return async () => {
      if (sound && (await sound.getStatusAsync()).isLoaded) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    };
  }, [modalVisibility]);
  

  const closeModal = (index) => {
    const newVisibility = [...modalVisibility];
    newVisibility[index] = false;
    setModalVisibility(newVisibility);
  };

  return (
   <ImageBackground source={require('../../../../../assets/background/outside.png')} style={styles.background} >
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {folders.map((folderName, index) => (
          <TouchableOpacity key={index} onPress={() => toggleModalVisibility(index)} style={styles.folderItem}>
          {imageUrls[index] ? (
            <Image source={{ uri: imageUrls[index] }} style={styles.folderImage} />
          ) : (
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.folderImage} />
          )}
          <Text style={styles.folderName}>{folderName}</Text>
        </TouchableOpacity>
        
        ))}
        {folders.map((folderName, index) => (
          <Modal key={index} visible={modalVisibility[index]} onRequestClose={() => {}}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{folderName}</Text>
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : (
                  <ScrollView>
                    {modalFiles.imageFiles.length > 0 ? (
                      modalFiles.imageFiles.map((file, i) => (
                        <Card key={i}>
                          <Card.Cover source={{ uri: file.url }} />
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <Card.Cover source={{ uri: 'https://via.placeholder.com/100' }} />
                      </Card>
                    )}
                    {modalFiles.audioFiles.length > 0 && modalFiles.audioFiles.map((file, i) => (
                      <Card key={i}>
                        <View style={styles.audioPlayer}>
                          <View style={styles.audioPlayer}>
                            <Video
                              source={{ uri: file.url }}
                              controls={true}
                              useNativeControls={true}
                              resizeMode="contain"
                              isLooping={false}
                              shouldPlay={isPlaying}
                              style={{ width: '100%', height: 40 }}
                            />
                          </View>
                        </View>
                      </Card>
                    ))}
                  </ScrollView>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={() => closeModal(index)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ))}
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );  
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  folderName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'left',
    width: '40%',
    lineHeight: 25,
  },
  folderImage: {
    width: 190,
    height: 120,
    marginRight: 10,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'papayawhip',
    padding: 16,
    width: '90%',
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'saddlebrown'
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  audioSlider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: 'snow',
    padding: 12,
    borderRadius: 15,
    marginTop: 16,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'peru',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
});

export default PianoContent;