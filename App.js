import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { LoginPage } from "./login";
import { HabitTracker } from "./home";
import styles from "./styles";

const firebaseConfig = {
  apiKey: "AIzaSyCDDjycYGBMNsN9fKKCHrPwyDwwPJI37KE",
  authDomain: "cs-ia-2025.firebaseapp.com",
  projectId: "cs-ia-2025",
  storageBucket: "cs-ia-2025.firebasestorage.app",
  messagingSenderId: "826089848814",
  appId: "1:826089848814:web:d10b721c196f38c941d8ff",
  measurementId: "G-M7YXEDBEJ9"
};

const app = initializeApp(firebaseConfig);

export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // to keep track whether user is authenticated
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // if the user is already authenticated, log them out
        console.log('user logged out successfully!');
        await signOut(auth);
      } else {
        // log user in or sign them up
        if (isLogin) {
          // log in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('log in successful!');
        } else {
          // sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('account creation successful!');
        }
      }
    } catch (error) {
      console.error('auth error:', error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* {user ? (
        <ScrollView>
          // navigate to habit tracker if user successfully logs in
          <HabitTracker/>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
        // display log in or sign up page if user is not authenticated
        <LoginPage 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
        </ScrollView>
      )} */}
      <ScrollView contentContainerStyle={styles.greenContainer}>
          // navigate to habit tracker if user successfully logs in
        <HabitTracker/>
        </ScrollView>
    </View>
  );
}