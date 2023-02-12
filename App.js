import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { decode, encode } from 'base-64';

import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens';

if (!global.btoa) {
	global.btoa = encode;
}
if (!global.atob) {
	global.atob = decode;
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

const Stack = createStackNavigator();

export default function App() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((x) => {
				console.log(x);
			})
			.catch((x) => {
				console.error(x);
			});
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user ? (
					<Stack.Screen name='Home' options={{ headerShown: false }}>
						{(props) => <HomeScreen {...props} extraData={user} />}
					</Stack.Screen>
				) : (
					<>
						<Stack.Screen name='Login'>{(props) => <LoginScreen {...props} setUser={setUser} />}</Stack.Screen>
						<Stack.Screen name='Registration' component={RegistrationScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const registerForPushNotificationsAsync = async () => {
	let token;

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C'
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
	} else {
		alert('Must use physical device for Push Notifications');
	}

	return token;
};
