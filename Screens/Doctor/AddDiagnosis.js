import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import navigation hook from react-navigation
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';

const AddDiagnosis = () => {
  const [remarks, setRemarks] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [count, setCount] = useState('');
  const [medicines, setMedicines] = useState([]);
  const navigation = useNavigation();

  const handleAddMedicine = () => {
    if (medicineName && count) {
      setMedicines([...medicines, { name: medicineName, count: count }]);
      setMedicineName('');
      setCount('');
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');

      const formData = new FormData();
      formData.append('remarks', remarks);
      // formData.append('discharge', discharge);
      formData.append('medicine', JSON.stringify(medicineName));

      const response = await axios.post(
        `https://present-neat-mako.ngrok-free.app/his/patient/addDiagnosis?role=${role}&userId=${userId}`,
        formData,
        {
          headers: {
            Authorization: token,
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('API Response:', response.data);
      setRemarks('');
      setDischarge('');
      setMedData({});
      // ToastAndroid.show('Diagnosis added successfully', ToastAndroid.SHORT);
      navigation.navigate('DocDashboard');
    } catch (error) {
      console.error('Error:', error.message);
      // ToastAndroid.show('Error adding diagnosis. Please try again.', ToastAndroid.SHORT);
    }
  };
  // const handleSubmit = () => {
  //   // Handle form submission logic here
  //   console.log('Remarks:', remarks);
  //   console.log('Medicines:', medicines);
  // };

  const handleIncreaseCount = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].count = Number(updatedMedicines[index].count) + 1;
    setMedicines(updatedMedicines);
  };

  const handleDecreaseCount = (index) => {
    const updatedMedicines = [...medicines];
    if (updatedMedicines[index].count > 1) {
      updatedMedicines[index].count -= 1;
      setMedicines(updatedMedicines);
    } 
    else {
      // Remove medicine if count reaches 0
      updatedMedicines.splice(index, 1);
      setMedicines(updatedMedicines);
    }
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  const renderMedicine = ({ item, index }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <View style={styles.countContainer}>
        <TouchableOpacity style={styles.countButton} onPress={() => handleDecreaseCount(index)}>
          <Text style={styles.countButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{item.count}</Text>
        <TouchableOpacity style={styles.countButton} onPress={() => handleIncreaseCount(index)}>
          <Text style={styles.countButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveMedicine(index)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Remarks:</Text>
        <TextInput
          style={styles.input}
          multiline
          value={remarks}
          onChangeText={setRemarks}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Medicine Name:</Text>
        <TextInput
          style={styles.input}
          value={medicineName}
          onChangeText={setMedicineName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Count:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={count}
          onChangeText={setCount}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddMedicine}>
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>

      {medicines.length > 0 && (
        <View style={styles.medicinesList}>
          <Text style={styles.medicinesListTitle}>Added Medicines:</Text>
          <FlatList
            data={medicines}
            renderItem={renderMedicine}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  button: {
    backgroundColor: '#4F2197',
    width: '50%',
    padding: 10,
    alignSelf: 'center',
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
  medicinesList: {
    marginTop: 16,
  },
  medicinesListTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  medicineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  medicineName: {
    flex: 1,
    marginRight: 8,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countButton: {
    backgroundColor: '#4F2197',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    marginHorizontal: 10,
  },
  countButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  countText: {
    marginHorizontal: 8,
  },
  removeButton: {
    backgroundColor: '#f44336',
    // width: '10%',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddDiagnosis;