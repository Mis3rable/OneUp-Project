import { View, Text, ScrollView, Image } from "react-native";
import AboutUsModal from "./AboutUs";
import PrivacyModal from "./Privacy";
import TermsModal from "./Terms";
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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

            // Navigate to the login screen after successful logout
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdateProfile = () => {
        navigation.navigate('Update Profile', { user, setUser });
    };

    return (
        <ImageBackground source={require('../../../assets/background/church.png')}
        style={styles.background}>
            <ScrollView
                style={{ flex: 1 }}
                >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.profileImage}>
                        {user.photoURL ? (
                            <Image
                                source={{ uri: user.photoURL }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets//placeholder.png')}
                                style={styles.profileImage}
                            />
                        )}
                    </View>
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
                        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                            <Text style={styles.buttonTitle}>Update Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogout}>
                            <Text style={styles.buttonTitle}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
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