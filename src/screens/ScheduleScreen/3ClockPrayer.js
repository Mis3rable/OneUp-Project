import { useState, useEffect, useRef } from 'react';
import { Text, View, Switch, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ThreeClockPrayer() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [isEnabled, setIsEnabled] = useState(false);
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      AsyncStorage.getItem('notificationEnabled').then((value) => {
        setIsEnabled(value === 'true');
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    const toggleSwitch = async () => {
      setIsEnabled(previousState => !previousState);
      await AsyncStorage.setItem('notificationEnabled', (!isEnabled).toString());
      if (!isEnabled) {
        await schedulePushNotification();
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    };
  
    return (
      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>3 O'Clock Prayer</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  }
  
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "3 O'Clock Prayer",
      },
      trigger: {
          hour: 15,
          minute: 0,
          repeats: true
      }
    });
  }

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }

  return token;
}
