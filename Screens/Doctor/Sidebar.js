import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Sidebar({ Toggle }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigation = useNavigation();

  const handleToggle = () => {
    setIsOpen(isOpen);
    Toggle();
  };

  const onPressDashboard = () => {
    console.log("DocDashboard");
    navigation.navigate("DocDashboard");
  }
  
  const onPressPatientList = () => {
    console.log("PatientList");
    navigation.navigate("PatientList");
  }
  
  const onPressAddDiagnosis = () => {
    console.log("AddDiagnosis");
    navigation.navigate("AddDiagnosis");
  }

  return (
    <View style={[styles.sidebar, !isOpen && styles.closedSidebar]}>
      <View style={styles.menuIconContainer}>
        <Text style={styles.brandName}>HIS</Text>
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.menuIcon}>&#10006;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItemsContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={onPressDashboard}>
          <Text style={styles.menuItemIcon}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={onPressPatientList}>
          <Text style={styles.menuItemIcon}>Patient List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={onPressAddDiagnosis}>
          <Text style={styles.menuItemIcon}>Add Diagnosis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  closedSidebar: {
    width: 50,
  },
  menuIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
  },
  brandNameContainer: {
    marginVertical: 10,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItemsContainer: {
    flexDirection: 'column',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemIcon: {
    fontSize: 16,
  },
});

export default Sidebar;