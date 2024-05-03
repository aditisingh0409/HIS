import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppNavigation from '../../AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

export default function PastPatientList() {
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([]); // State variable to hold patients data
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

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
        'https://present-neat-mako.ngrok-free.app/his/patient/pastHistory?role=DOCTOR&userId='
      + userId,
      {
        headers: headers,  
      }
    );
    console.log("API response of patient list : "+JSON.stringify(response.data))
    
    setPatients(response.data.response);
    setFilteredPatients(response.data.response); // Set the filtered patients with the initial data
    } 
    catch (error) {
      console.log('Error fetching patients:', error);
    }
  }; 
  
  useEffect(() => {
    fetchPatients(); 
  }, []);

  const onPressPatientInfo = (patient) => {
    console.log("PastPatientInfo", patient);
    navigation.navigate("PastPatientInfo", {State:{patientId:patient.aadhaar}});     
  }

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const performSearch = async () => {
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
        `https://present-neat-mako.ngrok-free.app/his/patient/pastHistory?role=DOCTOR&userId=${userId}&patientId=${searchText}`,
      {
        headers: headers,  
      }
    );
    console.log("API response of patient list : "+JSON.stringify(response.data))
    
    setPatients(response.data.response);
    setFilteredPatients(response.data.response); // Set the filtered patients with the initial data
    } 
    catch (error) {
      console.log('Error fetching patients:', error);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Patient ID"
              value={searchText}
              onChangeText={handleSearch}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={performSearch}>
              <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
            </TouchableOpacity>
        </View>
        <View style={styles.patientsContainer}>
            <Text style={styles.heading}>List of Previous Patients</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableHeader}>Patient ID</Text>
                <Text style={styles.tableHeader}>First Name</Text>
                <Text style={styles.tableHeader}>Last Name</Text>
                <Text style={styles.tableHeader}>Remarks</Text>
              </View>
              {patients.map(patient => (
                <TouchableOpacity key={patient.aadhaar} onPress={() => onPressPatientInfo(patient)}>
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '30%',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginVertical: 6,
    marginHorizontal: 6,
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