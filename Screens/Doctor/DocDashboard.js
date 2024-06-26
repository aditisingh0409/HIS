import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Emergencies from './Emergencies';
import { useNavigation } from '@react-navigation/native';
import AppNavigation from '../../AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function DocDashboard() {
  const [patients, setPatients] = useState([]);
  const [emerg,setEmerg] = useState([]);
  const navigation = useNavigation();

  const [IpCount, setIpCount] = useState(0);
  const [OpCount, setOpCount] = useState(0);

  const fetchDoc = async () => {

    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");

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
        console.log("API response of user : "+JSON.stringify(response.data))
        setOpCount(response.data.opPatient);
        setIpCount(response.data.ipPatient);
        setEmerg(response.data.emergencies);
        fetchPatients(); // Fetch patients data when the component mounts
      } 
      else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error here", error);
    }
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

  const onPressLivePatientInfo = (patient) => {
    console.log("LivePatientInfo", patient);
    navigation.navigate("LivePatientInfo", {State:{admitId:patient.admitId,aadhaar:patient.aadhaar}});     
  }

  return (
      <View style={styles.container}>
        <View style={styles.content}>
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

          <Emergencies emer={emerg} />
          
          {/* Patients Table */}
          <View style={styles.patientsContainer}>
            <Text style={styles.heading}>List of Out Patients</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableHeader}>Aadhaar ID</Text>
                <Text style={styles.tableHeader}>First Name</Text>
                <Text style={styles.tableHeader}>Last Name</Text>
                <Text style={styles.tableHeader}>Remarks</Text>
              </View>
              {patients.map(patient => (
                <TouchableOpacity key={patient.aadhaar} onPress={() => onPressLivePatientInfo(patient)}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableData}>{patient.aadhaar}</Text>
                    <Text style={styles.tableData}>{patient.firstName}</Text>
                    <Text style={styles.tableData}>{patient.lastName}</Text>
                    <Text style={styles.tableData}>{patient.remark}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
          <AppNavigation />
        
      </View>
  
  );
};

const styles = StyleSheet.create({
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  tableData: {
    flex: 1,
    textAlign: 'center',
  },
});