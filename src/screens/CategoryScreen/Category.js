import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ScrollView, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Category = () => {
    const navigation = useNavigation();

    const handleOOTDCardPress = () => {
      navigation.navigate('OOTD');
    }
  
    const handlePrayerCardPress = () => {
      navigation.navigate('Prayer');
    }
  
    const handleWordsCardPress = () => {
      navigation.navigate('ShareTheWords');
    }

return (
  
    <SafeAreaView>
    <ScrollView>
        <Text style={[styles.title01, { marginTop: 50 }]}>
          Start your journey with a reminder
        </Text>
        <Text style={styles.title02}>
          Create a Reminder
        </Text>
        <Text style={styles.title03}>
          Choose a Category
        </Text>
        <View style={styles.CategoryContainer}>
        <Card style={styles.card} >
        <TouchableOpacity onPress={handleOOTDCardPress}>
        <Card.Cover style={styles.cover} source={require('../../../assets/OOTD.png')}/>
        </TouchableOpacity>
        </Card>
        
        <Card style={styles.card}>
        <TouchableOpacity onPress={handlePrayerCardPress}>
        <Card.Cover style={styles.cover} source={require('../../../assets/Prayer.png')}/>
        </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
        <TouchableOpacity onPress={handleWordsCardPress}>
        <Card.Cover style={styles.cover} source={require('../../../assets/ShareTheWords.png')}/>
        </TouchableOpacity>
        </Card>
        </View>
    </ScrollView>
    </SafeAreaView>
  
);
};

export default Category;