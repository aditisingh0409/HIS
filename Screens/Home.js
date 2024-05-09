import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import backgroundImage from './Images/background.jpg'; 
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.introText}>
            Welcome, Doctor!
          </Text>
          <Text style={styles.subText}>
            Explore the Hospital Information System
          </Text>
          <Image source={require('./Images/heartbeat.png')} style={styles.heartIcon} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
            <Text style={styles.buttonText}>Go to Login</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    width: '60%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  introText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C67C00',
    marginBottom: 30,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#006400',
    marginBottom: 30,
    textAlign: 'center',
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
  heartIcon: {
    width: 250,
    height: 50,
    margin: 10,
    opacity: 0.6,
  },
});

export default LoginScreen;