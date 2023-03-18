import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
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
import Eucharistic from './src/screens/HomeScreen/VideoComponent/Eucharistic';
import Journey from './src/screens/JourneyScreen/Journey';
import Scriptures from './src/screens/ScriptireScreen/Scripture';
import ICMAS from './src/screens/HomeScreen/VideoComponent/ICMAS';
import SongReflection from './src/screens/HomeScreen/VideoComponent/SongReflection';
import * as Font from 'expo-font';
import { useEffect } from 'react';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const fontMap = {
  'DMSerifDisplay-Regular': require('./assets/fonts/DMSerifDisplay-Regular.ttf'),
  'DMSerifDisplay-Italic': require('./assets/fonts/DMSerifDisplay-Italic.ttf'),
};

const Stack = createStackNavigator();

export default function App() {
  const loadFonts = async () => {
    await Font.loadAsync(fontMap);
  }
  
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>    
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{  headerStyle: { backgroundColor: '#f3fffc' }  }} />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => <MyTabs {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Library" component={Schedule} options={{ headerShown: false }}/>
        <Stack.Screen name="OOTD" component={OOTD} />
        <Stack.Screen name="Prayer" component={Prayer} />
        <Stack.Screen name="Words" component={Word} />
        <Stack.Screen name="Rosary" component={Rosary} />
        <Stack.Screen name="Eucharistic" component={Eucharistic} />
        <Stack.Screen name="Journey" component={Journey} />
        <Stack.Screen name="Scripture" component={Scriptures} />
        <Stack.Screen name="ICMAS" component={ICMAS} />
        <Stack.Screen name="SongReflection" component={SongReflection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}