import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Profile from './ProfilePhoto';
import Patients from './Patients';

export default function Doctor() {
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const inpatients = 10;
  const outpatients = 20;

  const patients = [
    {
      id: 1,
      name: "John Doe",
      profilePhoto: require('../Images/images1.jpeg'),
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePhoto: require('../Images/images2.jpeg'),
    },
    {
      id: 3,
      name: "John Smith",
      profilePhoto: require('../Images/images3.jpeg'),
    },
    {
      id: 4,
      name: "Jane Doe",
      profilePhoto: require('../Images/images4.jpeg'),
    },
    {
      id: 5,
      name: "Doe Jane",
      profilePhoto: require('../Images/images2.jpeg'),
    },
    {
      id: 6,
      name: "Smith John",
      profilePhoto: require('../Images/images1.jpeg'),
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.dropdownMenu}>
            {isOpen && (
              <View style={styles.dropdownContent}>
                <Profile Toggle={toggleProfile} />
              </View>
            )}
          </View>
          {/* Number of Inpatients and Outpatients */}
          <View style={styles.pieChartsContainer}>
            <View style={styles.circle}>
              <View style={styles.innerCircle}>
                <Text style={styles.number}>{inpatients}</Text>
              </View>
              <Text style={styles.label}>Inpatients</Text>
            </View>
            <View style={styles.circle}>
              <View style={styles.innerCircle}>
                <Text style={styles.number}>{outpatients}</Text>
              </View>
              <Text style={styles.label}>Outpatients</Text>
            </View>
          </View>
          {/* Patient List */}
          <View style={styles.patientsContainer}>
            <Patients patients={patients} />
          </View>
        </View>
      </View>
    </ScrollView>
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
    flexDirection: 'row',
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
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContent: {
    width: '100%',
  },
  pieChartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  circle: {
    alignItems: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  patientsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
});