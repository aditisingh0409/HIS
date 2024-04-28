import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PastDiagnosis = ({ diagnoses }) => {
  const navigation = useNavigation();

  const [counter, setCounter] = useState(1); // Initialize counter state

  const onPressDiagnosisInfo = (diagnosis) => {
    console.log("DiagnosisInfo", diagnosis);
    navigation.navigate("DiagnosisInfo", {diagnosisId:diagnosis.diagnosisId,admitId:diagnosis.admitId});     
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Diagnoses</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeader}>S.No</Text>
          <Text style={styles.tableHeader}>Medicine</Text>
          <Text style={styles.tableHeader}>Date</Text>
          <Text style={styles.tableHeader}>Remarks</Text>
        </View>
        {diagnoses.map((diagnosis, index) => (
          <TouchableOpacity key={diagnosis.diagnosisId} onPress={() => onPressDiagnosisInfo(diagnosis)}>
            <View style={styles.tableRow}>
              <Text style={styles.tableData}>{counter + index}</Text>
              <Text style={styles.tableData}>{diagnosis.medicine}</Text>
              <Text style={styles.tableData}>{diagnosis.date}</Text>
              <Text style={styles.tableData}>{diagnosis.remarks}</Text>
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
