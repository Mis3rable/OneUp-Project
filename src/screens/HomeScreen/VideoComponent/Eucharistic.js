import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import firebase from '../../../firebase/config';

const App = () => {
  const [folders, setFolders] = useState([]);
  const [modalVisibility, setModalVisibility] = useState([]);

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

  const toggleModalVisibility = (index) => {
    const newVisibility = [...modalVisibility];
    newVisibility[index] = !modalVisibility[index];
    setModalVisibility(newVisibility);
  };

  const closeModal = (index) => {
    const newVisibility = [...modalVisibility];
    newVisibility[index] = false;
    setModalVisibility(newVisibility);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Hymns</Title>
      {folders.map((folderName, index) => (
        <TouchableOpacity key={index} onPress={() => toggleModalVisibility(index)}>
          <Text style={styles.folderName}>{folderName}</Text>
        </TouchableOpacity>
      ))}
      {folders.map((folderName, index) => (
        <Modal key={index} visible={modalVisibility[index]} onRequestClose={() => closeModal(index)}>
          <TouchableWithoutFeedback onPress={() => closeModal(index)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{folderName}</Text>
                <ScrollView>
                  {/* cards  */}
                </ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={() => closeModal(index)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title:{
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
