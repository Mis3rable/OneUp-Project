import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
import Category from './src/screens/CategoryScreen/Category';
import MyTabs from './src/screens/HomeScreen/HomeScreen';
import Schedule from './src/screens/ScheduleScreen/Schedule';
import OOTD from './src/screens/HomeScreen/VideoComponent/OOTD';
import Prayer from './src/screens/HomeScreen/VideoComponent/Prayer';
import Word from './src/screens/HomeScreen/VideoComponent/Word';
import Rosary from './src/screens/HomeScreen/VideoComponent/Rosary';
import Journey from './src/screens/JourneyScreen/Journey';
import Scriptures from './src/screens/ScriptireScreen/Scripture';
import ICMAS from './src/screens/HomeScreen/VideoComponent/ICMAS';
import LordChef from './src/screens/HomeScreen/VideoComponent/LordChef';
import HimnoBulakenyo from './src/screens/HomeScreen/VideoComponent/Himno';
import Icons from './src/screens/HomeScreen/VideoComponent/Icons';
import CrossWord from './src/screens/HomeScreen/VideoComponent/CrossWord';
import SaMadalingSabi from './src/screens/HomeScreen/VideoComponent/SaMadalingSabi';
import JoelCruz from './src/screens/HomeScreen/VideoComponent/JoelCruz';
import ItanongMoKungBakit from './src/screens/HomeScreen/VideoComponent/ItanongMoKungBakit';
import HimnoBulakenyoAudio from './src/screens/HomeScreen/VideoComponent/HimnoAudio';
import Lithurgical from './src/screens/HomeScreen/VideoComponent/Liturgical';
import Tinig from './src/screens/HomeScreen/VideoComponent/TinigNgPastol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          setUser(JSON.parse(userData));
        } 
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    checkAsyncStorage();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (user === null) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Registration" options={{ headerStyle: { backgroundColor: '#f3fffc' } }}>
          {props => <RegistrationScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => <MyTabs {...props} user={user} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="Category" component={Category}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: false }}/>
        <Stack.Screen name="OOTD" component={OOTD} />
        {/* <Stack.Screen name="Prayer" component={Prayer} /> */}
        <Stack.Screen name="Words" component={Word} />
        <Stack.Screen name="Prayers" component={Rosary} />
        <Stack.Screen name="Liturgical Songs" component={Lithurgical} />
        <Stack.Screen name="Journey" component={Journey} />
        <Stack.Screen name="Scripture" component={Scriptures} />
        <Stack.Screen name="The Lord Is My Chef" component={LordChef} />
        <Stack.Screen name="Sa 'Yong Tahanan" component={ICMAS} />
        <Stack.Screen name="Icons" component={Icons} />
        <Stack.Screen name="Himno Bulakenyo" component={HimnoBulakenyo} />
        <Stack.Screen name="Himno Bulakenyo(Audio)" component={HimnoBulakenyoAudio} />
        <Stack.Screen name="Cross Word" component={CrossWord} />
        <Stack.Screen name="Sa Madaling Sabi" component={SaMadalingSabi} />
        <Stack.Screen name="Joel Cruz" component={JoelCruz} />
        <Stack.Screen name="Itanong Mo Kung Bakit" component={ItanongMoKungBakit} />
        <Stack.Screen name="Tinig Ng Pastol" component={Tinig} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
