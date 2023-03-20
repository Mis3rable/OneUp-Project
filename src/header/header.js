import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 130,
    justifyContent: 'center',
    backgroundColor: 'rgba(248, 237, 237, 0.68)',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 5,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  logo: {
    resizeMode: 'contain',
    width: 130,
    height: 130,
    marginTop: 30,
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
