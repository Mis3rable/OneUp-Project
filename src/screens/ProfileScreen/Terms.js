import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TermsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Terms and Condition</Text>
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
          Welcome to ONE UP! App. The ONE UP Mobile Application is offered to you conditioned on your acceptance without modification of the terms, 
          conditions, and notices contained herein. Your use of Mobile Application constitutes your agreement to all such Terms. 
          Please read these terms carefully, and keep a copy of them for your reference.
          {"\n\n"}
          <Text style={{fontWeight: "bold"}}>Privacy</Text>
          {"\n\n"}
          Your use of Our Bible App is subject to OBA's Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.{"\n\n"}
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 24,
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
});

export default TermsModal;