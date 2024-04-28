import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Profile from './DocProfile';
import Patients from './Patients';
import AppNavigation from '../../AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function InPatientList() {
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([]); 

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const fetchPatients = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
  
      const headers = {
        Authorization: token,
        "ngrok-skip-browser-warning": "true",
      };
      console.log("User Id : ", userId);

      // Make the API call to fetch patients data
      const response = await axios.get(
        'https://present-neat-mako.ngrok-free.app/his/patient/viewLivePatients?role=DOCTOR&isOP=0&userId='
      + userId,
      {
        headers: headers,  
      }
    );
    console.log("API response of patient list : "+JSON.stringify(response.data))
    
    setPatients(response.data.response);
    } catch (error) {
      console.log('Error fetching patients:', error);
    }
  };     

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.dropdownMenu}>
            {isOpen && (
              <View style={styles.dropdownContent}>
                <Profile Toggle={toggleProfile} />
              </View>
            )}
          </View>
          <View style={styles.patientsContainer}>
            <Patients patients={patients} />
          </View>
        </View>
        
        <AppNavigation />
      </View>
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
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderLeftColor: '#CCCCCC',
    overflow: 'hidden',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContent: {
    width: '100%',
  },
  patientsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
});