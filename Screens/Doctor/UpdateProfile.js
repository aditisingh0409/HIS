import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import backgroundImage from '../Images/background.jpg';

const UpdateProfile = () => {
  const navigation = useNavigation();

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  
  const updateProfile = async (e) => {
    e.preventDefault();

    const userId = await AsyncStorage.getItem("userId");
    const role = await AsyncStorage.getItem("role");
    const token = await AsyncStorage.getItem("token");

    if (validate()) {
      try {
        const response = await axios.post('https://present-neat-mako.ngrok-free.app/his/updateProfile', {
          userId: userId,
          role: role,
          firstName: firstname,
          lastName: lastname,
          phone: phoneNumber,
          address: address
        }, {
          headers : {
            'ngrok-skip-browser-warning': 'true',
            "Authorization":token
          }
          
        });
        console.log("API response: " + JSON.stringify(response.data));
        alert('Profile Updated');
        navigation.replace("DocProfile");
      } 
      catch (err) {
        console.error(`Error! ${JSON.stringify(err.response)}`);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (firstname === '' || firstname === null) {
      result = false;
      alert('Please Enter First Name');
    } 
    else if (lastname === '' || lastname === null) {
      result = false;
      alert('Please Enter Last Name');
    } 
    else if (phoneNumber === '' || phoneNumber === null) {
      result = false;
      alert('Please Enter Phone Number');
    }
    else if (address === '' || address === null) {
      result = false;
      alert('Please Enter Address');
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
        <Text style={styles.title}>Update Profile</Text>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={firstname}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastname}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
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
    width: '70%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#C67C00',
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
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#C67C00',
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

export default UpdateProfile;