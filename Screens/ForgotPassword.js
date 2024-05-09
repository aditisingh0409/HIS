import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import backgroundImage from './Images/background.jpg'; 
import axios from "axios";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const ResetPassword = async (e) => {
    e.preventDefault();  
    
    if (validate()) {
      console.log("Entered email: "+email );
      setEmail('');
    }

    try{
      const response = await axios.get('https://present-neat-mako.ngrok-free.app/his/forgotPassword?email='+email, 
      {
        headers:{
          "ngrok-skip-browser-warning" : "true",
        }
    });
      console.log("API response: "+JSON.stringify(response.data));
      alert('Email Sent');
      navigation.navigate("Login");
    }
    catch(err){
      alert('Please Enter a Valid Email');
      console.error(`Error! ${JSON.stringify(err.response)}`);
    }
  };
  
  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      alert('Please Enter Email');
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      result = false;
      alert('Please Enter a Valid Email');
    }
    return result;
  };

  const onPressLogin = () => {
    console.log("Login");
    navigation.navigate("Login");
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Reset Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={ResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9C01',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#E8E8E8',
    width: '95%',
    height: 40,
    color: '#6D6D6D',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#C67C00',
    width: '45%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ForgotPassword;