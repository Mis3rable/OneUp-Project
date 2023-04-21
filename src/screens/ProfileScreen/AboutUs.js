import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
const AboutUsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(true)}>
      <Ionicons name="information-circle-outline" size={20} color="chocolate" style={styles.icon} />
        <Text style={styles.modalTxt} >About Us</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.modalTitle}>About One Up</Text>
          <Text style={styles.modalText}>
          {"\n\n"}
            The mobile application was developed by a team of talented developers and contributors who have dedicated their time and effort to bring this app to life.
          {"\n\n"}
            The following individuals have played a significant role in the creation of this app: 
          {"\n\n"}
          <Text style={{fontWeight: "bold", color:'saddlebrown'}}>Developers:</Text>
          {"\n\n"}
              Sarah May Aniram S. Repulda as Project Manager / Front-End Developer
              {"\n\n"}
              Robert Dominic S. Santos as Full-Stack Developer
              {"\n\n"}
              Jonald Cedrick R. De Guzman as Back-End Developer
              {"\n\n"}
              Axell John C. Costales as Database Manager / Web Developer
              {"\n\n"}
              Jeremy N. Agapito as Database Manager / Web Developer
              {"\n\n"}
          <Text style={{fontWeight: "bold", color:'saddlebrown'}}>Contributors:</Text>
              {"\n\n"}
              Angelo Yu Caburnay
              {"\n\n"}
              Reymond Galvez
              {"\n\n"}
              Jhonnel Azarcon
              {"\n\n"}
              Kenneth Miranda
              {"\n\n"}
          The company expresses its deepest gratitude to these individuals for their hard work and commitment to the success of this project.
          {"\n\n"}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBtn: {
    backgroundColor: '#FFFFFF', 
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'peru',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 17,
  },
  modalTxt: {
    color: 'black',
    fontWeight: 'bold',
    width: 100,
    height: 20,
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'seashell'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    color: 'saddlebrown'
  },
  modalText: {
    fontSize: 18,
    margin: 20,
    marginTop: 1
  },
  modalButton: {
    backgroundColor: 'snow',
    padding: 12,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'peru',
    alignSelf: 'center',
    fontWeight: 'bold'
  },

  
});

export default AboutUsModal;