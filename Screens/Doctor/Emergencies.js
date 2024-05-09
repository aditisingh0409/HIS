import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Popup = ({ visible, onCancel, onHandle, emerId, emerMsg }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <Text style={styles.popupHeader}>Do you want to handle this emergency?</Text>
          <Text style={styles.popupText}>Emergency ID: {emerId}</Text>
          <Text style={styles.popupText}>Message: {emerMsg}</Text>
          <View style={styles.popupButtons}>
            <TouchableOpacity style={styles.button} onPress={onHandle}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Emergencies = ({ emer }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
    setButtonsVisible(true);
  };

  const handleCancel = () => {
    setButtonsVisible(false);
  };

  const handleOk = async (index, emerId) => {
    setSelectedEmergency(emerId);
    setIsPopupVisible(true);
  };

  const handlePopupCancel = () => {
    setIsPopupVisible(false);
  };

  const handlePopupHandle = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");

      const headers = {
        Authorization: token,
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/doc/handleEmergency?userId=${userId}&emerId=${selectedEmergency}`,
        {
          headers: headers
        }
      );

      console.log(response);
      setIsPopupVisible(false);
    } 
    catch (error) {
      console.error("Error handling emergency:", error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.emergencyHeader}>
          <Text style={styles.emergencyHeaderText}>EMERGENCY</Text>
        </View>
        <View style={styles.emergencyContent}>
          {emer.map((user, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emergencyItem}
              onPress={() => handleRowClick(index)}>
              <Text style={styles.emergencyItemId}>{user.emerId} :  {user.remark}</Text>
              {/* <Text>{user.remark}</Text> */}
              {selectedRow === index && buttonsVisible && (
                <View style={styles.emergencyButtonContainer}>
                  <TouchableOpacity style={styles.emergencyButton} onPress={handleCancel}>
                    <Text style={styles.emergencyButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.emergencyButton} onPress={() => handleOk(index, user.emerId, user.remark)}>
                    <Text style={styles.emergencyButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <Popup
                    visible={isPopupVisible}
                    onCancel={handlePopupCancel}
                    onHandle={handlePopupHandle}
                    emerId={user.emerId}
                    emerMsg={user.remark}
                  />
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
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
      marginTop: 10,
      overflowX: 'auto',
    },
    boxContainer: {
      flex: 1,
      padding: 10,
      position: 'relative',
      borderColor: '#a30d0d',
      borderWidth: 2,
      borderRadius: 5,
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
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'red',
    },
    emergencyContent: {
      marginTop: 60,
    },
    emergencyItem: {
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
      paddingTop: 10,
      position: 'relative',
    },
    emergencyItemId: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    emergencyButtonContainer: {
      position: 'absolute',
      bottom: 5,
      right: 70,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: 120,
    },
    emergencyButton: {
      backgroundColor: '#C67C00',
      width: '70%',
      padding: 10,
      alignSelf: 'center',
      borderRadius: 10,
      marginRight: 20,
      marginTop: 10,
    },
    emergencyButtonText: {
      color: 'white',
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
    },
    popupContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignContent: 'center',
      width: '50%',
    },
    popupButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
      padding: 20,
    },
    popupHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: 'red',
    },
    popupText: {
      fontSize: 14,
      fontWeight: 'bold',
      alignSelf: 'center',
      margin: 10,
    },
    button: {
      backgroundColor: '#4F2197',
      width: '50%',
      padding: 10,
      alignSelf: 'center',
      borderRadius: 10,
      marginLeft: 20,    
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },
    
  });  

export default Emergencies;