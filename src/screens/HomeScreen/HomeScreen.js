import { View, Image, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../ProfileScreen/ProfileScree';
import Schedule from '../ScheduleScreen/Schedule';
import Journey from '../JourneyScreen/Journey';
import React, {useEffect} from 'react'
import YoutubeCard from './Home';
const Tab = createBottomTabNavigator();

export default function MyTabs({ navigation, user, setUser }) {
  
  const CustomHeader = ({ navigation, route }) => {
    return (
      <View 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 10,
        }}>
        <Image source={require('../../../assets/transparent-logo.png')} style={{ width: 150, height: 50 }} />
      </View>
    );
  };

  
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
        header: (props) => <CustomHeader {...props} />,
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
        header: (props) => <CustomHeader {...props} />,
      }} 
      initialParams={{ user: user }} />

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
        header: (props) => <CustomHeader {...props} />,
      }} initialParams={{ user: user, setUser: setUser }}/>
    </Tab.Navigator>
  );
}