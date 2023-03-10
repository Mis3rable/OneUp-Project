import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import YoutubeCard from './CardVideo';
import ProfileScreen from '../ProfileScreen/ProfileScree';
import Schedule from '../ScheduleScreen/Schedule';
import Scriptures from '../ScriptireScreen/Scripture';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <YoutubeCard/>
    </View>
  );
}

function Library() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Schedule />
    </View>
  );
}

function JourneyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Scriptures />
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
        tabBarHideOnKeyboard: true,
        tabBarStyle: "flex"
      })}
      
    >

      <Tab.Screen name="HomeTab" component={HomeScreen} options={{
        tabBarIcon: ({focused}) => (
          <View style={{top: 3}}>
            <Image 
              source={require('../../../assets/cottage.png')}
              resizeMode='contain'
              style={{
              width: 30,
              height: 30,}}
              />
          </View>
        ),
      }}/>

      <Tab.Screen name="Library" component={Library} options={{
        tabBarIcon: ({focused}) => (
          <View style={{top: 3}}>
            <Image 
              source={require('../../../assets/search.png')}
              resizeMode='contain'
              style={{
              width: 30,
              height: 30,}}
              />
          </View>
        ),
      }}/>
      
      <Tab.Screen name="Journey" component={JourneyScreen} options={{
        tabBarIcon: ({focused}) => (
          <View style={{top: 3}}>
            <Image 
              source={require('../../../assets/import_contacts.png')}
              resizeMode='contain'
              style={{
              width: 30,
              height: 30,}}
              />
          </View>
        ),
      }}/>

      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({focused}) => (
          <View style={{top: 3}}>
            <Image 
              source={require('../../../assets/account_circle.png')}
              resizeMode='contain'
              style={{
              width: 30,
              height: 30,}}
              />
          </View>
        ),
      }}/>
    </Tab.Navigator>
  );
}

export default function NavBottom() {
  return (
      <MyTabs/>
  );
}