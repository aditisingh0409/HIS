import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppNavigation from '../../AppNavigation';
import backgroundImage from './img1.jpg'; 

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  const onPressViewProfile = () => {
    console.log("DocProfile");
    navigation.navigate("DocProfile");
  }
  
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
    navigation.replace("Login");
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        <TouchableOpacity style={styles.button} onPress={onPressViewProfile}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
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
      <View style={styles.navigation}>
        <AppNavigation />
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
    flexDirection: 'column',
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
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0, 
    flexDirection: 'column',
    width: '100%',
  },
});

export default SettingsScreen;