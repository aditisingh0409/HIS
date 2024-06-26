import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backgroundImage from './Images/background.jpg'; 

const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const ProceedLogin = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const response = await axios.post('https://present-neat-mako.ngrok-free.app/his/authenticate', {
          username: username,
          password: password,
          role: role
        });

        console.log("API response: ", response);

        if (response.data.response === "SUCCESS") {
          try {
              AsyncStorage.setItem('userId',response.data.userId);
              AsyncStorage.setItem('role',response.data.role);
              AsyncStorage.setItem('token','Bearer ' + response.data.token);
              navigation.navigate("DocDashboard");
              console.log("DocDashboard");
            }
            catch(error) {
              console.error(error);
              alert('Incorrect username or password');
            };
        } 
        else {
          alert('Incorrect username or password');
        }
      } 
      catch (err) {
        console.error(`Error! ${err}`);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      alert('Please Enter Username');
    } 
    else if (password === '' || password === null) {
      result = false;
      alert('Please Enter Password');
    }
    return result;
  };

  const onPressForgotPassword = () => {
    console.log("ForgotPassword");
    navigation.navigate("ForgotPassword");
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Doctor Login</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={ProceedLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Pressable onPress={onPressForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    width: '60%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C67C00',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#E8E8E8',
    width: '90%',
    height: 40,
    color: '#6D6D6D',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#C67C00',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#FF3801',
    fontWeight: '500',
    fontSize: 17,
    marginVertical: 5,
  },
});

export default Login;