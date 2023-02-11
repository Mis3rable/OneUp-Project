import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import YoutubeCard from './CardVideo';
import ProfileScreen from '../ProfileScreen/ProfileScree';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <YoutubeCard/>
    </View>
  );
}

function ScheduleScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Schedule!</Text>
 </View>
  );
}

function Search() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Text>Search!</Text>
    </View>
  );
}

const Profile = () => {
  return (
    <ProfileScreen/>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen name="HomeTab" component={HomeScreen} options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image 
              source={require('../../../assets/cottage.png')}
              resizeMode='contain'
              style={{
              width: 25,
              height: 25,}}
              />
          </View>
        ),
      }}/>

      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image 
              source={require('../../../assets/import_contacts.png')}
              resizeMode='contain'
              style={{
              width: 25,
              height: 25,}}
              />
          </View>
        ),
      }}/>

      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image 
              source={require('../../../assets/search.png')}
              resizeMode='contain'
              style={{
              width: 25,
              height: 25,}}
              />
          </View>
        ),
      }}/>

      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
            <Image 
              source={require('../../../assets/account_circle.png')}
              resizeMode='contain'
              style={{
              width: 25,
              height: 25,}}
              />
          </View>
        ),
      }}/>
    </Tab.Navigator>
  );
}

export default function NavBottom() {
  return (
      <MyTabs />
  );
}