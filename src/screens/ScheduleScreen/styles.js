import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    flatList: {
      marginTop: 20,
    },
    schedule: {
      marginRight: 10,
    },
    addButton: {
      backgroundColor: 'skyblue',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: "bold",
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      },
    notif: {
      fontSize: 24, 
      fontWeight: 'bold', 
      fontStyle: 'italic',
      marginTop: 30,
      alignSelf: "center",
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 5,
    }
  });