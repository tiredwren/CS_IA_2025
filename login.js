import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from "./styles";

export const LoginPage = ({email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) => {
  return (
    <View style={styles.authContainer} color="#cb997e">
      <Text style={styles.title}>L O G I N</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <View>
        <Text style={styles.labelText}>
          email
        </Text>
      </View>

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View>
        <Text style={styles.labelText}>
          password
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
            <Text style={styles.buttonText}>{isLogin ? "login" : "sign up" }</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'need an account? sign up' : 'already have an account? log in'}
        </Text>
      </View>
    </View>
  );
}