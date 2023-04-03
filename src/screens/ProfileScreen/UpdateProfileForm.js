import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../firebase/config'
import { Picker } from '@react-native-picker/picker'
import parishOptions from './ParishOptions';
import municipalityOptions from './MunicipalityOptions';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function UpdateProfile({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [selectedMunicipality, setSelectedMunicipality] = useState(user.selectedMunicipality);
  const [selectedParish, setSelectedParish] = useState(user.selectedParish);
  
  const handleUpdateProfile = async () => {
    try {
      const userRef = firebase.firestore().collection('users').doc(user.id);
      await userRef.update({
        fullName,
        email,
        selectedParish,
        selectedMunicipality
      });
      console.log('User profile updated!');
      await AsyncStorage.removeItem('userData');
      await firebase.auth().signOut(); // sign out the user
      route.params.setUser(null);
      Alert.alert(
        'Update Successfully',
        'Please login again to continue.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
        <TextInput style={styles.input}
            value={fullName}
            onChangeText={setFullName}
        />
      <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input}
            value={email}
            onChangeText={setEmail}
        />
    <>
    <Text style={styles.label}>Municipality:</Text>
    <Picker
    style={[styles.input, {borderWidth: 1, borderColor: '#aaaaaa'}]}
    selectedValue={selectedMunicipality}
    onValueChange={(itemValue, itemIndex) => {
        setSelectedMunicipality(itemValue);
        setSelectedParish(null);}}
    >
    <Picker.Item label="Select a Municipality" value={null} />
    {municipalityOptions.map((option, index) => (
        <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
    </Picker>
    {selectedMunicipality && (
        <Picker
        style={[styles.input, {borderWidth: 1, borderColor: '#aaaaaa'}]}
        selectedValue={selectedParish}
        onValueChange={(itemValue) => setSelectedParish(itemValue)}
        >
    <Picker.Item label="Select a parish" value={null} />
    {parishOptions[selectedMunicipality].map((option, index) => (
        <Picker.Item key={index} label={option.label} value={option.value} />
    ))}
    </Picker>
    )}
    </>
      <TouchableOpacity onPress={handleUpdateProfile}>
        <Text>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 10,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#1e90ff',
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });