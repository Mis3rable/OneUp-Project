import React, { useEffect, useState } from 'react';
import { ScrollView, Modal, TouchableOpacity, StyleSheet, Text, View, ImageBackground, SafeAreaView} from 'react-native';
import firebase from '../../firebase/config';
import { Button } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';
import * as Speech from 'expo-speech';

function CardSkeleton() {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Loading...</Title>
        <Paragraph>Loading...</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://via.placeholder.com/150' }} />
      <Card.Actions>
        <Button>Loading...</Button>
      </Card.Actions>
    </Card>
  );
}

function Scriptures() {
  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  async function getFileData() {
    try {
      setIsLoading(true);
      const storageRef = firebase.storage().ref();
      const listRef = storageRef.child('Scriptures/Daily Readings');
      const res = await listRef.listAll();
      const currentDate = moment().format('MM-DD-YY');
      const data = await Promise.all(
        res.prefixes
          .filter((prefixRef) => prefixRef.name === currentDate)
          .map(async (prefixRef) => {
            const prefixName = prefixRef.name;
            const items = await prefixRef.listAll();
            const textFiles = items.items.filter((item) => item.name.endsWith('.txt'));
            const files = await Promise.all(
              textFiles.map(async (textFile) => {
                const url = await textFile.getDownloadURL();
                const name = textFile.name.replace(/\.[^/.]+$/, '');
                const jpgImageName = textFile.name.replace('.txt', '.jpg');
                const jpgImageFile = items.items.find((item) => item.name === jpgImageName);
                const jpgCoverUrl = jpgImageFile ? await jpgImageFile.getDownloadURL() : null;
                const pngImageName = textFile.name.replace('.txt', '.png');
                const pngImageFile = items.items.find((item) => item.name === pngImageName);
                const pngCoverUrl = pngImageFile ? await pngImageFile.getDownloadURL() : null;
                return { url, name, coverUrl: jpgCoverUrl || pngCoverUrl };
              })
            );
            return { folderName: prefixName, files };
          })
      );
      setFileData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function downloadFile(url, name) {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const content = await response.text();
      setFileContent(content);
      setFileName(name);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('isLoading', isLoading);
      setIsLoading(false);
    }
  }

  async function speakText(text) {
    try {
      if (isSpeaking) {
        await Speech.stop();
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
        await Speech.speak(text, { rate: 0.8, onStopped: () => setIsSpeaking(false) });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFileData();
  }, []);  
  
  useEffect(() => {
    if (!modalVisible && isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    }
  }, [modalVisible]);

  return (
    <ImageBackground source={require('../../../assets/background/outside.png')} style={styles.background} >
    <SafeAreaView style={styles.container}>
    <ScrollView>
      {fileData.length === 0 ? (
        <>
          <CardSkeleton /> 
          <CardSkeleton />
        </>
      ) : (
        fileData.map(({ folderName, files }, index) => (
          <View key={index}>
            {files.map(({ url, name, coverUrl }, fileIndex) => {
              return (
                <Card key={fileIndex} onPress={() => downloadFile(url, name)} style={isLoading ? styles.cardLoading : styles.card}>
                {coverUrl && <Card.Cover source={{ uri: coverUrl }} />}
                  <Card.Content>
                    <Title style={styles.title}>{name}</Title>
                  </Card.Content>
                  <Card.Actions>
                    <Button 
                    mode="contained-tonal" buttonColor="chocolate"
                    labelStyle={{color:'white', fontSize: 15}}>{isLoading ? 'Loading...':'Read'}</Button>
                  </Card.Actions>
                </Card>
              )
            })}
          </View>
        ))             
      )}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modal}>
          <ScrollView>
            <Title style={styles.modalTitle}>{fileName.replace(/\.[^/.]+$/, '')}</Title>
            <Button style={styles.speak} onPress={() => speakText(fileContent)} icon="microphone" mode="contained" buttonColor="snow" textColor="peru">
              {isSpeaking ? 'Stop Speaking' : 'Speak Text'}
            </Button>
            <Text style={styles.fileContent}>{fileContent}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {
    width: '88%',
    margin: 25,
    marginBottom: 10,
    marginTop: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10
  },
  modal: {
    marginTop: 50,
    backgroundColor: 'linen'
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'saddlebrown'
  },
  fileContent: {
    fontSize: 18,
    padding: 10,
    alignContent: 'center',
    marginHorizontal: 20,
  },
  speak: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  modalButton: {
    backgroundColor: 'snow',
    padding: 12,
    borderRadius: 20,
    marginBottom: 100,
    marginTop: 20,
    marginHorizontal: 30,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'peru',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  cardLoading: {
    width: '88%',
    margin: 25,
    marginBottom: 15
  }
});

export default Scriptures;
