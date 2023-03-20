import { View, Button, Text} from "react-native";
import AboutUsModal from "./AboutUs";
import PrivacyModal from "./Privacy";
import TermsModal from "./Terms";
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import 'firebase/auth';

export default function ProfileScreen ({ route }) {  
    const [userState, setUserState] = useState(route.params.user);
    const navigation = useNavigation();
    console.log(userState);
    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            setUserState(null);
            // Navigate to the login screen after successful logout
            navigation.navigate('Login', { user: null } );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', top: 50 }}>
        <Text style={{ fontSize: 24, marginTop: 80, fontWeight: 'bold', fontStyle: 'italic'}}>Welcome {userState ? userState.fullName : ''}!</Text>
        <Text style={{ fontSize: 20, }}>Email: {userState ? userState.email : ''}</Text>
        <Text style={{ fontSize: 20, }}>Parish: {userState ? userState.selectedParish : ''}</Text>
        <Text style={{ fontSize: 20, }}>Municipality: {userState ? userState.selectedMunicipality : ''}</Text>
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
