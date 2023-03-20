import { useState, useEffect, useRef } from 'react';
import { Button, Platform, StyleSheet, TextInput, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Avatar, Card } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import Header from '../../../src/header/header';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
}); 

export default function Schedule() {
  const route = useRoute();
  const { category } = route.params || { category: 'default' };
  let coverImageSource;
  if (category === 'OOTD') {
    coverImageSource = require('../../../assets/OOTD.png');
  } else if (category === 'Prayer') {
    coverImageSource = require('../../../assets/Prayer.png');
  } else if (category === 'ShareTheWords') {
    coverImageSource = require('../../../assets/ShareTheWords.png');
  } else {
    coverImageSource = require('../../../assets/Prayer.png');
  }

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const notificationListener = useRef();
  const responseListener = useRef();
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showTimepicker, setShowTimepicker] = useState(false);
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
    if (title === '') {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }

    if (message === '') {
      Alert.alert('Error', 'Message cannot be empty');
      return;
    }

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
    setTitle('');
    setMessage('');
    setTime(new Date());
  };
  
  return (
    <SafeAreaView style={styles.container}>
    <Header/>
      <ScrollView style={styles.scrollView}>
        <Card style={{ paddingTop: 10, paddingLeft: 10 }}>
          <Card.Title title="One Up" subtitle="Set A Schedule" left={LeftContent} />
          <Card.Cover source={coverImageSource}/>
          <Card.Content>
          <Picker
            selectedValue={title}
            onValueChange={(itemValue) => setTitle(itemValue)}
          >
            <Picker.Item label="Choose a Category" value="" enabled={false} />
            <Picker.Item label="ICMAS" value="ICMAS" />
            <Picker.Item label="Song Reflections" value="Song Reflections" />
            <Picker.Item label="Share the Words" value="Share the Words" />
            <Picker.Item label="OOTD" value="OOTD" />
            <Picker.Item label="Eucharistic Celebration Hymns" value="Eucharistic Celebration Hymns" />
            <Picker.Item label="Rosary" value="Rosary" />
          </Picker>
            <TextInput placeholder="Message" value={message} onChangeText={setMessage} style={styles.input} />
            <TouchableOpacity onPress={() => setShowTimepicker(true)}>
              <TextInput
                placeholder="Time"
                editable={false}
                value={time.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit', hour12: true})}
                style={styles.input}
              />
            </TouchableOpacity>
            {showTimepicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  const currentTime = selectedTime || time;
                  setShowTimepicker(false);
                  setTime(currentTime);
                }}
              />
            )}
            <TouchableOpacity onPress={() => setShowDatepicker(true)}>
              <TextInput
                placeholder="Date"
                editable={false}
                value={date.toLocaleDateString()}
                style={styles.input}
              />
            </TouchableOpacity>
            {showDatepicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setShowDatepicker(false);
                  setDate(currentDate);
                }}
              />
            )}
          </Card.Content>
          <Card.Actions>
          <Button 
            title="Schedule" onPress={async () => { await schedulePushNotification(); }}
          />
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    width: 400,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  scrollView: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
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
