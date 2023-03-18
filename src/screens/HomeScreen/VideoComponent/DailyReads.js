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
  
    <SafeAreaView>
    <ScrollView>
        <View >
        <Card >
        <Text style={styles.title}>Daily Reads</Text>
        <TouchableOpacity onPress={() => handleCardPress('DailyReadsCard')}>
        <Card.Cover  source={require('../../../../assets/Scripture.png')}/>
        </TouchableOpacity>
        </Card>
        </View>
    </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start',
        color: "blue",
        fontFamily: 'DMSerifDisplay-Regular',
        fontWeight: '500',
        color: "blue",
      },
});

export default DailyReadsCard;