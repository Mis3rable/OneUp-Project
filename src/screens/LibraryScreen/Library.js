import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Library = () => {
    const navigation = useNavigation();

return (
  <Card style={styles.card}>
    <SafeAreaView>
    <ScrollView>
    
    <Card.Cover style={styles.cover} source={require('../../../assets/Deepening.png')}/>
    <Card.Cover style={styles.cover} source={require('../../../assets/Prayer.png')}/>
    <Card.Cover style={styles.cover} source={require('../../../assets/Rosary.png')}/>
    
    </ScrollView>
    </SafeAreaView>
  </Card>
);
};
export default Library;