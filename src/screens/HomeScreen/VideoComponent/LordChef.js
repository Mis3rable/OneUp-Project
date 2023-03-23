import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import firebase from '../../../firebase/config';

const ListFolders = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storageRef = firebase.storage().ref('Lord My Chef');
    storageRef.list().then((result) => {
      const folderNames = result.prefixes.map((prefix) => {
        return prefix.name.replace('/', '');
      });
      setFolders(folderNames);
    });
  }, []);

  const handleFolderPress = (folder) => {
    setSelectedFolder(folder);
    const storageRef = firebase.storage().ref(`Lord My Chef/${folder}`);
    storageRef.list().then((result) => {
      const subfolderNames = result.prefixes.map((prefix) => {
        return prefix.name.replace(`${folder}/`, '');
      });
      setSubfolders(subfolderNames);
      setModalVisible(true);
    });
  };

  return (
    <View>
      {folders.map((folder, index) => (
        <TouchableOpacity key={index} onPress={() => handleFolderPress(folder)}>
          <Text>{folder}</Text>
        </TouchableOpacity>
      ))}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <Text>{selectedFolder}</Text>
          {subfolders.map((subfolder, index) => (
            <TouchableOpacity key={index}>
              <Text>{subfolder}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default ListFolders;
