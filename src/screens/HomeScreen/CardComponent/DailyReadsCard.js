import * as React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

const DailyReadsCard = () => {
    const navigation = useNavigation();

    const handleScripturePress = () => {
        navigation.navigate('Scripture');
    }

    // const handleChefPress = () => {
    //   navigation.navigate('The Lord Is My Chef');
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
            title: 'Scripture',
            image: require('../../../../assets/Scripture.jpg'),
            onPress: handleScripturePress,
        },
        // {
        //     title: 'Prayer',
        //     image: require('../../../../assets/TheLordIsMyChef.jpg'),
        //     onPress: handleChefPress,
        // },
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
        marginBottom: 20,
        marginTop: 30,
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

export default DailyReadsCard;