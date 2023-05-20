import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/transparent-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 80,
    paddingBottom: 40,
  },
});

export default Header;
