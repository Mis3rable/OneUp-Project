import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { firebase } from "../../firebase/config";
import { Picker } from "@react-native-picker/picker";
import parishOptions from "./ParishOptions";
import municipalityOptions from "./MunicipalityOptions";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function UpdateProfile({ route }) {
  const { user } = route.params;
  const navigation = useNavigation();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    user.selectedMunicipality
  );
  const [selectedParish, setSelectedParish] = useState(user.selectedParish);
  const [photoURL, setPhotoURL] = useState(user.photoURL);

  const handleUpdateProfile = async () => {
    try {
      const userRef = firebase.firestore().collection("users").doc(user.id);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        await userRef.update({
          fullName,
          email,
          selectedParish,
          selectedMunicipality,
          photoURL,
        });
        console.log("User profile updated!");
      }
      await AsyncStorage.removeItem("userData");
      await firebase.auth().signOut(); // sign out the user
      route.params.setUser(null);
      Alert.alert("Update Successfully", "Please login again to continue.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const response = await fetch(selectedAsset.uri);
      const blob = await response.blob();
      const filename = "profile_image_" + user.id;
      const storageRef = firebase
        .storage()
        .ref()
        .child("profile_images/" + filename);
      await storageRef.put(blob);
      const downloadURL = await storageRef.getDownloadURL();
      setPhotoURL(downloadURL);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/background/outside.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity onPress={handleSelectPhoto}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={styles.profileImage}>
                {photoURL ? (
                  <Image
                    source={{ uri: photoURL }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    source={require("../../../assets//placeholder.png")}
                    style={styles.profileImage}
                  />
                )}
              </View>
              <Text style={styles.label}>Change Profile Picture</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>Full Name:</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <>
            <Text style={styles.label}>Municipality:</Text>
            <Picker
              style={[styles.input, { borderWidth: 1, borderColor: "#aaaaaa" }]}
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
                style={[styles.input, { borderWidth: 1, borderColor: "black" }]}
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
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonTitle}>Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    color: "saddlebrown",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "saddlebrown",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: 'orange',
    // borderWidth: 1,
  },
  buttonTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
