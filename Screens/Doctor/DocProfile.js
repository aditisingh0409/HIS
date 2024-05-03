import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppNavigation from '../../AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import backgroundImage from './img1.jpg'; 

export default function DocProfile() {
  const [docInfo, setDocInfo] = useState([]); 
  const navigation = useNavigation();
  const fetchDoc = async () => {

    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    try {
      const headers = {
        Authorization: token,
        "ngrok-skip-browser-warning": "true",
      };
      console.log("User Id : ", userId);

      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/personalDetails?role=${role}&id=${userId}`,
        {
          headers: headers,
        }
      );

      // Check if response status is successful before setting state
      if (response.status === 200) {
        console.log("API response of user : "+JSON.stringify(response.data))
        setDocInfo(response.data.response);
      } 
      else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error here", error);
    }
  };

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

  useEffect(() => {
    fetchDoc();
  }, []);
  
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
          <View style={styles.row}>
            <Image source={require('./img.jpeg')} style={styles.profileImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.heading}>Doctor Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>First Name:</Text>
                <Text style={styles.label}>{docInfo.firstName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Last Name:</Text>
                <Text style={styles.label}>{docInfo.lastName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.label}>{docInfo.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.label}>{docInfo.gender}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.tableData}>{docInfo.birthDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Blood group:</Text>
                <Text style={styles.label}>{docInfo.blood}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.label}>{docInfo.address}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Experience:</Text>
                <Text style={styles.label}>{docInfo.experience} Years</Text>
              </View>
            </View>
          </View>
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
}

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
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  sidebarContainer: {
    backgroundColor: '#FFFFFF',
  },
  profileContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    width: '100%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginHorizontal: 50,
    marginVertical: 50,
  },
  infoContainer: {
    marginLeft: 50,
    width: '50%',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    minWidth: 100,
    marginRight: 50,
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