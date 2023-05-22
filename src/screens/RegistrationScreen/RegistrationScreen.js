import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import municipalityOptions from "../ProfileScreen/MunicipalityOptions";
import parishOptions from "../ProfileScreen/ParishOptions";

export default function RegistrationScreen({ navigation, setUser }) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleFocus = (inputName) => setFocusedInput(inputName);
  const handleBlur = () => setFocusedInput(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedParish, setSelectedParish] = useState(null);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      setLoading(false);
      return;
    }
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
          selectedMunicipality,
          selectedParish,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            console.log("Register successful");
            AsyncStorage.setItem("userData", JSON.stringify(data));
            console.log("User data stored in AsyncStorage:", data);
            setUser(data);
            navigation.navigate("Category", { user: data });
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
      source={require("../../../assets/background/priest.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.form}>
          <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            keyboardShouldPersistTaps="always"
          >
            {/* <Image
                    style={styles.logo}
                    source={require('../../../assets/OneUp_Logo.png')}
                /> */}
            <Text style={styles.text}> Create an Account </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === "fullName" ? "black" : "#aaaaaa",
                },
              ]}
              placeholder="Full Name"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onFocus={() => handleFocus("fullName")}
              onBlur={handleBlur}
            />
            <TextInput
              style={[
                styles.input,
                { borderColor: focusedInput === "age" ? "black" : "#aaaaaa" },
              ]}
              placeholder="Age"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setAge(text)}
              value={age}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="numeric"
              onFocus={() => handleFocus("age")}
              onBlur={handleBlur}
            />
            <>
              <Picker
                style={[
                  styles.input,
                  { borderWidth: 1, borderColor: "#aaaaaa" },
                ]}
                selectedValue={selectedMunicipality}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedMunicipality(itemValue);
                  setSelectedParish(null);
                }}
              >
                <Picker.Item label="Select a Municipality" value={null} />
                {municipalityOptions.map((option, index) => (
                  <Picker.Item
                    key={index}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
              {selectedMunicipality && (
                <Picker
                  style={[
                    styles.input,
                    { borderWidth: 1, borderColor: "#aaaaaa" },
                  ]}
                  selectedValue={selectedParish}
                  onValueChange={(itemValue) => setSelectedParish(itemValue)}
                >
                  <Picker.Item label="Select a parish" value={null} />
                  {parishOptions[selectedMunicipality].map((option, index) => (
                    <Picker.Item
                      key={index}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              )}
            </>
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
              autoCapitalize="none"
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
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
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
            />
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === "confirmPassword" ? "black" : "#aaaaaa",
                },
              ]}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={handleBlur}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => onRegisterPress()}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.buttonTitle}>Create Account</Text>
              )}
            </TouchableOpacity>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Log in here.
                </Text>
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}
