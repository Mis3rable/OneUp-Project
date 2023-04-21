import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const TermsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(true)}>
      <Ionicons name="document-text-outline" size={20} color="chocolate" style={styles.icon} />
        <Text style={styles.modalTxt}>Terms and Conditions</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.modalTitle}>Terms and Condition</Text>
          <Text style={styles.modalText}>
          Agreement between User and One Up 
Welcome to ONE UP! The ONE UP Mobile Application is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein. Your use of Mobile Application constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference.
          {"\n\n"}
          <Text style={{fontWeight: "bold",color:'saddlebrown'}}>Privacy</Text>
          {"\n\n"}
          Your use of ONE UP is subject to OA's Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
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
    width: 200,
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
    marginTop: 20
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

export default TermsModal;