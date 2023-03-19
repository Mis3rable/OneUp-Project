import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Watch = () => {
    const navigation = useNavigation();

    const handleICMASCardPress = () => {
        navigation.navigate('ICMAS');
    }

    const handleSongCardPress = () => {
      navigation.navigate('SongReflection');
    }

    const handleWordsCardPress = () => {
      navigation.navigate('Words');
    }

    const handleOOTDCardPress = () => {
        navigation.navigate('OOTD');
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
            title: 'Prayer',
            image: require('../../../../assets/ICMAS.png'),
            onPress: handleICMASCardPress,
        },
        {
            title: 'Prayer',
            image: require('../../../../assets/SongReflection.png'),
            onPress: handleSongCardPress,
        },
        {
            title: 'ShareTheWords',
            image: require('../../../../assets/ShareTheWords.png'),
            onPress: handleWordsCardPress,
        },
        {
            title: 'OOTD',
            image: require('../../../../assets/OOTD.png'),
            onPress: handleOOTDCardPress,
        },  
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.myText}>Watch</Text>
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
      },
    myText: {
        fontSize: 24,
        color: "blue",
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 30,
        marginBottom: 20,
    },
});

export default Watch;