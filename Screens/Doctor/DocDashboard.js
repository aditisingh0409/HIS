import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
//import ReactCalendar from './Cal';
import Patients from './Patients';

export default function Doctor() {
  const [toggle, setToggle] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  const toggleProfile = () => {
    console.log("profile clicked");
    setIsOpen(!isOpen);
  };

  const patients = [
    {
      id: 1,
      name: "John Doe",
      profilePhoto: require('./img1.jpg'),
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePhoto: require('./img1.jpg'),
    },
    // Add more patient objects as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {toggle && (
          <View style={styles.sidebar}>
            <Sidebar Toggle={Toggle} />
          </View>
        )}
        {toggle && <View style={styles.emptyColumn} />}
        <View style={styles.content}>
          <Navbar Toggle={Toggle} />
          {isOpen && (
            <View style={styles.dropdownMenu}>
              {/* <View style={styles.dropdownContent}>
                <Text>This is a dropdown content</Text>
                <Text>It opens on clicking the profile picture</Text>
              </View> */}
            </View>
          )}
          <View>
            <Patients patients={patients} />
          </View>
          <View style={styles.calendarContainer}>
            {/*<ReactCalendar />*/}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  row: {
    flexDirection: 'row',
  },
  sidebar: {
    width: 220,
    height: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  emptyColumn: {
    flex: 1,
  },
  content: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContent: {
    width: 200,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
  },
  calendarContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 20,
    marginRight: 15,
  },
});