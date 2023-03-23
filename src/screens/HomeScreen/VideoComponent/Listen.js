import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Listen = () => {
    const navigation = useNavigation();

    // const handleEucharisticCardPress = () => {
    //   navigation.navigate('Eucharistic');
    // }

    const handleChefPress = () => {
        navigation.navigate('The Lord Is My Chef');
    }
    const handleTinigNgPastolPress = () => {
        navigation.navigate('Tinig Ng Pastol');
    }
    const handleCrossWordPress = () => {
        navigation.navigate('Cross Word');
    }
    const handleOOTDCardPress = () => {
        navigation.navigate('OOTD');
    }
    const handleSaMadalingSabiPress = () => {
        navigation.navigate('Sa Madaling Sabi');
    }
    const handleItanongMoKungBakitPress = () => {
        navigation.navigate('Itanong Mo Kung Bakit');
    }
    // const handleHimnoAudioPress = () => {
    //     navigation.navigate('Himno Bulakenyo(Audio)');
    // }
    

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
        // {
        //     title: 'Eucharistic',
        //     image: require('../../../../assets/cards-ECH.png'),
        //     onPress: handleEucharisticCardPress,
        // },
        
        {
            title: 'Prayer',
            image: require('../../../../assets/TheLordIsMyChef.jpg'),
            onPress: handleChefPress,
        },
        {
            title: 'TinigNgPastol',
            image: require('../../../../assets/Tinig.jpg'),
            onPress: handleTinigNgPastolPress,
        },
        {
            title: 'CrossWord',
            image: require('../../../../assets/CrossWord.png'),
            onPress: handleCrossWordPress,
        },  
        {
            title: 'OOTD',
            image: require('../../../../assets/OOTD.png'),
            onPress: handleOOTDCardPress,
        },  
        {
            title: 'SaMadalingSabi',
            image: require('../../../../assets/SaMadalingSabi.png'),
            onPress: handleSaMadalingSabiPress,
        },  
        {
            title: 'ItanongMoKungBakit',
            image: require('../../../../assets/ItanongMoKungBakit.png'),
            onPress: handleItanongMoKungBakitPress,
        },
        // {
        //     title: 'Himno',
        //     image: require('../../../../assets/cards-HimnoBulakenyoVid.png'),
        //     onPress: handleHimnoAudioPress,
        // },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reflections and Homilies</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
});

export default Listen;