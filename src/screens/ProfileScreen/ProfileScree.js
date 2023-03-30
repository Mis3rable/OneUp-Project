import { View, Button, Text} from "react-native";
import AboutUsModal from "./AboutUs";
import PrivacyModal from "./Privacy";
import TermsModal from "./Terms";
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileScreen ({ route }) {  
    const { user, setUser } = route.params;
    const navigation = useNavigation();
    console.log(user);
    const handleLogout = async () => {
        try {
            // Remove user data from AsyncStorages
            await AsyncStorage.removeItem('userData');

            // Sign out user and reset user state
            await firebase.auth().signOut();
            route.params.setUser(null);
            console.log(route.params.setUser);

            // Navigate to the login screen after successful logout
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ImageBackground source={require('../../../assets/background/people.png')}
        style={styles.background}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.info}>
        <Text style={styles.info}>Welcome {user ? user.fullName : ''}!</Text>
        <Text style={styles.info}>Email: {user ? user.email : ''}</Text>
        <Text style={styles.info}>Parish: {user ? user.selectedParish : ''}</Text>
        <Text style={styles.info}>Municipality: {user ? user.selectedMunicipality : ''}</Text>
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
        <TouchableOpacity
            style={styles.button}
            onPress={handleLogout}>
            <Text style={styles.buttonTitle}>Log Out</Text>
        </TouchableOpacity>
        </View>
        </View>
        </ImageBackground>
      );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    info: {
    color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 5,
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'skyblue',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        width: 100
        // borderColor: 'orange',
        // borderWidth: 1,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
    },
});