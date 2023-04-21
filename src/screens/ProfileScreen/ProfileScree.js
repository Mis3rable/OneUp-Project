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
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen ({ route }) {  
    const { user, setUser } = route.params;
    const navigation = useNavigation();
    console.log(user);
    
    const handleLogout = async () => {
        try {
            // Remove user data from AsyncStorages
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('schedules');
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
            <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                <View style={styles.profileImage}>
                    {user.photoURL ? ( <Image source={{ uri: user.photoURL }} style={styles.profileImage}/>
                    ) : (
                        <Image source={require('../../../assets//placeholder.png')} style={styles.profileImage}/>
                        )}
                <TouchableOpacity style={styles.editButton} onPress={handleUpdateProfile}>
                    <Ionicons name="pencil-sharp" size={15} color="white"/>
                </TouchableOpacity>   
                </View>
                </View>
                <View style={styles.userinfo}>
                <View>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.label}>Parish:</Text>
                    <Text style={styles.label}>Municipality:</Text>
                </View>
                <View>
                    <Text style={styles.value}>{user ? user.fullName : ''}</Text>
                    <Text style={styles.value}>{user ? user.email : ''}</Text>
                    <Text style={styles.value}>{user ? user.selectedParish : ''}</Text>
                    <Text style={styles.value}>{user ? user.selectedMunicipality : ''}</Text>
                </View>
                </View>
                <View style={styles.modalContainer}>
                    <Text style={styles.about}> ABOUT </Text>
                    <AboutUsModal />
                    <PrivacyModal/>
                    <TermsModal/>
                <View>
                    <TouchableOpacity style={styles.Button} onPress={handleLogout}>
                        <Ionicons name="exit-outline" size={20} color="white" style={styles.icon} />
                        <Text style={styles.ButtonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 5
      },
    Button: {
        backgroundColor: 'chocolate',
        padding: 12,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 20,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center'
      },
      ButtonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
      },
      modalContainer: {
        backgroundColor: 'white',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    about:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'chocolate'
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      margin: 20 
    },
    userinfo: {
        backgroundColor: 'white',
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
      },
      value: {
        fontSize: 16,
      },
      profileContainer: {
        backgroundColor: 'white',
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
      },
      profileImage: {
        marginTop: 5,
        marginBottom: 5,
        width: 90,
        height: 90,
        borderRadius: 50,
        alignSelf: 'center'
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'saddlebrown',
        padding: 8,
        borderRadius: 20,
      },
});