import React, { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const AboutUsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };
  {scrolled && (
    <TouchableOpacity
      style={styles.scrollButton}
      onPress={() => scrollViewRef.scrollTo({ y: 0, animated: true })}
    >
      <Text style={styles.scrollButtonText}>Top</Text>
    </TouchableOpacity>
  )}  
  const handleScrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  
  return (
    <View>
      <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(true)}>
      <Ionicons name="information-circle-outline" size={20} color="chocolate" style={styles.icon} />
        <Text style={styles.modalTxt} >About Us</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <SafeAreaView style={styles.modalContainer}>
      <ScrollView ref={scrollViewRef} style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.modalTitle}>About One Up</Text>
          <Text style={styles.modalText}>
          {"\n\n"}
            The mobile application was developed by a team of talented developers and contributors who have dedicated their time and effort to bring this app to life.
          {"\n\n"}
            The following individuals have played a significant role in the creation of this app: 
          {"\n\n"}
          <Text style={{fontWeight: "bold", color:'saddlebrown'}}>Developers:</Text>
          {"\n\n"}
              Sarah May Aniram S. Repulda
              {"\n\n"}
              Robert Dominic S. Santos
              {"\n\n"}
              Jonald Cedrick R. De Guzman
              {"\n\n"}
              Axell John C. Costales
              {"\n\n"}
              Jeremy N. Agapito
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
              Lemuel Francisco
              {"\n\n"}
          The company expresses its deepest gratitude to these individuals for their hard work and commitment to the success of this project.
          {"\n\n"}
          </Text>
          </ScrollView>
          </SafeAreaView>
            <View style={styles.bottomContainer}>
              <View style={styles.closeButton}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={styles.scrollButtonDownContainer} onPress={handleScrollToBottom}>
                  <View style={styles.scrollButtonDown}>
                    <Text style={styles.scrollButtonText}>
                      <Ionicons name="caret-down-outline" size={30} color="white" />
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.scrollButtonUpContainer} onPress={handleScrollToTop}>
                  <View style={styles.scrollButtonUp}>
                    <Text style={styles.scrollButtonText}> 
                      <Ionicons name="caret-up-outline" size={30} color="white" />
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'seashell',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },  
  closeButton: {
    alignSelf: 'flex-start'
  },
  modalButton: {
    backgroundColor: 'saddlebrown',
    height: 50,
    width: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 1,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  scrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 30,
    zIndex: 1,
  },
  scrollButtonContainer: {
    flexDirection: 'row',
  },
  scrollButtonDown: {
    backgroundColor: 'saddlebrown',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  scrollButtonUpContainer: {
    marginLeft: 10,
  },
  scrollButtonUp: {
    backgroundColor: 'saddlebrown',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  scrollButtonText: {
    color: 'white',
  }, 
//Modal Style
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
    width: '100%',
    height: '100%',
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 20,
    marginTop: 10,
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
});

export default AboutUsModal;