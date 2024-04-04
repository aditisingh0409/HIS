import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Sidebar from './Screens/Doctor/Sidebar';
import Navbar from './Screens/Doctor/Navbar';

export default function AddDiagnosis() {
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {toggle && (
          <View style={styles.sidebarContainer}>
            <Sidebar Toggle={Toggle} />
          </View>
        )}
        {toggle && <View style={styles.emptyColumn} />}
        <View style={styles.content}>
          <Navbar Toggle={Toggle} />
          <Text style={styles.heading}>Add Diagnosis</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <View style={styles.inputField}>
                <Text>Medicine Name</Text>
                <TextInput style={styles.input} />
              </View>
              <View style={styles.inputField}>
                <Text>Days</Text>
                <TextInput style={styles.input} />
              </View>
              <View style={styles.inputField}>
                <Text>Add/Remove</Text>
                <TextInput style={styles.input} />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputField}>
                <Text>Remarks</Text>
                <TextInput style={styles.input} />
              </View>
              <View style={styles.inputField}>
                <Text>Add/Remove</Text>
                <TextInput style={styles.input} />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Cancel</Text>
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
    backgroundColor: '#CCCCCC',
  },
  row: {
    flexDirection: 'row',
  },
  sidebarContainer: {
    flex: 1,
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
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputField: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});