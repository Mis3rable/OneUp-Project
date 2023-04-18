import { useState, useEffect, useRef } from 'react';
import { Button, Platform, TextInput, SafeAreaView, Alert, ScrollView, TouchableOpacity, View, Modal, Text, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Avatar, Card } from 'react-native-paper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import Angelus from './Angelus';
import ThreeClockPrayer from './3ClockPrayer';
import AngelusSix from './Angelus6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
}); 

export default function Schedule() {
  const route = useRoute();
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
  const navigation = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {setNotification(notification);});
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      
      const notificationTitle = response.notification.request.content.title;

      // Navigate to the appropriate screen based on the title of the notification
      if (notificationTitle === 'Daily Scriptural Readings') {
        navigation.navigate('Scripture'); 
      } else if (notificationTitle === 'Liturgical Songs') {
        navigation.navigate('Liturgical Songs'); 
      } else if (notificationTitle === 'Icons') {
        navigation.navigate('Icons'); 
      } else if (notificationTitle === 'Sa Iyong Tahanan') {
        navigation.navigate('Sa Iyong Tahanan'); 
      } else if (notificationTitle === 'Religous And Inspirational Videos') {
        navigation.navigate('Religous And Inspirational Videos'); 
      } else if (notificationTitle === 'The Lord Is My Chef') {
        navigation.navigate('The Lord Is My Chef'); 
      } else if (notificationTitle === 'Tinig ng Pastol') {
        navigation.navigate('Tinig ng Pastol'); 
      } else if (notificationTitle === 'Cross Word') {
        navigation.navigate('Cross Word'); 
      } else if (notificationTitle === 'OOTD') {
        navigation.navigate('OOTD'); 
      } else if (notificationTitle === 'Sa Madaling Sabi') {
        navigation.navigate('Sa Madaling Sabi'); 
      } else if (notificationTitle === 'Itanong Mo Kung Bakit') {
        navigation.navigate('Itanong Mo Kung Bakit'); 
      }
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Retrieve schedules from AsyncStorage on app start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const existingSchedules = await AsyncStorage.getItem('schedules');
        if (existingSchedules) {
          setSchedules(JSON.parse(existingSchedules));
        }
      } catch (error) {
        console.error('Error fetching schedules from AsyncStorage:', error);
      }
    };
    fetchData();
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
    
    try {
      const existingSchedules = await AsyncStorage.getItem('schedules');
      let updatedSchedules = existingSchedules ? JSON.parse(existingSchedules) : [];
      updatedSchedules.push(newSchedule);
      await AsyncStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      console.log('Schedule saved to AsyncStorage:', newSchedule);
    } catch (error) {
      console.error('Error saving schedule to AsyncStorage:', error);
    }
    setSchedules([...schedules, newSchedule]);
  };
  
  const deleteSchedule = async (itemId) => {
    try {
      const existingSchedules = await AsyncStorage.getItem('schedules');
      let updatedSchedules = existingSchedules ? JSON.parse(existingSchedules) : [];
      updatedSchedules = updatedSchedules.filter(item => item.id !== itemId);
      await AsyncStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      console.log('Schedule deleted from AsyncStorage:', itemId);
      setSchedules(updatedSchedules);
    } catch (error) {
      console.error('Error deleting schedule from AsyncStorage:', error);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/background/people.png')} style={styles.background}>
    <ScrollView style={{ height: '20%'}}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.scheduleTitle}>Scheduled Notifications</Text>
    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
      <Text style={styles.addButtonText}> + Set A Reminder</Text>
    </TouchableOpacity>
      <Angelus />
      <ThreeClockPrayer />
      <AngelusSix />
    <Text style={styles.reminderList}> Reminders List</Text>
    <View>
      <View style={styles.scheduleTemplate}>
      {schedules.map((item) => (
            <View key={item.id} style={styles.scheduleContainer}>
              <Text style={styles.scheduleCategory}>{item.title}</Text>
              <Text style={styles.scheduleList}>
                {item.date && item.date.toLocaleDateString ? item.date.toLocaleDateString() : ''} at{' '}{'\n'}
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
              <TouchableOpacity onPress={() => deleteSchedule(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      {/* MODAL */}

      <Modal visible={modalVisible} animationType="slide">
        <Card style={styles.addModal}>
          <Card.Title title="One Up" subtitle="Set A Schedule" left={LeftContent} />
          <Card.Content>
              <Picker
                selectedValue={title}
                onValueChange={(itemValue) => setTitle(itemValue)}
                >
                <Picker.Item label="Select a Category" value="" />
                <Picker.Item label="Daily Scriptural Readings" value="Daily Scriptural Readings" />
                <Picker.Item label="Liturgical Songs" value="Liturgical Songs" />
                <Picker.Item label="Icons" value="Icons" />
                <Picker.Item label="Sa Iyong Tahanan" value="Sa Iyong Tahanan" />
                <Picker.Item label="Religious And Inspirational Videos" value="Religious And Inspirational Videos" />
                <Picker.Item label="The Lord Is My Chef" value="The Lord Is My Chef" />
                <Picker.Item label="Tinig ng Pastol" value="Tinig ng Pastol" />
                <Picker.Item label="Cross Word" value="Cross Word" />
                <Picker.Item label="OOTD" value="OOTD" />
                <Picker.Item label="Sa Madaling Sabi" value="Sa Madaling Sabi" />
                <Picker.Item label="Itanong Mo Kung Bakit" value="Itanong Mo Kung Bakit" />
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
    </View>
    </SafeAreaView>
    </ScrollView>
    </ImageBackground>
  );
}

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
