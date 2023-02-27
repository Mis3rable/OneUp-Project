import { useState, useEffect, useRef } from 'react';
import { Button, Platform, StyleSheet, TextInput, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
}); 

export default function Schedule() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const notificationListener = useRef();
  const responseListener = useRef();
  const LeftContent = props => <Avatar.Icon {...props} icon="alarm" />

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {setNotification(notification);});
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {console.log(response);});
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const schedulePushNotification = async () => {
    const trigger = new Date(date);
    trigger.setHours(time.getHours());
    trigger.setMinutes(time.getMinutes());
    trigger.setSeconds(0);
    trigger.setMilliseconds(0);
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        data: { data: 'goes here' },
      },
      trigger,
    });
    Alert.alert('Notification set', `Your notification has been scheduled for ${trigger.toLocaleString()}.`);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title title="One Up" subtitle="Deepening Schedule" left={LeftContent} />
          <Card.Cover source={require('../../img/Card1.png')} />
          <Card.Content>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Message" value={message} onChangeText={setMessage} style={styles.input} />
            <TextInput placeholder="Date (YYYY-MM-DD)" value={date.toISOString().split('T')[0]} onChangeText={text => setDate(new Date(text))} style={styles.input}/>
            <TextInput
              placeholder="Time (HH:MM)"
              value={`${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`}
              onChangeText={text => {
                const [hours, minutes] = text.split(':');
                setTime(new Date(new Date().setHours(Number(hours), Number(minutes))));
              }}
              style={styles.input}
            />
          </Card.Content>
          <Card.Actions>
            <Button title="Schedule" onPress={async () => { await schedulePushNotification(); }}/>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    width: 300,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      allowImages: true,
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
