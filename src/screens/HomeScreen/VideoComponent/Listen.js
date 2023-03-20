import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Listen = () => {
    const navigation = useNavigation();

    const handleOOTDCardPress = () => {
      navigation.navigate('Prayer');
    }

    const handlePrayerCardPress = () => {
      navigation.navigate('Eucharistic');
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
            title: 'Rosary',
            image: require('../../../../assets/prayer.png'),
            onPress: handleOOTDCardPress,
        },  
        {
            title: 'Eucharistic',
            image: require('../../../../assets/cards-ECH.png'),
            onPress: handlePrayerCardPress,
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listen</Text>
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
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
});

export default Listen;