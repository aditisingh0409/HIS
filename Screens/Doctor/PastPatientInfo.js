import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function PastPatientInfo() {
  const navigation = useNavigation();
  const route = useRoute();

  const [counter, setCounter] = useState(1);
  
  const [patient, setPatient] = useState([]);
  const [diagnoses, setDiagnosis] = useState([]);
  const { State } = route.params; // Destructure State from route.params

  // Now you can access admitId and aadhaar from State object
  const { patientId } = State;

  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(()=>{
      fetchPastPatient();
    },[]
  );

  const onPressDiagnosisInfo = (diagnosis) => {
    console.log("DiagnosisInfo", diagnosis);
    navigation.navigate("DiagnosisInfo", {State:{admitId:diagnosis.admitId}});     
  }

  const fetchPastPatient = async() =>{
    try{
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');

      const headers = {
        'Authorization': token,
        'ngrok-skip-browser-warning': "true",
      }
      
      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/patient/pastHistoryOnePatient?role=${role}&userId=${userId}&patientId=${patientId}`,
        {
          headers: headers
        }
      );
      
      setPatient(response.data.detail); 
      setDiagnosis(response.data.list);
      console.log("Patient: " + JSON.stringify(patient))
      console.log("api resp: " + JSON.stringify(response.data))
    }
    catch (error) {
      console.log("Error", error);
    } 
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const renderDiagnosisItem = ({ item }) => (
    <View style={styles.diagnosisItem}>
      <Text style={styles.diagnosisText}>{item.date}: {item.remarks}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
            <View style={styles.profileContainer}>
              <Image source={require('./img1.jpg')} style={styles.profileImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.heading}>Patient Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Aadhaar No:</Text>
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
                  <Text style={styles.label}>Date of Birth:</Text>
                  <Text style={styles.label}>{patient.birthDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Blood group:</Text>
                  <Text style={styles.label}>{patient.blood}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Address:</Text>
                  <Text style={styles.label}>{patient.address}</Text>
                </View>
              </View>
            </View>
          </View> 
          <View style={styles.diagnosisContainer}>
            <Text style={styles.tableHeading}>List of Previous Visits</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableHeader}>Serial No.</Text>
                <Text style={styles.tableHeader}>Patient ID</Text>
                <Text style={styles.tableHeader}>Date and Time</Text>
                <Text style={styles.tableHeader}>Remarks</Text>
              </View>
              {diagnoses.map((diagnosis, index) => (
                <TouchableOpacity key={diagnosis.admitId} onPress={() => toggleModal(diagnosis)}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableData}>{counter + index}</Text>
                    <Text style={styles.tableData}>{diagnosis.patientId}</Text>
                    <Text style={styles.tableData}>{diagnosis.date}</Text>
                    <Text style={styles.tableData}>{diagnosis.remarks}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>     
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Diagnoses</Text>
              <FlatList
                data={diagnoses}
                renderItem={renderDiagnosisItem}
                keyExtractor={(item) => item.diagnosisId}
              />
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    margin: 10,
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
  diagnosisContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  tableHeading: {
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
  viewDiagnosisButton: {
    backgroundColor: '#4F2197',
    padding: 10,
    borderRadius: 5,
  },
  viewDiagnosisText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diagnosisItem: {
    marginBottom: 10,
  },
  diagnosisText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#4F2197',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});