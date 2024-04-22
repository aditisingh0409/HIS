import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from './img1.jpg'; 

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  const onPressUpdateProfile = () => {
    console.log("UpdateProfile");
    navigation.navigate("UpdateProfile");
  }
  
  const onPressChangePassword = () => {
    console.log("ChangePassword");
    navigation.navigate("ChangePassword");
  }
  
  const onPressLogout = () => {
    console.log("Login");
    navigation.navigate("Login");
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
          <TouchableOpacity style={styles.button} onPress={onPressUpdateProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default SettingsScreen;