import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    zIndex: 999,
    // backgroundColor: 'black'
    backgroundColor: 'white'
  },
  logo: {
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 1,
    marginBottom: 10,
    // color: 'white'
    color: 'black'
  },
});

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={require('./transparent-logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>
      Onwards to New Evangelization
      </Text>
    </View>
  );
};

export default Header;
