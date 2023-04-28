import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const PrayerCard = () => {
    const navigation = useNavigation();

    const handlePrayerCardPress = () => {
        navigation.navigate('Prayers');
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
            image: require('../../../../assets/Prayer.jpg'),
            onPress: handlePrayerCardPress,
        },  
        
    ];

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Read</Text> */}
            <Carousel 
                data={cards}
                renderItem={renderCard}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={330}
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
        shadowColor: 'rgba(0, 0, 0, 0.82)',
        shadowOffset: {
        width: 10,
        height: 10,
        },
        shadowOpacity: 0.80,
        shadowRadius: 3.84,
        elevation: 10,
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

export default PrayerCard;