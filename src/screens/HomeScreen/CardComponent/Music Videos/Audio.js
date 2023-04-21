import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Audio = () => {
    const navigation = useNavigation();

    const handleLithurgicalCardPress = () => {
        navigation.navigate('Liturgical Songs');
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
            title: 'Lithurgical',
            image: require('../../../../../assets/Liturgical.jpg'),
            onPress: handleLithurgicalCardPress,
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio</Text>
            <Carousel 
                data={cards}
                renderItem={renderCard}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={330}
                layout={'default'}
            />
            <Text style={styles.swipe}> Swipe to browse more categories</Text>
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
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 8,
        alignSelf: 'flex-start',
        color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 5,
    },
    swipe: {
        color: 'white', 
        fontStyle: 'italic', 
        fontSize: 14,
        marginBottom: 15, 
        marginTop: 5, 
        textShadowColor: 'black', 
        textShadowOffset: { width: 3, height: 3 }, 
        textShadowRadius: 5,
    }
});

export default Audio;