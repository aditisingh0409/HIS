import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Patients = ({ patients }) => {
  const navigation = useNavigation();

  const onPressPatientInfo = () => {
    console.log("PatientInfo");
    navigation.navigate("PatientInfo");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Patients</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeader}>Profile Picture</Text>
          <Text style={styles.tableHeader1}>Patient ID</Text>
          <Text style={styles.tableHeader}>Name</Text>
        </View>
        {patients.map(patient => (
          <TouchableOpacity key={patient.id} onPress={onPressPatientInfo}>
            <View style={styles.tableRow}>
              <Image source={patient.profilePhoto} style={styles.profileImage} />
              <Text style={styles.tableData}>{patient.id}</Text>
              <Text style={styles.tableData}>{patient.name}</Text>
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
  },
  tableHeader1: {
    flex: 2,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  tableData: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Patients;