import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import firebase from "../../../../firebase/config";
import { Ionicons } from "@expo/vector-icons";

const LordChef = () => {
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
      const folderRef = firebase
        .storage()
        .ref(`Lord My Chef/${selectedFolder}`);
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
      const folderRef = firebase
        .storage()
        .ref(`Lord My Chef/${selectedFolder}/${selectedSubFolder}`);
      const fileList = await folderRef.list();
      const file = fileList.items.find((item) => item.name.endsWith(".txt"));
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../../../assets/background/outside.png")}
        style={styles.background}
      >
        <View style={styles.list}>
          <Text style={styles.title}>
            {" "}
            "Spiritual recipes for the soul to gladden your heart."
          </Text>
          <FlatList
            data={folders}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedFolder(item)}
                style={styles.folderList}
              >
                <Text style={styles.folderName}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
          <Modal visible={selectedFolder !== null} onRequestClose={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>"{selectedFolder}"</Text>
                <TouchableOpacity onPress={closeModal} style={styles.button}>
                  <Text style={styles.buttonText}>
                    <Ionicons name="close" size={20} color="seashell" />
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={subFolders}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedSubFolder(item)}
                      style={styles.modalList}
                    >
                      <Text style={styles.modalFolderName}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <Text style={styles.folderName}>No content found</Text>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>
              {selectedSubFolder && (
                <Modal
                  visible={fileContent !== null}
                  onRequestClose={closeFileContentModal}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <FlatList
                        data={[fileContent]}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                          <View>
                            <Text style={styles.modalContent}>{item}</Text>
                            <TouchableOpacity
                              style={styles.modalButton}
                              onPress={closeFileContentModal}
                            >
                              <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LordChef;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "saddlebrown",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    margin: 10,
    fontStyle: "italic",
  },
  list: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    margin: 20,
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
  },
  folderName: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
    color: "black",
  },
  folderList: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "saddlebrown",
    borderBottomWidth: 1,
    borderBottomLength: 1,
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "papayawhip",
    marginTop: 40,
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 30,
    textAlign: "left",
    color: "saddlebrown",
    maxWidth: "50%",
  },
  modalFolderName: {
    textAlign: "left",
    margin: 20,
    color: "black",
    fontSize: 20,
  },
  modalList: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "saddlebrown",
    borderBottomWidth: 1,
    borderBottomLength: 1,
  },
  modalContent: {
    fontSize: 18,
    padding: 10,
    alignContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "snow",
    padding: 12,
    borderRadius: 20,
    marginBottom: 40,
    marginTop: 20,
    marginHorizontal: 30,
  },
  modalButtonText: {
    fontSize: 18,
    color: "peru",
    alignSelf: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "saddlebrown",
    height: 40,
    width: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 15,
    right: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
