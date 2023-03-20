import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native'
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
    const [loading, setLoading] = useState(false)

    const municipalityOptions = [
        { label: 'Angat', value: 'Angat' },
        { label: 'Balagtas', value: 'Balagtas' },
        { label: 'Baliuag', value: 'Baliuag' },
        { label: 'Bocaue', value: 'Bocaue' },
        { label: 'Bulacan', value: 'Bulacan' },
        { label: 'Bustos', value: 'Bustos' },
        { label: 'Calumpit', value: 'Calumpit' },
        { label: 'Doña Remedios Trinidad', value: 'Doña Remedios Trinidad' },
        { label: 'Guiguinto', value: 'Guiguinto' },
        { label: 'Hagonoy', value: 'Hagonoy' },
        { label: 'Malolos', value: 'Malolos' },
        { label: 'Marilao', value: 'Marilao' },
        { label: 'Meycauayan', value: 'Meycauayan' },
        { label: 'Norzagaray', value: 'Norzagaray' },
        { label: 'Obando', value: 'Obando' },
        { label: 'Pandi', value: 'Pandi' },
        { label: 'Paombong', value: 'Paombong' },
        { label: 'Plaridel', value: 'Plaridel' },
        { label: 'Pulilan', value: 'Pulilan' },
        { label: 'San Ildefonso', value: 'San Ildefonso' },
        { label: 'San Jose Del Monte', value: 'San Jose Del Monte' },
        { label: 'San Miguel', value: 'San Miguel' },
        { label: 'San Rafael', value: 'San Rafael' },
        { label: 'Sta. Maria', value: 'Sta. Maria' },
      ];

    const parishOptions = {
    'Angat': [
        { label: 'Our Lady of the Assumption Parish', value: 'Our Lady of the Assumption Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
        { label: 'St. Augustine Parish', value: 'St. Augustine Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'Our Lady of Lourdes Parish', value: 'Our Lady of Lourdes Parish' },
    ],
    'Balagtas': [
        { label: 'Our Lady of Mount Carmel Parish', value: 'Our Lady of Mount Carmel Parish' },
        { label: 'San Juan Bautista Parish', value: 'San Juan Bautista Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
    ],
    'Baliuag': [
        { label: 'St. Augustine Parish', value: 'St. Augustine Parish' },
        { label: 'Our Lady of Mt. Carmel Parish', value: 'Our Lady of Mt. Carmel Parish' },
        { label: 'St. Martin of Tours Parish', value: 'St. Martin of Tours Parish' },
        { label: 'St. Isidore the Farmer Parish', value: 'St. Isidore the Farmer Parish' },
        { label: 'Holy Cross Parish', value: 'Holy Cross Parish' },
        { label: 'Holy Family Parish', value: 'Holy Family Parish' },
        { label: 'San Rafael Parish', value: 'San Rafael Parish' },
    ],
    'Bocaue': [
        { label: 'Divine Mercy Parish', value: 'Divine Mercy Parish' },
        { label: 'St. Martin of Tours Parish', value: 'St. Martin of Tours Parish' },
        { label: 'Holy Cross Parish', value: 'Holy Cross Parish' },
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
    ],
    'Bulacan': [
        { label: 'St. James the Apostle Parish', value: 'St. James the Apostle Parish' },
        { label: 'Our Lady of Mercy Parish', value: 'Our Lady of Mercy Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'San Nicolas de Tolentino Parish', value: 'San Nicolas de Tolentino Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
    ],
    'Bustos': [
        { label: 'Our Lady of Immaculate Conception Parish', value: 'Our Lady of Immaculate Conception Parish' },
        { label: 'San Isidro Labrador Parish ', value: 'San Isidro Labrador Parish ' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
        { label: 'St. Francis of Assisi Parish', value: 'St. Francis of Assisi Parish' },
    ],
    'Calumpit': [
        { label: 'St. John the Baptist Parish', value: 'St. John the Baptist Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'Our Lady of Lourdes Parish', value: 'Our Lady of Lourdes Parish' },
        { label: 'St. Andrew the Apostle Parish', value: 'St. Andrew the Apostle Parish' },
        { label: 'Our Lady of Fatima Parish', value: 'Our Lady of Fatima Parish' },
    ],
    'Doña Remedios Trinidad': [
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'Our Lady of Lourdes Parish', value: 'Our Lady of Lourdes Parish' },
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
    ],
    'Guiguinto': [
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'Our Lady of the Holy Rosary Parish', value: 'Our Lady of the Holy Rosary Parish' },
        { label: 'San Ildefonso Parish', value: 'San Ildefonso Parish' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
        { label: 'St. Augustine Parish', value: 'St. Augustine Parish' },
    ],
    'Hagonoy': [
        { label: 'St. Anne Parish ', value: 'St. Anne Parish ' },
        { label: 'Our Lady of the Most Holy Rosary Parish', value: 'Our Lady of the Most Holy Rosary Parish' },
        { label: 'San Agustin Parish', value: 'San Agustin Parish' },
        { label: 'San Miguel Parish', value: 'San Miguel Parish' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
        { label: 'St. John the Baptist Parish', value: 'St. John the Baptist Parish' },
        { label: 'St. Andrew Parish', value: 'St. Andrew Parish' },
        { label: 'Holy Cross Parish', value: 'Holy Cross Parish' },
    ],
    'Malolos': [
        { label: 'Our Lady of Immaculate Conception Cathedral', value: 'Our Lady of Immaculate Conception Cathedral' },
        { label: 'Barasoain Church or Our Lady of Mt. Carmel Parish', value: 'Barasoain Church or Our Lady of Mt. Carmel Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'Immaculate Heart of Mary Parish', value: 'Immaculate Heart of Mary Parish' },
        { label: 'Sagrada Familia Parish ', value: 'Sagrada Familia Parish ' },
        { label: 'St. Augustine Parish', value: 'St. Augustine Parish' },
        { label: 'Holy Cross Parish', value: 'Holy Cross Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
        { label: 'San Vicente Ferrer Parish', value: 'San Vicente Ferrer Parish' },
        { label: 'Santo Cristo Parish', value: 'Santo Cristo Parish' },
        { label: 'St. John the Baptist Parish', value: 'St. John the Baptist Parish' },
        { label: 'St. Martin de Porres Parish', value: 'St. Martin de Porres Parish' },
        { label: 'Good Shepherd Parish', value: 'Good Shepherd Parish' },
    ],
    'Marilao': [
        { label: 'Our Lady of the Immaculate Conception Parish', value: 'Our Lady of the Immaculate Conception Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'St. Michael the Archangel Parish', value: 'St. Michael the Archangel Parish' },
        { label: 'San Miguel Parish', value: 'San Miguel Parish' },
        { label: 'San Vicente Ferrer Parish', value: 'San Vicente Ferrer Parish' },
        { label: 'Sagrada Familia Parish', value: 'Sagrada Familia Parish' },
    ],
    'Meycauayan': [
        { label: 'St. Francis of Assisi Parish', value: 'St. Francis of Assisi Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'Divine Mercy Parish', value: 'Divine Mercy Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'St. Mary Magdalene Parish', value: 'St. Mary Magdalene Parish' },
        { label: 'Sacred Heart of Jesus Parish', value: 'Sacred Heart of Jesus Parish' },
    ],
    'Norzagaray': [
        { label: 'St. Andrew the Apostle Parish', value: 'St. Andrew the Apostle Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
        { label: 'Our Lady of Lourdes Parish', value: 'Our Lady of Lourdes Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
    ],
    'Obando': [
        { label: 'San Pascual Baylon Parish', value: 'San Pascual Baylon Parish' },
        { label: 'Nuestra Señora de Salambao Parish', value: 'Nuestra Señora de Salambao Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
    ],
    'Pandi': [
        { label: 'St. James the Apostle Parish', value: 'St. James the Apostle Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'Our Lady of Peace and Good Voyage Parish', value: 'Our Lady of Peace and Good Voyage Parish' },
        { label: 'Our Lady of the Most Holy Rosary Parish', value: 'Our Lady of the Most Holy Rosary Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
    ],
    'Paombong': [
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
        { label: 'Our Lady of Fatima Parish', value: 'Our Lady of Fatima Parish' },
        { label: 'San Jose Parish', value: 'San Jose Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
    ],
    'Plaridel': [
        { label: 'San Ildefonso Parish', value: 'San Ildefonso Parish' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
        { label: 'Holy Cross Parish', value: 'Holy Cross Parish' },
        { label: 'Sacred Heart Parish', value: 'Sacred Heart Parish' },
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
    ],
    'Pulilan': [
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
        { label: 'Nuestra Señora de la Correa Parish', value: 'Nuestra Señora de la Correa Parish' },
        { label: 'San Francisco de Asis Parish', value: 'San Francisco de Asis Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
        { label: 'Our Lady of Fatima Parish', value: 'Our Lady of Fatima Parish' },
    ],
    'San Ildefonso': [
        { label: 'San Ildefonso de Toledo Parish', value: 'San Ildefonso de Toledo Parish' },
        { label: 'Our Lady of the Holy Rosary Parish', value: 'Our Lady of the Holy Rosary Parish' },
        { label: 'St. Anthony of Padua Parish', value: 'St. Anthony of Padua Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'San Jose Parish', value: 'San Jose Parish' },
    ],
    'San Jose Del Monte': [
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'Sagrada Familia Parish', value: 'Sagrada Familia Parish' },
        { label: 'Mary the Queen Parish', value: 'Mary the Queen Parish' },
        { label: 'Holy Cross Parish', value: 'Holy Cross Parish' },
        { label: 'Divine Mercy Parish', value: 'Divine Mercy Parish' },
        { label: 'Our Lady of Lourdes Parish', value: 'Our Lady of Lourdes Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
    ],
    'San Miguel': [
        { label: 'San Miguel de Archangel Parish', value: 'San Miguel de Archangel Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'St. John the Baptist Parish', value: 'St. John the Baptist Parish' },
        { label: 'Our Lady of Lourdes Parish', value: 'Our Lady of Lourdes Parish' },
    ],
    'San Rafael': [
        { label: 'San Rafael Parish', value: 'San Rafael Parish' },
        { label: 'Our Lady of the Most Holy Rosary Parish', value: 'Our Lady of the Most Holy Rosary Parish' },
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
        { label: 'San Roque Parish', value: 'San Roque Parish' },
        { label: 'San Vicente Ferrer Parish', value: 'San Vicente Ferrer Parish' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
    ],
    'Sta. Maria': [
        { label: 'Our Lady of the Holy Rosary Parish', value: 'Our Lady of the Holy Rosary Parish' },
        { label: 'San Vicente Ferrer Parish', value: 'San Vicente Ferrer Parish' },
        { label: 'Holy Trinity Parish', value: 'Holy Trinity Parish' },
        { label: 'Sto. Rosario de Hagonoy Parish', value: 'Sto. Rosario de Hagonoy Parish' },
        { label: 'St. Jude Thaddeus Parish', value: 'St. Jude Thaddeus Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'Holy Family Parish', value: 'Holy Family Parish' },
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
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
            setLoading(false)
            return
        }
        setLoading(true)
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
                        console.log('Register successful');
                        navigation.navigate('Category', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                        setLoading(false)
                    });
            })
            .catch((error) => {
                alert(error)
                setLoading(false)
        });
    }

    return (
        <ImageBackground
            source={require('../../../assets/bg.jpg')}
            style={styles.background}>
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%'}}
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
                <Picker.Item label="Select a Municipality" value={null} />
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
                    {loading ? (
                        <ActivityIndicator color="#ffffff" size="small" />
                        ) : (
                            <Text style={styles.buttonTitle}>Create Account</Text>
                            )}
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    </ImageBackground>
    )
}