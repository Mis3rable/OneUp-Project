import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Watch = () => {
    const navigation = useNavigation();

    const handleOOTDCardPress = () => {
      navigation.navigate('OOTD');
    }

    const handlePrayerCardPress = () => {
      navigation.navigate('Prayer');
    }

    const handleWordsCardPress = () => {
      navigation.navigate('Words');
    }

    const renderCard = ({ item }) => {
        return (
            <Card>
                <TouchableOpacity onPress={item.onPress}>
                    <Card.Cover source={item.image} />
                </TouchableOpacity>
            </Card>
        );
    }

    const cards = [
        {
            title: 'OOTD',
            image: require('../../../../assets/OOTD.png'),
            onPress: handleOOTDCardPress,
        },  
        {
            title: 'Prayer',
            image: require('../../../../assets/Prayer.png'),
            onPress: handlePrayerCardPress,
        },
        {
            title: 'ShareTheWords',
            image: require('../../../../assets/ShareTheWords.png'),
            onPress: handleWordsCardPress,
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Watch</Text>
            <Carousel 
                data={cards}
                renderItem={renderCard}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
                layout={'default'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start',
      },
});

export default Watch;