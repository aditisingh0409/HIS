import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PastDiagnosis = ({ diagnoses }) => {
  const navigation = useNavigation();

  const onPressDiagnosisInfo = (diagnosis) => {
    console.log("DiagnosisInfo", diagnosis);
    navigation.navigate("PatientInfo", {admitId:patient.admitId,aadhaar:patient.aadhaar});     
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Diagnoses</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeader}>Aadhaar ID</Text>
          <Text style={styles.tableHeader}>First Name</Text>
          <Text style={styles.tableHeader}>Last Name</Text>
          <Text style={styles.tableHeader}>Remarks</Text>
        </View>
        {diagnoses.map(diagnosis => (
          <TouchableOpacity key={patient.aadhaar} onPress={() => onPressDiagnosisInfo(diagnosis)}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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

export default PastDiagnosis;
