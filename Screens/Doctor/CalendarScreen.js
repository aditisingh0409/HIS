import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarScreen = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderArrow = (direction) => (
    <TouchableOpacity onPress={direction === 'left' ? handlePrevMonth : handleNextMonth}>
      <Icon
        name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        size={30}
        color="#007AFF"
      />
    </TouchableOpacity>
  );

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().slice(0, 10);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.arrowContainer}>
          {renderArrow('left')}
          {renderArrow('right')}
        </View>
        <Calendar
          key={currentMonth.getTime()} // Unique key based on currentMonth
          current={currentMonth.toISOString().slice(0, 7)}
          style={styles.calendar}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#007AFF',
            dayTextColor: '#333333',
            todayTextColor: '#ffffff',
            selectedDayBackgroundColor: '#007AFF',
            arrowColor: '#007AFF',
          }}
          markedDates={{
            [todayDate]: { selected: true, selectedColor: '#007AFF' }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  calendarContainer: {
    flex: 1,
    padding: 20,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default CalendarScreen;