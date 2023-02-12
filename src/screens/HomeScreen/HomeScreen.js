import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import YoutubeCard from './CardVideo';
import ProfileScreen from '../ProfileScreen/ProfileScree';

// imports for Schedule Screen
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { AsyncStorage } from 'react-native';


function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<YoutubeCard />
		</View>
	);
}

function ScheduleScreen() {
	const [schedules, setSchedules] = useState([]);
	const [notificationData, setNotificationData] = useState({
		content: {
			title: 'Robert the gayman',
			body: `Here is the notification body.`,
			data: { data: 'goes here' }
		},
		trigger: {
			weekday: 1, // 0 - 6
			hour: 12, // military time
			minute: 30, // 0-60
			repeats: true
		}
	});

	useEffect(() => {
		getNotificationsFromLocalStorage();
	}, [])

	const getNotificationsFromLocalStorage = async () => {
		const _schedules = await AsyncStorage.getItem('schedules');
		setSchedules(_schedules ? JSON.parse(_schedules) : []);
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			{schedules.length != 0 && schedules.map((x, y) => {
				return <View key={`schedule-${y}`}>
					<Text>{x.day} @ {x.hour}:{x.minute}</Text>
				</View>
			})}
			<Button
				title='Press to schedule a notification'
				onPress={async () => {
					await createLocalPushNotification(notificationData, setSchedules);
				}}
			/>
			<Button
				title='Remove all scheduled notifications.'
				onPress={async () => {
					console.log('Removed All Scheduled Notifications.');
					await Notifications.cancelAllScheduledNotificationsAsync();
					await AsyncStorage.removeItem('schedules');
					setSchedules([]);
				}}
			/>
			<Button
				title='Get all scheduled notifications.'
				onPress={async () => {
					const scheduledNotifs = await Notifications.getAllScheduledNotificationsAsync();
					console.log(`schedules, from plugin: ${scheduledNotifs.length}`);
					scheduledNotifs.forEach((x) => {
						console.log(x);
					});
					const _schedules = await AsyncStorage.getItem('schedules');
					console.log(`schedules, from state:`, schedules);
					console.log(`schedules, from local storage:`, _schedules);
				}}
			/>
		</View>
	);
}

const createLocalPushNotification = async (schedule, setSchedules) => {
	let _schedules = await AsyncStorage.getItem('schedules');

	let scheduleParsed = {};

	if (schedule.trigger.weekday === 1) {
		scheduleParsed = { ...scheduleParsed, day: 'Monday' };
	}

	if (schedule.trigger.hour > 12) {
		scheduleParsed = { ...scheduleParsed, hour: schedule.trigger.hour - 12 };
	} else {
		scheduleParsed = { ...scheduleParsed, hour: schedule.trigger.hour };
	}

	scheduleParsed = { ...scheduleParsed, minute: schedule.trigger.minute, repeat: schedule.trigger.repeat };

	if (_schedules) {
		_schedules = JSON.parse(_schedules);
		setSchedules([..._schedules, scheduleParsed]);
		await AsyncStorage.setItem('schedules', JSON.stringify([..._schedules, scheduleParsed]));
	} else {
		setSchedules([scheduleParsed]);
		await AsyncStorage.setItem('schedules', JSON.stringify([scheduleParsed]));
	}

	await Notifications.scheduleNotificationAsync(schedule);
};

function Search() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Search!</Text>
		</View>
	);
}

const Profile = () => {
	return <ProfileScreen />;
};

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name='HomeTab'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../../../assets/cottage.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25
								}}
							/>
						</View>
					)
				}}
			/>

			<Tab.Screen
				name='Schedule'
				component={ScheduleScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../../../assets/import_contacts.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25
								}}
							/>
						</View>
					)
				}}
			/>

			<Tab.Screen
				name='Search'
				component={Search}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../../../assets/search.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25
								}}
							/>
						</View>
					)
				}}
			/>

			<Tab.Screen
				name='Profile'
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
							<Image
								source={require('../../../assets/account_circle.png')}
								resizeMode='contain'
								style={{
									width: 25,
									height: 25
								}}
							/>
						</View>
					)
				}}
			/>
		</Tab.Navigator>
	);
}

export default function NavBottom() {
	return <MyTabs />;
}
