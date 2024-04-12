import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer(); 
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Admin Dashboard</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.heading}>Hospital Survey</Text>

        {/* Statistics */}
        <View style={styles.statistics}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Doctors</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>Nurses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
        </View>

        <View style={styles.content}>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.optionText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddStaff')}>
            <Text style={styles.optionText}>Add Staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('StaffList')}>
            <Text style={styles.optionText}>Staff List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ModifySchedule')}>
            <Text style={styles.optionText}>Modify Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.optionText}>Settings</Text>
            </TouchableOpacity>
        </View>

        {/* Area Chart */}
        <View style={styles.chartContainer}>
          {/* Add Area Chart component here */}
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          {/* Add Pie Chart component here */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#817d7d',
    padding: 10,
  },
  menuButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#555',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
});

export default DashboardScreen;