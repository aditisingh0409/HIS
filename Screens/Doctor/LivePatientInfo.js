import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function LivePatientInfo() {
  const navigation = useNavigation();
  const [counter, setCounter] = useState(1);
  const [patient, setPatient] = useState([]);
  const [diagnoses, setDiagnosis] = useState([]);
  
  const route = useRoute();
  const { State } = route.params; 

  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);
  const { admitId, aadhaar } = State;
  
  useEffect(()=>{
      fetchLivePatient();
    },[]
  );

  const onPressAddDiagnosis = () => {
    console.log("AddDiagnosis");
    navigation.navigate("AddDiagnosis", {State:{admitId:patient.admitId,aadhaar:patient.aadhaar}});
  }

  const onPressBack = () => {
    console.log("DocDashboard");
    navigation.navigate("DocDashboard");
  }

  const onPressDiagnosisInfo = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setModalVisible(!modalVisible);
  };

  const fetchLivePatient = async() =>{
    try{
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');

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
      setDiagnosis(response.data.list);
      console.log("Patient: " + JSON.stringify(patient))
      console.log("api resp: " + JSON.stringify(response.data))
    }
    catch (error) {
      console.log("Error", error);
    } 
  };

  const onPressFile = async (diagnosisId, fileName) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');

      const headers = {
        'Authorization': token,
        'ngrok-skip-browser-warning': "true",
      }
      
      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/patient/getDiagnosisFile?userId=${userId}&role=${role}&diagnosisId=${diagnosisId}&fileName=${fileName}`,
        {
          headers: headers,
          // responseType: 'blob', // Set response type to blob for binary data
      });
  
      // Get the file name from the response headers
      // const fileName = response.headers['content-disposition']
      //   .split(';')[1]
      //   .split('filename=')[1]
      //   .trim();
  
      // Convert response data to Blob object
      const blob = new Blob([response.data.stringContent], { type: 'application/octet-stream' });
  
      // Create object URL from Blob
      const url = URL.createObjectURL(blob);
  
      // Automatically download the file using Linking
      Linking.openURL(url);
      
    } catch (error) {
      console.error('Error downloading file:', error);
      // Handle error
    }
  };  

  const onClose = () => {
    setModalVisible(false);
  };

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
                  <Text style={styles.label}>Patient Type:</Text>
                  <Text style={styles.label}>{patient.patientType}</Text>
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
                <TouchableOpacity style={styles.button} onPress={onPressAddDiagnosis}>
                  <Text style={styles.buttonText}>Add Diagnosis</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View> 
          <View style={styles.diagnosisContainer}>
            <Text style={styles.tableHeading}>List of Diagnoses</Text>
            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableHeader}>Serial No.</Text>
                <Text style={styles.tableHeader}>Date and Time</Text>
                <Text style={styles.tableHeader}>Remarks</Text>
                <Text style={styles.tableHeader}>File</Text>
              </View>
              {diagnoses.map((diagnosis, index) => (
                <TouchableOpacity key={diagnosis.diagnosisId} onPress={() => onPressDiagnosisInfo(diagnosis)}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableData}>{counter + index}</Text>
                    <Text style={styles.tableData}>{diagnosis.date}</Text>
                    <Text style={styles.tableData}>{diagnosis.remarks}</Text>
                    {/* <View style={styles.tableData}>
                      {diagnosis.file && ( 
                        <Icon name="file-o" size={20} color="black" />
                      )}
                    </View> */}
                    <TouchableOpacity style={styles.tableData} onPress={() => onPressFile(diagnosis.diagnosisId, diagnosis.file)}>
                      <Icon name="file-o" size={20} color="black" />
                    </TouchableOpacity>
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
        onRequestClose={onClose}
      >
        {selectedDiagnosis && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Diagnosis Details</Text>
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Remarks:</Text>
              <Text style={styles.modalSectionText}>{selectedDiagnosis.remarks}</Text>
            </View>
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Medicines:</Text>
              {selectedDiagnosis.medicine && (
                <FlatList
                  data={Object.entries(selectedDiagnosis.medicine)}
                  renderItem={({ item }) => (
                    <View style={styles.medicineRow}>
                      <Text style={styles.medicineText}>{item[0]}</Text>
                      <Text style={styles.medicineText}>Count: {item[1]}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
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
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSectionText: {
    fontSize: 14,
  },
  medicineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  medicineText: {
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});