import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ImageBackground } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationScreen({navigation, setUser}) {
    const [fullName, setFullName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedInput, setFocusedInput] = useState(null);

    const handleFocus = (inputName) => setFocusedInput(inputName);
    const handleBlur = () => setFocusedInput(null);

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
        { label: 'Valenzuela', value: 'Valenzuela' },
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
        { label: 'Our Lady of the Holy Rosary Parish', value: 'Our Lady of the Holy Rosary Parish' },
        { label: 'Sagrada Familia Parish', value: 'Sagrada Familia Parish' },
        { label: 'Virgen delas Flores Parish', value: 'Virgen delas Flores Parish' },
        { label: 'Our Lady of Mt. Carmel Parish', value: 'Our Lady of Mt. Carmel Parish' },
        { label: 'Parokya ng Inmaculada Concepcion', value: 'Parokya ng Inmaculada Concepcion' },
        { label: 'St. John of God Parish', value: 'St. John of God Parish' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
        { label: 'Sta. Monica Parish', value: 'Sta. Monica Parish' },
        { label: 'Immaculate Conception Quasi Parish', value: 'Immaculate Conception Quasi Parish' },
        { label: 'St. Paul the Apostle Parish', value: 'St. Paul the Apostle Parish' },
        { label: 'Sta. Rita de Cascia Parish', value: 'Sta. Rita de Cascia Parish' },
        { label: 'Our Lady of Lourdes Parish', value: 'Our Lady of Lourdes Parish' },
        { label: 'Parokya ng Pag-Akyat sa Langit ng Panginoong Hesukristo', value: 'Parokya ng Pag-Akyat sa Langit ng Panginoong Hesukristo' },
    ],
    'Bocaue': [
        { label: 'St. Peter of Alcantara Parish', value: 'St. Peter of Alcantara Parish' },
        { label: 'St. Martin of Tours Parish', value: 'St. Martin of Tours Parish' },
        { label: 'Sto. Cristo Parish & Diocesan Shrine of St. Andrew Kim Taegon', value: 'Sto. Cristo Parish & Diocesan Shrine of St. Andrew Kim Taegon' },
        { label: 'St. Michael the Archangel Parish', value: 'St. Michael the Archangel Parish' },
        { label: 'National Shrine & Parish of the Divine Mercy', value: 'National Shrine & Parish of the Divine Mercy' },
        { label: 'Our Lady of Fatima Parish', value: 'Our Lady of Fatima Parish' },
        { label: 'St. Lawrence Deacon & Martyr Parish', value: 'St. Lawrence Deacon & Martyr Parish' },
        { label: 'St. Peter the Apostle Parish', value: 'St. Peter the Apostle Parish' },
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
        { label: 'Mother of Mercy Quasi-Parish', value: 'Mother of Mercy Quasi-Parish' },
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
        { label: 'National Shrine & Parish of St. Anne', value: 'National Shrine & Parish of St. Anne' },
        { label: 'St. Helena the Empress Parish', value: 'St. Helena the Empress Parish' },
        { label: 'St. John the Baptist Parish', value: 'St. John the Baptist Parish' },
        { label: 'St. Anthony of Padua Parish', value: 'St. Anthony of Padua Parish' },
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
        { label: 'Nstra Sra del Santissimo Rosario Parish', value: 'Nstra Sra del Santissimo Rosario Parish' },
        { label: 'Ina ng laging Saklolo Parish', value: 'Ina ng laging Saklolo Parish' },
        { label: 'St. James the Apostle Parish', value: 'St. James the Apostle Parish' },
        { label: 'Sta. Cruz Mission Parish', value: 'Sta. Cruz Mission Parish' },
    ],
    'Malolos': [
        { label: 'Cathedral & Basilica Minore of the Immaculate Conception', value: 'Cathedral & Basilica Minore of the Immaculate Conception' },
        { label: 'Our Lady of Mt. Carmel Parish (Barasoain Church)', value: 'Our Lady of Mt. Carmel Parish (Barasoain Church)' },
        { label: 'San Isidro Labrador Parish (Bambang)', value: 'San Isidro Labrador Parish (Bambang)' },
        { label: 'Parish of the Holy Spirit', value: 'Parish of the Holy Spirit' },
        { label: 'Hearts of Jesus & Mary Parish', value: 'Hearts of Jesus & Mary Parish' },
        { label: 'Santissima Trinidad Parish', value: 'Santissima Trinidad Parish' },
        { label: "Our Lady of the Lord's Presentation Parish", value: "Our Lady of the Lord's Presentation Parish" },
        { label: 'St. Elizabeth of Hungary Parish', value: 'St. Elizabeth of Hungary Parish' },
        { label: 'Stella Maris Mission Parish', value: 'Stella Maris Mission Parish' },
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
        { label: 'Diocesan Shrine & Parish of Nstra. Sra. dela Asuncion', value: 'Diocesan Shrine & Parish of Nstra. Sra. dela Asuncion' },
        { label: 'San Isidro Labrador Parish (Bulihan)', value: 'San Isidro Labrador Parish (Bulihan)' },
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
        { label: 'Our Lady of the Holy Rosary Quasi-Parish', value: 'Our Lady of the Holy Rosary Quasi-Parish' },
        { label: 'St. Joseph the Worker Paris', value: 'St. Joseph the Worker Paris' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'San Isidro-San Roque Parish', value: 'San Isidro-San Roque Parish' },
        { label: 'St. Bartholomew Parish', value: 'St. Bartholomew Parish' },
        { label: 'Parokya ng Muling Pagkabuhay', value: 'Parokya ng Muling Pagkabuhay' },
        { label: 'National Shrine of Our Lady of Salambao - San Pascual', value: 'National Shrine of Our Lady of Salambao - San Pascual' },
        { label: 'Baylon Parish', value: 'Baylon Parish' },
        { label: 'Sta. Cruz Parish', value: 'Sta. Cruz Parish' },
        { label: 'Our Lady of Salambao Mission Parish', value: 'Our Lady of Salambao Mission Parish' },
        { label: 'Our Lady of Fatima Parish', value: 'Our Lady of Fatima Parish' },
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
        { label: 'St. James the Apostle Parish', value: 'St. James the Apostle Parish' },
        { label: 'St. Michael the Archangel ', value: 'St. Michael the Archangel ' },
        { label: 'Holy Angels Parish', value: 'Holy Angels Parish' },
        { label: 'Sta. Rita de Cascia Parish', value: 'Sta. Rita de Cascia Parish' },
        { label: 'Parokya ng Banal na Mag-Anak', value: 'Parokya ng Banal na Mag-Anak' },
        { label: 'St. Ildephonse of Toledo Parish', value: 'St. Ildephonse of Toledo Parish' },
        { label: 'Sto. Rosario Parish', value: 'Sto. Rosario Parish' },
        { label: 'Diocesan Shrine & Parish of St. John the Baptist', value: 'Diocesan Shrine & Parish of St. John the Baptist' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'St. Mark the Evangelist Parish', value: 'St. Mark the Evangelist Parish' },
        { label: 'Diocesan Shrine & Parish of San Isidro Labrador', value: 'Diocesan Shrine & Parish of San Isidro Labrador' },
        { label: 'Our Lady of Miraculous Medal Parish', value: 'Our Lady of Miraculous Medal Parish' },
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
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
        { label: 'Our Lady of La Salette Quasi-Parish', value: 'Our Lady of La Salette Quasi-Parish' },
        { label: 'Sacred Heart of Jesus Parish', value: 'Sacred Heart of Jesus Parish' },
        { label: 'Sto. Cristo Quasi-Parish', value: 'Sto. Cristo Quasi-Parish' },
        { label: 'St. Peter the Apostle Parish', value: 'St. Peter the Apostle Parish' },
        { label: 'Our Lady of Perpetual Help Quasi-Parish', value: 'Our Lady of Perpetual Help Quasi-Parish' },
        { label: 'Our Lady of the Holy Rosary Parish', value: 'Our Lady of the Holy Rosary Parish' },
        { label: 'Our Lady of Assumption Quasi-Parish', value: 'Our Lady of Assumption Quasi-Parish' },
        { label: 'Christ the King Parish', value: 'Christ the King Parish' },
        { label: 'Sagrada Familia Parish', value: 'Sagrada Familia Parish' },
        { label: 'San Lorenzo Ruiz Parish', value: 'San Lorenzo Ruiz Parish' },
        { label: 'Virgen delas Flores Parish', value: 'Virgen delas Flores Parish' },
        { label: 'Our Lady of Guadalupe Parish', value: 'Our Lady of Guadalupe Parish' },
    ],
    'San Miguel': [
        { label: 'Diocesan Shrine & Parish of St. Michael the Archangel', value: 'Diocesan Shrine & Parish of St. Michael the Archangel' },
        { label: 'San Jose Esposo de Maria Parish', value: 'San Jose Esposo de Maria Parish' },
        { label: 'Our Lady of Remedies Parish', value: 'Our Lady of Remedies Parish' },
        { label: 'Sacred Heart of Jesus Parish', value: 'Sacred Heart of Jesus Parish' },
        { label: 'St. Ildephonsus Parish', value: 'St. Ildephonsus Parish' },
        { label: 'Most Holy Eucharist Quasi Parish', value: 'Most Holy Eucharist Quasi Parish' },
        { label: 'Sto. Rosario Parish', value: 'Sto. Rosario Parish' },
        { label: 'Diocesan Shrine & Parish of Sagrado Corazon de Jesus', value: 'Diocesan Shrine & Parish of Sagrado Corazon de Jesus' },
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
        { label: 'La Purisima Concepcion Parish', value: 'La Purisima Concepcion Parish' },
        { label: 'St. John the Evangelist Parish', value: 'St. John the Evangelist Parish' },
        { label: 'St. Gabriel the Archangel Parish', value: 'St. Gabriel the Archangel Parish' },
        { label: 'Sto. Niño Parish', value: 'Sto. Niño Parish' },
        { label: 'Quasi-Parish & Diocesan Shrine of Mother of the Eucharist & Grace', value: 'Quasi-Parish & Diocesan Shrine of Mother of the Eucharist & Grace ' },
        { label: 'Our Lady of Mt. Carmel Parish', value: 'Our Lady of Mt. Carmel Parish' },
        { label: 'San Isidro Labrador Quasi Parish', value: 'San Isidro Labrador Quasi Parish' },
        { label: 'Parish of the Holy Family', value: 'Parish of the Holy Family' },
        { label: 'Blessed Sacrament Parish', value: 'Blessed Sacrament Parish' },
        { label: 'Immaculate Conception Parish', value: 'Immaculate Conception Parish' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
        { label: 'St. Andrew the Apostle Parish', value: 'St. Andrew the Apostle Parish' },
    ],
    'Valenzuela': [
        { label: 'San Diego de Alcala Parish', value: 'San Diego de Alcala Parish' },
        { label: 'Hearts of Jesus & Mary Parish', value: 'Hearts of Jesus & Mary Parish' },
        { label: 'San Isidro Labrador Parish', value: 'San Isidro Labrador Parish' },
        { label: 'Our Lady of the Holy Rosary Parish', value: 'Our Lady of the Holy Rosary Parish' },
        { label: 'San Juan dela Cruz Parish', value: 'San Juan dela Cruz Parish' },
        { label: 'National Shrine & Parish of Our Lady of Fatima', value: 'National Shrine & Parish of Our Lady of Fatima' },
        { label: 'Sto. Cristo Parish', value: 'Sto. Cristo Parish' },
        { label: 'Parish of the Holy Cross', value: 'Parish of the Holy Cross' },
        { label: 'Parish of the Risen Lord', value: 'Parish of the Risen Lord' },
        { label: 'St. Joseph the Worker Parish', value: 'St. Joseph the Worker Parish' },
        { label: 'Parish of the Holy Family', value: 'Parish of the Holy Family' },
        { label: 'Quasi-Parish of Our Lady of Lourdes', value: 'Quasi-Parish of Our Lady of Lourdes' },
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
                        AsyncStorage.setItem('userData', JSON.stringify(data))
                        console.log('User data stored in AsyncStorage:', data);
                        setUser(data);
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
            source={require('../../../assets/background/priest.png')}
            style={styles.background}>
        <View style={styles.container}>
        <View style={styles.form}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%'}} 
                keyboardShouldPersistTaps="always">
                {/* <Image
                    style={styles.logo}
                    source={require('../../../assets/OneUp_Logo.png')}
                /> */}
                <Text style={styles.text}> Create an Account </Text>
                <TextInput
                    style={[styles.input,{ borderColor: focusedInput === 'fullName' ? 'skyblue' : '#aaaaaa' },]}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onFocus={() => handleFocus('fullName')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input,{ borderColor: focusedInput === 'age' ? 'skyblue' : '#aaaaaa' },]}
                    placeholder='Age'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setAge(text)}
                    value={age}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    keyboardType='numeric'
                    onFocus={() => handleFocus('age')}
                    onBlur={handleBlur}
                    />
                <>
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
                <TextInput
                    style={[styles.input,{ borderColor: focusedInput === 'email' ? 'skyblue' : '#aaaaaa' },]}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input,{ borderColor: focusedInput === 'password' ? 'skyblue' : '#aaaaaa' },]}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                />
                <TextInput
                    style={[styles.input,{ borderColor: focusedInput === 'confirmPassword' ? 'skyblue' : '#aaaaaa' },]}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
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
        </View>
    </ImageBackground>
    )
}