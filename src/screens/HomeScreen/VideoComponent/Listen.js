import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Listen = () => {
    const navigation = useNavigation();

    const handleOOTDCardPress = () => {
      navigation.navigate('Rosary');
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
            image: require('../../../../assets/Rosary.png'),
            onPress: handleOOTDCardPress,
        },  
        {
            title: 'Eucharistic',
            image: require('../../../../assets/card_ECH.png'),
            onPress: handlePrayerCardPress,
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.myText}>Listen</Text>
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
        marginBottom: 20,
        alignSelf: 'flex-start',
        color: "blue",
        fontFamily: 'DMSerifDisplay-Regular',
        fontWeight: '500',
        color: "blue",
      },
      myText: {
        fontFamily: 'DMSerifDisplay-Regular',
        fontWeight: '500',
        fontSize: 24,
        color: "blue",
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 30,
        marginBottom: 20,
    },
});

export default Listen;