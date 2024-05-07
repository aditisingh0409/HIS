import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Emergencies = ({ emer }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
    setButtonsVisible(true);
  };

  const handleCancel = () => {
    setButtonsVisible(false);
  };

  const handleOk = async (index, emerId) => {
    try {
        const userId = AsyncStorage.getItem("userId"); 
        const token = AsyncStorage.getItem("token");
        const role = AsyncStorage.getItem("role");
    
        const headers = {
          Authorization: token,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "multipart/form-data",
        };
    
        const response = await axios.get(
          `${process.env.REACT_APP_SECRET_KEY}/doc/handleEmergency?userId=${userId}&emerId=${emerId}`,
          {
            headers: headers
          }
        );
        
        console.log(response);
        // Reload the component or navigate to another screen after handling the emergency
        // Add your logic here
        
      } catch (error) {
        console.error("Error handling emergency:", error);
        // Handle error
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.emergencyHeader}>
          <Text style={styles.emergencyHeaderText}>Emergency</Text>
        </View>
        <View style={styles.emergencyContent}>
          {emer.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emergencyItem}
              onPress={() => handleRowClick(index)}
            >
              <Text style={styles.emergencyItemId}>{user.emerId}</Text>
              <Text>{user.remark}</Text>
              {selectedRow === index && buttonsVisible && (
                <View style={styles.emergencyButtonContainer}>
                  <Button title="Cancel" onPress={handleCancel} />
                  <Button title="OK" onPress={() => handleOk(index, user.emerId)} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      marginTop: 10,
      overflowX: 'auto',
    },
    boxContainer: {
      flex: 1,
      padding: '0 10px',
      position: 'relative',
    },
    emergencyHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 57,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      borderBottom: '1px solid #ccc',
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emergencyHeaderText: {
      margin: 0,
      textAlign: 'center',
    },
    emergencyContent: {
      marginTop: 60,
    },
    emergencyItem: {
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
      position: 'relative',
      cursor: 'pointer',
    },
    emergencyItemId: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    emergencyButtonContainer: {
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
  });  

export default Emergencies;