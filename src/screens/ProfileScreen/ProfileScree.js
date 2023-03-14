import { View, Button, AppState, Text} from "react-native";
import AboutUsModal from "./AboutUs";
import PrivacyModal from "./Privacy";
import TermsModal from "./Terms";
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import 'firebase/auth';

export default function ProfileScreen ({ route }) {  
    const { user } = route.params;
    console.log(user);
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            // Navigate to the login screen after successful logout
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', top: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome {user.fullName}!!!</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
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
