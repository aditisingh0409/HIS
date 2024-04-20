import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from 'react-native-picker';
import axios from 'axios';
import backgroundImage from './img1.jpg'; 

const LoginScreen = (props) => {
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

        console.log("API response: ", response.data);

        if (response.data.response === "SUCCESS") {
          try {
              alert('Login Successful');
              console.log("DocDashboard");
              props.navigation.navigate("DocDashboard");
              sessionStorage.setItem('username', username);
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
    console.log("Forgot Password");
    props.navigation.navigate("Forgot Password");
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>User Login</Text>
        {/* <Picker
            selectedValue={role}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Nurse" value="nurse" />
            <Picker.Item label="Doctor" value="doctor" />
            <Picker.Item label="Pharmacist" value="pharmacist" />
            <Picker.Item label="Receptionist" value="receptionist" />
        </Picker> */}
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
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 20,
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontSize: 30,
    color: '#1B1B1B',
    fontWeight: '500',
    marginBottom: 20,
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
    backgroundColor: '#4F2197',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#2974D3',
    fontWeight: '500',
    marginVertical: 5,
  },
  registerLink: {
    fontSize: 15,
    color: 'black',
    marginVertical: 5,
  },
});

export default LoginScreen;