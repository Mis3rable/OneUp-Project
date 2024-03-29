import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation, setUser }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (inputName) => setFocusedInput(inputName);
  const handleBlur = () => setFocusedInput(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setEmail("");
      setPassword("");
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              setLoading(false);
              return;
            }
            const user = firestoreDocument.data();
            console.log("Login successful");
            AsyncStorage.setItem("userData", JSON.stringify(user));
            console.log("User data stored in AsyncStorage:", user);
            setUser(user);
            navigation.navigate("Home", { user: user });
          })
          .catch((error) => {
            alert(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  return (
    <ImageBackground
      source={require("../../../assets/background/church.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.containerlogo}>
            <Image
              style={styles.logo}
              source={require("../../../assets/transparent-logo.png")}
            />
          </View>
          <View style={styles.containerinput}>
            <TextInput
              style={[
                styles.input,
                { borderColor: focusedInput === "email" ? "black" : "#aaaaaa" },
              ]}
              placeholder="E-mail"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              autoCapitalize="none"
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === "password" ? "black" : "#aaaaaa",
                },
              ]}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => onLoginPress()}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.buttonTitle}>Sign In</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up here.
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
