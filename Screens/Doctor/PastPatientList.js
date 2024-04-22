import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.dropdownMenu}>
            {isOpen && (
              <View style={styles.dropdownContent}>
                <Profile Toggle={toggleProfile} />
              </View>
            )}
          </View>
          <View style={styles.patientsContainer}>
            <Patients patients={patients} />
          </View>
        </View>
      </View>
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
  patientsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
});