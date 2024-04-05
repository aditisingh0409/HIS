import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
//import { Link } from 'react-router-native';

const Patients = ( {patients} ) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Patients</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Profile Picture</Text>
          <Text style={styles.tableHeader}>Patient ID</Text>
          <Text style={styles.tableHeader}>Name</Text>
        </View>
        {patients.map(patient => (
          <TouchableOpacity key={patient.id} onPress={() => console.log('Navigate to PInfo')}>
            <View style={styles.tableRow}>
              <Image source={patient.profilePhoto} style={styles.profileImage} />
              <Text>{patient.id}</Text>
              <Text>{patient.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    paddingRight: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 'auto',
  },
});

export default Patients;