import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppNavigation from '../../AppNavigation';
import backgroundImage from '../Images/background.jpg'; 

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shiftData, setShiftData] = useState(null);
  const [selectedShiftInfo, setSelectedShiftInfo] = useState('');

  useEffect(() => {
    fetchShiftData();
  }, []);

  const fetchShiftData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/doc/home?userId=${userId}`, 
        {
          headers: {
            Authorization: token,
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      setShiftData(response.data.shift);
    } 
    catch (error) {
      console.error('Error fetching shift data:', error);
    }
  };

  const getShiftDescription = (shiftValue) => {
    switch (shiftValue) {
      case 0:
        return 'Doctor not available';
      case 1:
        return 'Available 10 AM - 1 PM';
      case 2:
        return 'Available 3 PM - 6 PM';
      case 3:
        return 'Available 6 PM - 9 PM';
      default:
        return 'No shift data available';
    }
  };

  const handleDayClick = (value) => {
    setSelectedDate(new Date(value.timestamp));
    const dayOfWeek = new Date(value.timestamp).toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    const shiftValue = shiftData ? shiftData[dayOfWeek] : null;
    setSelectedShiftInfo(getShiftDescription(shiftValue));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar 
            onDayPress={handleDayClick}
            markedDates={{ [selectedDate.toISOString().slice(0, 10)]: { selected: true, selectedColor: '#007AFF' } }} 
          />
          <View style={styles.shiftInfoContainer}>
            <Text style={styles.bold}>Shift Details for {selectedDate.toLocaleDateString()}:</Text>
            <Text style={styles.text}> {selectedShiftInfo} </Text>
          </View>
        </View>
      </View>
      <View style={styles.navigation}>
        <AppNavigation />
      </View>
    </ImageBackground>
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
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  calendarContainer: {
    padding: 20,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  shiftInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginTop: 20,
    width: '40%',
    height: '10%',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bold: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0, 
    flexDirection: 'column',
    width: '100%',
  },
});