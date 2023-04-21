import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const ReligiousAndInspirationalCard = () => {
    const navigation = useNavigation();

    const handleReligiousAndInspirationalPress = () => {
        navigation.navigate('Religious And Inspirational Videos');
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
            title: "Religious And Inspirational Videos",
            image: require('../../../../../assets/ReligiousAndInspirational.jpg'),
            onPress: handleReligiousAndInspirationalPress,
        },
    ];

    return (
        <View style={styles.container}>
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
        marginBottom: 20,
        marginTop: 30,
        color: 'blue',
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

export default ReligiousAndInspirationalCard;