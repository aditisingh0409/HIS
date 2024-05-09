import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import backgroundImage from '../Images/background.jpg';

const ChangePassword = () => {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const changePassword = async (e) => {
    e.preventDefault();

    const userId = await AsyncStorage.getItem("userId");
    const role = await AsyncStorage.getItem("role");
    const token = await AsyncStorage.getItem("token");

    if (validate()) {
      try {
        const response = await axios.post('https://present-neat-mako.ngrok-free.app/his/changePassword', {
          userId: userId,
          oldPassword: currentPassword,
          newPassword: newPassword,
          role: role
        }, {
          headers : {
            'ngrok-skip-browser-warning': 'true',
            "Authorization":token
          }
          
        });
        console.log("API response: " + JSON.stringify(response.data));
        alert('Password Updated');
        navigation.replace("Login");
      } 
      catch (err) {
        console.error(`Error! ${JSON.stringify(err.response)}`);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (currentPassword === '' || currentPassword === null) {
      result = false;
      alert('Please Enter Current Password');
    } else if (newPassword === '' || newPassword === null) {
      result = false;
      alert('Please Enter New Password');
    } else if (confirmNewPassword === '' || confirmNewPassword === null) {
      result = false;
      alert('Please Confirm New Password');
    } else if (newPassword!== confirmNewPassword) {
      result = false;
      alert('New Password and Confirm New Password do not match');
    }
    return result;
  };

  const onPressCancel = () => {
    console.log("DocProfile");
    navigation.navigate("DocProfile");
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
        <TextInput
            placeholder="Current Password"
            style={styles.input}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
        />
        <TextInput
            placeholder="New Password"
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
        />
        <TextInput
            placeholder="Confirm New Password"
            style={styles.input}
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={changePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 27,
    color: '#C67C00',
    fontWeight: 'bold',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#C67C00',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    width: '65%',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ChangePassword;