import { StyleSheet } from 'react-native';
import './fonts.css';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffd8e6'
    },

    cardContainer: {
      margin: 10,
      padding: 20,
      backgroundColor: "#fff",
      width: '90%',
      alignSelf: 'center',
    },

    greenContainer: {
      flex: 1,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#b7b7a4',
    },
    
    authContainer: {
      width: '80%',
      maxWidth: 400,
      backgroundColor: '#cb997e',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },

    title: {
      fontSize: 30,
      marginBottom: 25,
      textAlign: 'center',
      color: "#ffe8d6",
      fontFamily: "Jost, serif"
    },
    input: {
      height: 40,
      backgroundColor: '#ddbea9',
      borderColor: "#ffe8d6",
      borderWidth: 1,
      padding: 8,
      borderRadius: 20,
    },

    buttonContainer: {
      margin: 16,
    },

    button: {
      backgroundColor: '#ffe8d6',
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
      paddingVertical: 10,

    },

    buttonText: {
      color: "#cb997e",
      fontSize: 20,
      fontFamily: "Jost, serif"
    },

    labelText: {
      color: "#ddbea9",
      textAlign: "left",
      marginBottom: 5,
      fontFamily: "Jost, serif"
    },

    toggleText: {
      color: '#ddbea9',
      textAlign: 'center',
    },
    bottomContainer: {
      marginBottom: 20,
    },
    emailText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  export default styles;