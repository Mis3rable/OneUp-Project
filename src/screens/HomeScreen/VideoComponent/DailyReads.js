import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import { ScrollView, SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DailyReadsCard = () => {
    const navigation = useNavigation();
    const handleCardPress = () => {
      navigation.navigate('Scripture');
    }
return (

    <View>
        <Text style={styles.title}>Daily Reads</Text>
            <Card style={styles.card}>
                <TouchableOpacity onPress={() => handleCardPress('DailyReadsCard')}>
                    <Card.Cover source={require('../../../../assets/Scripture.png')} style={styles.cover}/>
                </TouchableOpacity>
            </Card>
    </View>
);
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    card: {
        backgroundColor: 'green',
        elevation: 0,
        width: 320,
        height: 170,
        alignSelf: 'center',
    },
    cover: {
        width: 320, 
        height: 170,
        alignSelf: 'center'
    },
});

export default DailyReadsCard;