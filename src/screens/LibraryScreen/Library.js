import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Library = () => {
    const navigation = useNavigation();

    const handleDeepeningCardPress = () => {
      navigation.navigate('Deepening');
    }
  
    const handlePrayerCardPress = () => {
      navigation.navigate('Prayer');
    }
  
    const handleRosaryCardPress = () => {
      navigation.navigate('Rosary');
    }

return (
  
    <SafeAreaView>
    <ScrollView>
    
    <Card style={styles.card} >
    <TouchableOpacity onPress={handleDeepeningCardPress}>
    <Card.Cover style={styles.cover} source={require('../../../assets/Deepening.png')}/>
    </TouchableOpacity>
    </Card>
    
    <Card style={styles.card}>
    <TouchableOpacity onPress={handlePrayerCardPress}>
    <Card.Cover style={styles.cover} source={require('../../../assets/Prayer.png')}/>
    </TouchableOpacity>
    </Card>

    <Card style={styles.card}>
    <TouchableOpacity onPress={handleRosaryCardPress}>
    <Card.Cover style={styles.cover} source={require('../../../assets/Rosary.png')}/>
    </TouchableOpacity>
    </Card>
    
    </ScrollView>
    </SafeAreaView>
  
);
};
export default Library;