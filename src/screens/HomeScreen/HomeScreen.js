import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import YoutubeCard from './CardVideo';
import ProfileScreen from '../ProfileScreen/ProfileScree';
import Schedule from '../ScheduleScreen/Schedule';
import Category from '../CategoryScreen/Category';


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
      <Schedule />
    </View>
  );
}

function Library() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Text>Library</Text>
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarShowLabel: false
      })}
    >

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

      <Tab.Screen name="Search" component={Library} options={{
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