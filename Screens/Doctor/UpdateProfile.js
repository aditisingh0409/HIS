import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UpdateProfileScreen = (props) => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const updateProfile = async () => {
    if (validate()) {
      try {
        // Call the API to update the profile
        console.log('API call to update profile');
      } catch (error) {
        console.error(`Error! ${error}`);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (name === '' || name === null) {
      result = false;
      alert('Please Enter Name');
    } else if (email === '' || email === null) {
      result = false;
      alert('Please Enter Email');
    } else if (phoneNumber === '' || phoneNumber === null) {
      result = false;
      alert('Please Enter Phone Number');
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4F2197',
    width: '90%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdateProfileScreen;