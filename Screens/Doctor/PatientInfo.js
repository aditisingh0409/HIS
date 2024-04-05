import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigation } from '@react-navigation/native';
//import { Link } from 'react-router-native';

export default function PInfo() {
  const [toggle, setToggle] = useState(true);
  const navigation = useNavigation();

  const Toggle = () => {
    setToggle(!toggle);
  };

  const onPressAddDiagnosis = () => {
    console.log("AddDiagnosis");
    navigation.navigate("AddDiagnosis");
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          {toggle && (
            <View style={styles.sidebar}>
              <Sidebar Toggle={Toggle} />
            </View>
          )}
          {toggle && <View style={styles.sidebar}></View>}
          <View style={styles.col}>
            <Navbar Toggle={Toggle} />
            <View style={styles.profileContainer}>
              <Image source={require('./img1.jpg')} style={styles.profileImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.heading}>Patient Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Name:</Text>
                  <Text>Saloni</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Address:</Text>
                  <Text>Bangalore</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email:</Text>
                  <Text>saloni@gmail.com</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text>2587945278</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Gender:</Text>
                  <Text>Female</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Date of Birth:</Text>
                  <Text>28-08-1999</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Blood group:</Text>
                  <Text>B+</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={onPressAddDiagnosis}>
                  <Text style={styles.buttonText}>Add Diagnosis</Text>
                </TouchableOpacity>
              </View>
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
  },
  row: {
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: 'white',
  },
  col: {
    flex: 4,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 100,
    flexDirection: 'row',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 50,
  },
  infoContainer: {
    marginLeft: 50,
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
    color: 'blue',
  },
});