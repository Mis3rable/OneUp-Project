import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const Watch = () => {
    const navigation = useNavigation();

    const handleICMASCardPress = () => {
        navigation.navigate("Sa 'Yong Tahanan");
    }

    const handleSongCardPress = () => {
      navigation.navigate('Icons');
    }

    const handleLithurgicalCardPress = () => {
        navigation.navigate('Liturgical Songs');
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
            image: require('../../../../assets/Liturgical.jpg'),
            onPress: handleLithurgicalCardPress,
        },
        {
            title: 'Icon',
            image: require('../../../../assets/icons.png'),
            onPress: handleSongCardPress,
        },
        {
            title: "ISa 'Yong Tahanan",
            image: require('../../../../assets/SaYongTahanan.png'),
            onPress: handleICMASCardPress,
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
            <Text style={styles.title2}>Religous and Inspirational Music</Text>
            <Text style={styles.title}>Music Videos</Text>
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
    title2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
});

export default Watch;