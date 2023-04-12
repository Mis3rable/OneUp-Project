import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const MusicVideos = () => {
    const navigation = useNavigation();

    const handleICMASCardPress = () => {
        navigation.navigate("Sa Iyong Tahanan");
    }

    const handleSongCardPress = () => {
      navigation.navigate('Icons');
    }

    const handleLithurgicalCardPress = () => {
        navigation.navigate('Liturgical Songs');
    }

    const handleReligiousAndInspirationalPress = () => {
        navigation.navigate('Religious And Inspirational Videos');
    }
    // const handleWordsCardPress = () => {
    //   navigation.navigate('Words');
    // }

    // const handleOOTDCardPress = () => {
    //     navigation.navigate('OOTD');
    // }

    // const handleHimnoPress = () => {
    //     navigation.navigate('Himno Bulakenyo');
    // }

    // const handleCrossWordPress = () => {
    //     navigation.navigate('Cross Word');
    // }
    // const handleSaMadalingSabiPress = () => {
    //     navigation.navigate('Sa Madaling Sabi');
    // }
    // const handleJoelCruzPress = () => {
    //     navigation.navigate('Joel Cruz');
    // }
    // const handleItanongMoKungBakitPress = () => {
    //     navigation.navigate('Itanong Mo Kung Bakit');
    // }
    // const handleTinigNgPastolPress = () => {
    //     navigation.navigate('Tinig Ng Pastol');
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
        {
            title: 'Lithurgical',
            image: require('../../../../../assets/Liturgical.jpg'),
            onPress: handleLithurgicalCardPress,
        },
        {
            title: 'Icon',
            image: require('../../../../../assets/Icons.jpg'),
            onPress: handleSongCardPress,
        },
        {
            title: "ISa Iyong Tahanan",
            image: require('../../../../../assets/SaIyongTahanan.jpg'),
            onPress: handleICMASCardPress,
        },
        {
            title: "Religious And Inspirational Videos",
            image: require('../../../../../assets/ReligiousAndInspirational.jpg'),
            onPress: handleReligiousAndInspirationalPress,
        },
        // {
        //     title: 'ShareTheWords',
        //     image: require('../../../../assets/ShareTheWord.jpg'),
        //     onPress: handleWordsCardPress,
        // },
        // {
        //     title: 'OOTD',
        //     image: require('../../../../assets/OOTD.png'),
        //     onPress: handleOOTDCardPress,
        // },  
        // {
        //     title: 'Himno',
        //     image: require('../../../../assets/cards-HimnoBulakenyoVid.png'),
        //     onPress: handleHimnoPress,
        // },  
        // {
        //     title: 'CrossWord',
        //     image: require('../../../../assets/CrossWord.png'),
        //     onPress: handleCrossWordPress,
        // },  
        // {
        //     title: 'SaMadalingSabi',
        //     image: require('../../../../assets/SaMadalingSabi.png'),
        //     onPress: handleSaMadalingSabiPress,
        // },  
        // {
        //     title: 'JoelCruz',
        //     image: require('../../../../assets/JoelCruz.png'),
        //     onPress: handleJoelCruzPress,
        // },
        // {
        //     title: 'ItanongMoKungBakit',
        //     image: require('../../../../assets/ItanongMoKungBakit.png'),
        //     onPress: handleItanongMoKungBakitPress,
        // },
        // {
        //     title: 'TinigNgPastol',
        //     image: require('../../../../assets/Tinig.jpg'),
        //     onPress: handleTinigNgPastolPress,
        // },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Religious and Inspirational Music</Text>
            <Text style={styles.title2}>Music Videos</Text>
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
        fontSize: 23,
        fontWeight: '800',
        alignSelf: 'center',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        textTransform: 'uppercase',
        textAlign: 'center', 
        textAlignVertical: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30
      },
    title2: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 10,
        marginLeft: 30,
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

export default MusicVideos;