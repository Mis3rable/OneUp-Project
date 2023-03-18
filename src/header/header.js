import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingTop: 10,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
});

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require('./transparent-logo.png')} style={styles.logo} />
    </View>
  );
};

export default Header;
