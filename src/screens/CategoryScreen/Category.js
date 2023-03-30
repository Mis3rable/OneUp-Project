import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ScrollView, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Category = ({route}) => {
    const navigation = useNavigation();
    const {user} = route.params;
    const handleCardPress = () => {
      navigation.navigate('Home', {user: user, initialRouteName: 'Schedule'});
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
        <TouchableOpacity onPress={() => handleCardPress('SaMadalingSabi')}>
        <Card.Cover style={styles.cover} source={require('../../../assets/SaMadalingSabi.jpg')}/>
        </TouchableOpacity>
        </Card>
        
        <Card style={styles.card}>
        <TouchableOpacity onPress={() => handleCardPress('Prayer')}>
        <Card.Cover style={styles.cover} source={require('../../../assets/Prayer.jpg')}/>
        </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
        <TouchableOpacity onPress={() => handleCardPress('CrossWord')}>
        <Card.Cover style={styles.cover} source={require('../../../assets/CrossWord.jpg')}/>
        </TouchableOpacity>
        </Card>
        </View>
    </ScrollView>
    </SafeAreaView>
  
);
};

export default Category;