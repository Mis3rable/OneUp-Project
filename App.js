import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
import DeepeningScreen from './src/screens/CategoryScreen/Deepening';
import PrayerScreen from './src/screens/CategoryScreen/Prayer';
import RosaryScreen from './src/screens/CategoryScreen/Rosary';
import Category from './src/screens/CategoryScreen/Category';
import MyTabs from './src/screens/HomeScreen/HomeScreen';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>    
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {props => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{  headerStyle: { backgroundColor: '#f3fffc' }  }} />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {props => <MyTabs {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Deepening" component={DeepeningScreen} />
        <Stack.Screen name="Prayer" component={PrayerScreen} />
        <Stack.Screen name="Rosary" component={RosaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}