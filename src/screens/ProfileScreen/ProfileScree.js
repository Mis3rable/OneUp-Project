import { View, Button, AppState} from "react-native";
import AboutUsModal from "./AboutUs";
import PrivacyModal from "./Privacy";
import TermsModal from "./Terms";
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import 'firebase/auth';

export default function ProfileScreen () {  
    
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
