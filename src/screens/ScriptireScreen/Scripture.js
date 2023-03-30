import React, { useEffect, useState } from 'react';
import { ScrollView, Modal, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
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
                    <Title>{name}</Title>
                  </Card.Content>
                  <Card.Actions>
                    <Button>{isLoading ? 'Loading...' : 'View File'}</Button>
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
            <Button onPress={() => speakText(fileContent)}>
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
  );
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    margin: 10,
  },
  modal: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fileContent: {
    fontSize: 18,
    padding: 10,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'white',
  },
  cardLoading: {
    margin: 10,
    width: '95%',
  },
});

export default Scriptures;
