import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import YoutubeCard from './CardVideo';
import ProfileScreen from '../ProfileScreen/ProfileScree';

// imports for Schedule Screen
import { useState } from 'react';
import * as Notifications from 'expo-notifications';

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<YoutubeCard />
		</View>
	);
}

function ScheduleScreen() {
	const [notificationData, setNotificationData] = useState({
		content: {
			title: 'Robert the gayman',
			body: `Here is the notification body.`,
			data: { data: 'goes here' }
		},
		trigger: {
			// weekday: 0,
			// hour: 0,
			// minute: 0,
			seconds: 10,
			repeats: true
		}
	});

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Button
				title='Press to schedule a notification'
				onPress={async () => {
					await createLocalPushNotification(notificationData);
				}}
			/>
			<Button
				title='Remove all scheduled notifications.'
				onPress={async () => {
					console.log('Removed All Scheduled Notifications.');
					await Notifications.cancelAllScheduledNotificationsAsync();
				}}
			/>
			<Button
				title='Get all scheduled notifications.'
				onPress={async () => {
					const scheduledNotifs = await Notifications.getAllScheduledNotificationsAsync();
					console.log(`Scheduled Notifs Length: ${scheduledNotifs.length}`);
					scheduledNotifs.forEach((x) => {
						console.log(x);
					});
				}}
			/>
		</View>
	);
}

const createLocalPushNotification = async (schedule) => {
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
