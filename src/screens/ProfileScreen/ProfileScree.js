import { View, Button, Text} from "react-native";
import AboutUsModal from "./AboutUs";
import PrivacyModal from "./Privacy";
import TermsModal from "./Terms";
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen ({ route, setUser }) {  
    const { user } = route.params;
    const navigation = useNavigation();
    console.log(user);
    const handleLogout = async () => {
        try {
            // Remove user data from AsyncStorage
            await AsyncStorage.removeItem('userData');

            // Sign out user and reset user state
            await firebase.auth().signOut();
            setUser(null);

            // Navigate to the login screen after successful logout
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', top: 50 }}>
        <Text style={{ fontSize: 24, marginTop: 80, fontWeight: 'bold', fontStyle: 'italic'}}>Welcome {user ? user.fullName : ''}!</Text>
        <Text style={{ fontSize: 20, }}>Email: {user ? user.email : ''}</Text>
        <Text style={{ fontSize: 20, }}>Parish: {user ? user.selectedParish : ''}</Text>
        <Text style={{ fontSize: 20, }}>Municipality: {user ? user.selectedMunicipality : ''}</Text>
        </View>
        <View style={{ marginBottom: 20 , marginTop: 100}}>
            <AboutUsModal />
        </View>
        <View style={{ marginBottom: 20 }}>
            <PrivacyModal/>
        </View>
        <View style={{ marginBottom: 20 }}>
            <TermsModal/>
        </View>
        <View style={{ marginBottom: 20 }}>
        <Button title="Logout" onPress={handleLogout} />
        </View>
        </View>
      );
}
