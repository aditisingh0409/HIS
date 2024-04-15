import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';

const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2024, 2, 27),
    end: new Date(2024, 2, 28),
  },
  {
    title: 'Vacation',
    start: new Date(2021, 2, 28),
    end: new Date(2021, 2, 30),
  },
  {
    title: 'Conference',
    start: new Date(2021, 2, 12),
    end: new Date(2021, 2, 23),
  },
];

const Cal1 = () => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvent = () => {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert('CLASH');
        break;
      }
    }
    setAllEvents([...allEvents, newEvent]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Add Title"
        style={styles.input}
        value={newEvent.title}
        onChangeText={(text) => setNewEvent({...newEvent, title: text })}
      />
      <DatePicker
        style={styles.datePicker}
        placeholder="Start Date"
        date={newEvent.start}
        onDateChange={(date) => setNewEvent({...newEvent, start: date })}
      />
      <DatePicker
        style={styles.datePicker}
        placeholder="End Date"
        date={newEvent.end}
        onDateChange={(date) => setNewEvent({...newEvent, end: date })}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
    
      <Calendar events={allEvents} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '40%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4F2197',
    width: '40%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  datePicker: {
    width: '40%',
    marginBottom: 10,
  },
});

export default Cal1;