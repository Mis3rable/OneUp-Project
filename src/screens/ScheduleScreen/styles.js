import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    scheduleTitle: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 24, 
      fontWeight: 'bold', 
      fontStyle: 'italic',
      alignSelf: "center",
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 5,
    },
    addButton: {
      backgroundColor: 'blue',
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      padding: 10,
      alignSelf: 'flex-end',
      marginRight: 20,
    },
    addButtonText: {
      color: 'white',
      fontSize: 15,
      fontWeight: "bold",
    },
    reminderList: {
      marginTop: 5,
      marginBottom: 10,
      fontSize: 24, 
      fontWeight: 'bold', 
      fontStyle: 'italic',
      alignSelf: "center",
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 5,
    },
    scheduleTemplate: {
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20,
    },
    scheduleContainer: {
      backgroundColor: 'white',
      padding: 20,
      flexDirection: 'column', 
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      alignItems: 'flex-start',
    },
    scheduleCategory: {
      fontSize: 20,
      marginBottom: 5,
    },
    scheduleList: {
      fontSize: 17,
    },
// MODAL STYLING
    addModal: {
      alignSelf: 'center',
      width: '90%',
      marginVertical: '30%',
      borderRadius: 10,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 20,
      elevation: 5,
    },
    input: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginBottom: 10,
      fontSize: 16,
      padding: 10
    },
   buttonContainer: { 
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between',
   }
   
});