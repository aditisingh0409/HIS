import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import backgroundImage from './img1.jpg';

const ChangePasswordScreen = (props) => {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const changePassword = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post('https://present-neat-mako.ngrok-free.app/his/changePassword', {
          userId: "saloni-admin",
          oldPassword: currentPassword,
          "newPassword": newPassword,
          role: role
        }, {
          headers: {
            "userId": "saloni-admin",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWxvbmkiLCJyb2xlIjpbImFkbWluIl0sImlhdCI6MTcxMjg0MDUwNywiZXhwIjoxNzEyOTI2OTA3fQ.LmX-nrj1Udzhh-fx62mXZoiY-qRvfMc8oufzlHokiCM"
          }
        });
        console.log("API response: " + JSON.stringify(response.data));
      } catch (err) {
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
    console.log("DocDashboard");
    navigation.navigate("DocDashboard");
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
    height: '30%',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4F2197',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    width: '65%',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
