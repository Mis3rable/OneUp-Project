import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import firebase from '../../../firebase/config';

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [subFolders, setSubFolders] = useState([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      const folderRef = firebase.storage().ref(`Lord My Chef`);
      const folderList = await folderRef.list();
      const folderNames = folderList.prefixes.map((folder) => folder.name);
      setFolders(folderNames);
    };
    fetchFolders();
  }, []);

  useEffect(() => {
    const fetchSubFolders = async () => {
      const folderRef = firebase.storage().ref(`Lord My Chef/${selectedFolder}`);
      const folderList = await folderRef.list();
      const folderNames = folderList.prefixes.map((folder) => folder.name);
      setSubFolders(folderNames);
    };

    if (selectedFolder) {
      fetchSubFolders();
    }
  }, [selectedFolder]);

  useEffect(() => {
    const fetchFileContent = async () => {
      const folderRef = firebase.storage().ref(`Lord My Chef/${selectedFolder}/${selectedSubFolder}`);
      const fileList = await folderRef.list();
      const file = fileList.items.find((item) => item.name.endsWith('.txt'));
      if (file) {
        const downloadURL = await file.getDownloadURL();
        const response = await fetch(downloadURL);
        const fileContent = await response.text();
        setFileContent(fileContent);
      }
    };
  
    if (selectedFolder && selectedSubFolder) {
      fetchFileContent();
    }
  }, [selectedFolder, selectedSubFolder]);  

  const closeModal = () => {
    setSelectedFolder(null);
    setSelectedSubFolder(null);

  };

  const closeFileContentModal = () => {
    setFileContent(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <FlatList
        data={folders}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedFolder(item)}>
            <Text style={{ fontSize: 18, marginTop: 20, textAlign: 'center' }}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <Modal visible={selectedFolder !== null} onRequestClose={closeModal}>
        <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <FlatList
            data={subFolders}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedSubFolder(item)}>
                <Text style={{ fontSize: 18, marginTop: 20, textAlign: 'center' }}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <Text style={{ fontSize: 18, marginTop: 20, textAlign: 'center' }}>No content found</Text>
            )}
            keyExtractor={(item) => item}
          />
          {selectedSubFolder && (
            <Modal visible={fileContent !== null} onRequestClose={closeFileContentModal}>
              <FlatList
                data={[fileContent]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View>
                    <Text style={{ fontSize: 18, textAlign: 'left', marginTop: 20, marginLeft: 10 }}>{item}</Text>
                    <TouchableOpacity onPress={closeFileContentModal}>
                      <Text style={{ fontSize: 16, color: "red", marginTop: 10, marginBottom: 10, textAlign: 'center' }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </Modal>
          )}
          <TouchableOpacity onPress={closeModal}>
            <Text style={{ fontSize: 16, color: "red", marginTop: 20, textAlign: 'center' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );   
};

export default FolderList;
