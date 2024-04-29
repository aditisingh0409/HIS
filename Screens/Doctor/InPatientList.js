import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Profile from './DocProfile';
// import Patients from './Patients';
import { useNavigation } from '@react-navigation/native';
import AppNavigation from '../../AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function InPatientList() {
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([]); 
  const navigation = useNavigation();

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

  const onPressLivePatientInfo = (patient) => {
    console.log("LivePatientInfo", patient);
    navigation.navigate("LivePatientInfo", {State:{admitId:patient.admitId,aadhaar:patient.aadhaar}});     
  }

  return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* <View style={styles.dropdownMenu}>
            {isOpen && (
              <View style={styles.dropdownContent}>
                <Profile Toggle={toggleProfile} />
              </View>
            )}
          </View> */}
          <View style={styles.patientsContainer}>
            {/* <Patients patients={patients} /> */}
            <Text style={styles.heading}>List of In Patients</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableHeader}>Aadhaar ID</Text>
                <Text style={styles.tableHeader}>First Name</Text>
                <Text style={styles.tableHeader}>Last Name</Text>
                <Text style={styles.tableHeader}>Ward No.</Text>
                <Text style={styles.tableHeader}>Remarks</Text>
              </View>
              {patients.map(patient => (
                <TouchableOpacity key={patient.aadhaar} onPress={() => onPressLivePatientInfo(patient)}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableData}>{patient.aadhaar}</Text>
                    <Text style={styles.tableData}>{patient.firstName}</Text>
                    <Text style={styles.tableData}>{patient.lastName}</Text>
                    <Text style={styles.tableData}>{patient.wardNo}</Text>
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