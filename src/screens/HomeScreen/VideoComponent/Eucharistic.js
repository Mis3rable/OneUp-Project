import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { Audio, Video } from 'expo-av';
import firebase from '../../../firebase/config';

const App = () => {
  const [folders, setFolders] = useState([]);
  const [modalVisibility, setModalVisibility] = useState([]);
  const [modalFiles, setModalFiles] = useState({ audioFiles: [], imageFiles: [] });
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const storageRef = firebase.storage().ref('/Audio/Eucharistic Celebration Hymns (Diocese of Malolos)');

    storageRef.listAll().then(result => {
      const folderNames = result.prefixes.map(prefix => prefix.name);
      const visibility = new Array(folderNames.length).fill(false);
      setFolders(folderNames);
      setModalVisibility(visibility);
    }).catch(error => {
      console.log('Error getting folder names:', error);
    });

  }, []);

  const toggleModalVisibility = async (index) => {
    try {
      setIsLoading(true);
      const storageRef = firebase.storage().ref(`/Audio/Eucharistic Celebration Hymns (Diocese of Malolos)/${folders[index]}`);
  
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
  
      console.log(`Files under /Audio/Eucharistic Celebration Hymns (Diocese of Malolos)/${folders[index]}`, files);
  
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
    <View style={styles.container}>
      <Title style={styles.title}>Hymns</Title>
      {folders.map((folderName, index) => (
        <TouchableOpacity key={index} onPress={() => toggleModalVisibility(index)}
      >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:20,
    color: 'blue',
  },
  title: {
    fontSize: 24,
    paddingBottom: 50,
    paddingTop: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  folderName: {
    fontSize: 18,
    marginBottom: 16,
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
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '90%',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
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
    backgroundColor: '#dcdcdc',
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
