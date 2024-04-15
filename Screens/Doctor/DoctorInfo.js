import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigation } from '@react-navigation/native';

export default function DocInfo() {
  const [toggle, setToggle] = useState(false);
  const navigation = useNavigation();

  const Toggle = () => {
    setToggle(!toggle);
  };

  const onPressBack = () => {
    console.log("DocDashboard");
    navigation.navigate("DocDashboard");
  }

  return (
    <View style={styles.container}>
        <View style={styles.row}>
        {toggle && (
          <View style={styles.sidebarContainer}>
            <Sidebar Toggle={Toggle} />
          </View>
        )}
        <View style={styles.content}>
            <Navbar Toggle={Toggle} />
            <View style={styles.profileContainer}>
              <Image source={require('./img1.jpg')} style={styles.profileImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.heading}>Patient Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Name:</Text>
                  <Text>John Doe</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Address:</Text>
                  <Text>Bangalore</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email:</Text>
                  <Text>john_doe@gmail.com</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text>2587945278</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Gender:</Text>
                  <Text>Male</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Date of Birth:</Text>
                  <Text>28-08-1999</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Blood group:</Text>
                  <Text>B+</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPressBack}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    marginBottom: 10,
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
});