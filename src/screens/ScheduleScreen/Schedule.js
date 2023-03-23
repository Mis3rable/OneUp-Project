import { useState, useEffect, useRef } from 'react';
import { Button, Platform, StyleSheet, TextInput, SafeAreaView, ScrollView, Alert, TouchableOpacity, View, Modal, Text, FlatList } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [schedules, setSchedules] = useState([]);
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

  const schedulePushNotification = async (item) => {  
    if (title === '') {
      Alert.alert('One Up', 'Category cannot be empty');
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
  
    // list the schedules
    const newSchedule = {
      title,
      message,
      date,
      time,
      id: Math.random().toString(36).substr(2, 9),
    };
  
    setSchedules([...schedules, newSchedule]);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={schedules}
        style={styles.flatList}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>
              {item.date.toLocaleDateString()} at{' '}
              {(() => {
                const date = new Date(item.time);
                let hour = date.getHours();
                const minute = date.getMinutes();
                const ampm = hour >= 12 ? 'PM' : 'AM';
                hour = hour % 12;
                hour = hour ? hour : 12;
                return `${hour}:${minute < 10 ? '0' + minute : minute} ${ampm}`;
              })()}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Schedule</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <Card style={{ paddingTop: 10, paddingLeft: 10 }}>
          <Card.Title title="One Up" subtitle="Set A Schedule" left={LeftContent} />
          <Card.Content>
              <Picker
                selectedValue={title}
                onValueChange={(itemValue) => setTitle(itemValue)}
              >
                <Picker.Item label="Select A Category" value="" />
                <Picker.Item label="Sa 'Yong Tahanan" value="Sa 'Yong Tahanan" />
                <Picker.Item label="Song Reflections" value="Song Reflections" />
                <Picker.Item label="Share the Word" value="Share the Word" />
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
          <Button title="Schedule" onPress={async () => { await schedulePushNotification(); }} style={styles.schedule}/>
          <View style={{ marginVertical: 30 }} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
          </Card.Actions>
        </Card>
      </Modal>
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
  flatList: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  schedule: {
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#00a6ff', 
    padding: 2, 
    width: 100,
    height: 25,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center'
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
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
