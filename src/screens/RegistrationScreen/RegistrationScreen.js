import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const municipalityOptions = [
        { label: 'Municipality 1', value: 'Municipality 1' },
        { label: 'Municipality 2', value: 'Municipality 2' },
        { label: 'Municipality 3', value: 'Municipality 3' },
      ];

    const parishOptions = {
    'Municipality 1': [
        { label: 'Parish 1', value: 'Parish 1' },
        { label: 'Parish 2', value: 'Parish 2' },
        { label: 'Parish 3', value: 'Parish 3' },
    ],
    'Municipality 2': [
        { label: 'Parish 4', value: 'Parish 4' },
        { label: 'Parish 5', value: 'Parish 5' },
        { label: 'Parish 6', value: 'Parish 6' },
    ],
    'Municipality 3': [
        { label: 'Parish 7', value: 'Parish 7' },
        { label: 'Parish 8', value: 'Parish 8' },
        { label: 'Parish 9', value: 'Parish 9' },
    ],
    };

    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const [selectedParish, setSelectedParish] = useState(null);

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    selectedMunicipality,
                    selectedParish,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Category', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', backgroundColor: '#f3fffc' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/OneUp_Logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Age'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAge(text)}
                    value={age}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType='numeric'
                />
                <>
                <Picker
                style={styles.input}
                selectedValue={selectedMunicipality}
                onValueChange={(itemValue, itemIndex) => {
                setSelectedMunicipality(itemValue);
                setSelectedParish(null);}}
                >
                <Picker.Item label="Select a municipality" value={null} />
                {municipalityOptions.map((option, index) => (
                    <Picker.Item key={index} label={option.label} value={option.value} />
                ))}
                </Picker>
                {selectedMunicipality && (
                <Picker
                style={styles.input}
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
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}