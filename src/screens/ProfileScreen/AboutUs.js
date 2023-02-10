import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AboutUsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>About Us</Text>
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
          A daily routine of seeking intimacy with God is incredibly powerful and can completely transform lives. 
          One Up has created experiences that are biblically centered and culturally relevant to make sure that everyone 
          can easily fit this spiritual practice into their day to day life. 
          We believe these experiences will help people develop a routine of seeking God with intention and authenticity,
          ultimately leading to a deeper relationship with Him.{"\n\n"}
        This journey is not always easy as it requires a dedicated routine of prayer and study to keep us on track.
        Nevertheless, our hope is that each person in our community would stay encouraged in their pursuit of a 
        closer relationship with God and discover more about whom He has created them to be. With the right routine
        and effort, we are confident that we can draw closer to God each day and experience the joy of His presence in our lives.
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

export default AboutUsModal;