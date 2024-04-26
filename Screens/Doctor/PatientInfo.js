import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function PInfo() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [patient, setPatient] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  
  useEffect(()=>
    {
      fetchUsers();
    },[]
  );

  const { admitId, aadhaar } = route.params;

  const onPressAddDiagnosis = () => {
    console.log("AddDiagnosis");
    navigation.navigate("AddDiagnosis");
  }

  const onPressBack = () => {
    console.log("DocDashboard");
    navigation.navigate("DocDashboard");
  }

  const fetchUsers = async() =>{
    try{
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      
      const headers = {
        'Authorization': token,
        'ngrok-skip-browser-warning': "true",
      }
      
      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/patient/viewOneLivePatient?admitId=${admitId}&userId=${userId}&role=${role}`,
        {
          headers: headers
        }
      );
      
      setPatient(response.data.detail); 
      fetchDiagnosis();
      console.log("Patient: " + JSON.stringify(patient))
      console.log("api resp: " + JSON.stringify(response.data))
    }
    catch (error) {
      console.log("Error", error);
    } 
  };

  const fetchDiagnosis = async() =>{
    try{
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      
      const headers = {
        'Authorization': token,
        'ngrok-skip-browser-warning': "true",
      }
      
      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/patient/viewOneLivePatient?admitId=${admitId}&userId=${userId}&role=${role}`,
        {
          headers: headers
        }
      );
      
      setDiagnosis(response.data.list); 
      console.log("Patient: " + JSON.stringify(diagnosis))
      console.log("api resp: " + JSON.stringify(response.data))
    }
    catch (error) {
      console.log("Error", error);
    } 
  };


  return (
    <View style={styles.container}>
        <View style={styles.row}>
        <View style={styles.content}>
            <View style={styles.profileContainer}>
              <Image source={require('./img1.jpg')} style={styles.profileImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.heading}>Patient Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Aadhaar Number:</Text>
                  <Text style={styles.label}>{patient.aadhaar}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>First Name:</Text>
                  <Text style={styles.label}>{patient.firstName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Last Name:</Text>
                  <Text style={styles.label}>{patient.lastName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.label}>{patient.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text style={styles.label}>{patient.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Gender:</Text>
                  <Text style={styles.label}>{patient.gender}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Patient Type:</Text>
                  <Text style={styles.tableData}>{patient.patientType}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Date of Birth:</Text>
                  <Text style={styles.tableData}>{patient.birthDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Blood group:</Text>
                  <Text style={styles.label}>{patient.blood}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Address:</Text>
                  <Text style={styles.label}>{patient.address}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPressAddDiagnosis}>
                  <Text style={styles.buttonText}>Add Diagnosis</Text>
                </TouchableOpacity>
                <View style={styles.container}>
                  <Text style={styles.heading}>List of Past Diagnosis</Text>
                  <View style={styles.table}>
                    <View style={styles.tableHeaderRow}>
                      <Text style={styles.tableHeader}>Aadhaar ID</Text>
                      <Text style={styles.tableHeader}>First Name</Text>
                      <Text style={styles.tableHeader}>Last Name</Text>
                      <Text style={styles.tableHeader}>Remarks</Text>
                    </View>
                    {diagnosis.map(diagnosis => (
                      <TouchableOpacity key={diagnosis.aadhaar} onPress={() => onPressDiagnosisInfo(diagnosis)}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableData}>{diagnosis.aadhaar}</Text>
                          <Text style={styles.tableData}>{diagnosis.firstName}</Text>
                          <Text style={styles.tableData}>{diagnosis.lastName}</Text>
                          <Text style={styles.tableData}>{diagnosis.remark}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPressBack}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <></>
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
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  sidebarContainer: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: '100%',
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
    marginRight: 50,
  },
  infoContainer: {
    marginLeft: 50,
    width: '50%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    width: '50%',
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  tableData: {
    flex: 1,
    textAlign: 'center',
  },
});