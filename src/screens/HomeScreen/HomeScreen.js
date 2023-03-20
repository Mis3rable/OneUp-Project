import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import YoutubeCard from './CardVideo';
import ProfileScreen from '../ProfileScreen/ProfileScree';
import Schedule from '../ScheduleScreen/Schedule';
import Journey from '../JourneyScreen/Journey';

const Tab = createBottomTabNavigator();

export default function MyTabs({ navigation, route }) {
  const { user, initialRouteName } = route.params;
  return (
    <Tab.Navigator 
    initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: "flex",
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
            }}
          />
        </View>
        ),  
        headerShown: false,
      }} initialParams={{ user: user }}/>

      <Tab.Screen name="Library" component={Schedule} options={{
        tabBarIcon: ({focused, color}) => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image 
              source={require('../../../assets/search.png')}
              resizeMode='contain'
              style={{
              width: 30,
              height: 30,
              tintColor: focused ? 'blue' : color,
              }}
              />
          </View>
        ),
        headerShown: false,
      }} initialParams={{ user: user }}/>
      
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
            }}
          />
          </View>
        ),
        headerShown: false,
      }} initialParams={{ user: user }}/>

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
            }}
          />
          </View>
        ),
        headerShown: false,
      }} initialParams={{ user: user }}/>
      
    </Tab.Navigator>
  );
}