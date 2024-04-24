import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Profile from './ProfilePhoto';
import Patients from './Patients';
import AppNavigation from '../../AppNavigation';
import axios from 'axios'; // Import axios for making API calls

export default function Doctor() {
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([]); // State variable to hold patients data
  
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const [IpCount, setIpCount] = useState(0);
  const [OpCount, setOpCount] = useState(0);

  const fetchDoc = async () => {
    try {
      const headers = {
        Authorization: token,
        "ngrok-skip-browser-warning": "true",
      };
      console.log("User Id : ", userId);

      const response = await axios.get(
        'https://present-neat-mako.ngrok-free.app/his/doc/home?userId=' 
        + userId,
        {
          headers: headers,
        }
      );

      // Check if response status is successful before setting state
      if (response.status === 200) {
        console.log("managed somehow");
        console.log("API response of user : "+JSON.stringify(response.data))
        setOpCount(response.data.opPatient);
        setIpCount(response.data.ipPatient);
        fetchPatients(); // Fetch patients data when the component mounts
      } 
      else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Hello123")
      console.log("Error here", error);
      // toast.error("Error from Doctor. Please try again.");
    }
  };

  const fetchPatients = async () => {
    try {
      const headers = {
        Authorization: token,
        "ngrok-skip-browser-warning": "true",
      };
      console.log("User Id : ", userId);

      // Make the API call to fetch patients data
      const response = await axios.get(
        'https://present-neat-mako.ngrok-free.app/his/patient/viewLivePatients?role=DOCTOR&isOP=1&userId='
      + userId,
      {
        headers: headers,  
      }
    );
      
      console.log("API response of patient list : "+JSON.stringify(response.data))
      
      // Update the state variable with the fetched patients data
      setPatients(response.data.response);
    } catch (error) {
      console.log('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchDoc();
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Profile Dropdown */}
          <View style={styles.dropdownMenu}>
            {isOpen && (
              <View style={styles.dropdownContent}>
                <Profile Toggle={toggleProfile} />
              </View>
            )}
          </View>
          {/* Number of Inpatients and Outpatients */}
          <View style={styles.pieChartsContainer}>
            <View style={styles.circle}>
              <View style={styles.innerCircle}>
                <Text style={styles.number}>{IpCount}</Text>
              </View>
              <Text style={styles.label}>Inpatients</Text>
            </View>
            <View style={styles.circle}>
              <View style={styles.innerCircle}>
                <Text style={styles.number}>{OpCount}</Text>
              </View>
              <Text style={styles.label}>Outpatients</Text>
            </View>
          </View>
          {/* Patients Table */}
          <View style={styles.patientsContainer}>
            <Patients patients={patients} />
          </View>
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
  pieChartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  circle: {
    alignItems: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  patientsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
});
