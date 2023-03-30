import { View, Image, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../ProfileScreen/ProfileScree';
import Schedule from '../ScheduleScreen/Schedule';
import Journey from '../JourneyScreen/Journey';
import React, {useEffect} from 'react'
import YoutubeCard from './Home';
const Tab = createBottomTabNavigator();

export default function MyTabs({ navigation, user, setUser }) {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      }
    );
  
    return () => backHandler.remove();
  }, []);
  
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            paddingTop: 40, // Add padding to the top
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Discover" component={YoutubeCard} options={{
        tabBarIcon: ({focused, color}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              source={require('../../../assets/cottage.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'blue' : color,
                marginBottom: 30,
              }}
            />
          </View>
        ),  
        headerShown: false,
      }} initialParams={{ user: user}}/>

      <Tab.Screen name="Schedule" component={Schedule} options={{
        tabBarIcon: ({focused, color}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              source={require('../../../assets/schedule.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'blue' : color,
                marginBottom: 30,
              }}
            />
          </View>
        ),
        headerShown: false,
      }} initialParams={{ user: user }} />
      
      <Tab.Screen name="Journey" component={Journey} options={{
        tabBarIcon: ({focused, color}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              source={require('../../../assets/import_contacts.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'blue' : color,
                marginBottom: 30,
              }}
            />
          </View>
        ),
        headerShown: false,
      }} initialParams={{ user: user }} />

      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({focused, color}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              source={require('../../../assets/account_circle.png')}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? 'blue' : color,
                marginBottom: 30,
              }}
            />
          </View>
        ),
        headerShown: false,
      }} initialParams={{ user: user, setUser: setUser }}/>
    </Tab.Navigator>
  );
}