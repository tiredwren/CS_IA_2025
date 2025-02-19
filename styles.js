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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
      padding: 20,
      backgroundColor: "#fff",
      width: '90%',
      alignSelf: 'center',
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    cardContainerImage: {
      width: 50,
      height: 50,
      borderRadius: 10,
      marginRight: 10,
    },

    textContainer: {
      flex: 1,
    },

    cardContainerText: {
      fontSize: 18,
      color: "#000",
      fontFamily: "Jost, serif",
    },

    arrowButton: {
      padding: 10,
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

    title2: {
      fontSize: 25,
      marginBottom: 20,
      textAlign: 'center',
      color: "#000",
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
      alignItems: 'center',
    },

    buttonContainerInline: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },

    button: {
      backgroundColor: '#ffe8d6',
      borderRadius: 5,
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },

    saveButton: {
      backgroundColor: '#6a994e',
      borderRadius: 5,
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },

    cancelButton: {
      backgroundColor: '#bc4749',
      borderRadius: 5,
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
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

    addHabitContainer: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    dialogBox: {
      position: "absolute",
      top: "0%",
      height: "120%",
      width: "100%",
      backgroundColor: "#b7b7a4",
      padding: 20,
    },
});

export default styles;
