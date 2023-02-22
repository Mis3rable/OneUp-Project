import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ScrollView, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Category = () => {
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
        <Text style={styles.title01}>
          Start your journey with a reminder
        </Text>
        <Text style={styles.title02}>
          Create a Reminder
        </Text>
        <Text style={styles.title03}>
          Chhose a Category
        </Text>
        <View style={styles.CategoryContainer}>
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
        </View>
    </ScrollView>
    </SafeAreaView>
  
);
};

export default Category;