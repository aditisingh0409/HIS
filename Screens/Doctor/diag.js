import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Picker, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const AddDiagnosis = () => {
  const [remarks, setRemarks] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [count, setCount] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [diagImage,setDiagImage] = useState(null);
  const [discharge, setDischarge] = useState('');

  const navigation = useNavigation();

  const route = useRoute();
  const { State } = route.params;
  const { admitId, aadhaar } = State;

  const [formData, setFormData] = useState({
    remarks: "",
    discharge: "",
  });

  const handleAddMedicine = () => {
    if (medicineName && count) {
      setMedicines([...medicines, { name: medicineName, count: count }]);
      setMedicineName('');
      setCount('');
    }
  };

  formData["admitId"]=admitId;
  formData["patientId"]=aadhaar;
  formData["medicine"]=medicines;
  
  // console.log("see data",JSON.stringify(formData));

  const newObject = {
    file:diagImage,
    request : JSON.stringify(formData)
  }
  // console.log("seee data:",JSON.stringify(newObject));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');

      // const formData = new FormData();
      // formData.append('remarks', remarks);
      // // formData.append('discharge', discharge);
      // formData.append('medicine', JSON.stringify(medicineName));

      const response = await axios.post(
        `https://present-neat-mako.ngrok-free.app/his/patient/addDiagnosis?role=${role}&userId=${userId}`,
        newObject,
        {
          headers: {
            Authorization: token,
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('API Response:', response.data);
      console.log(formData);
      setFormData({
        remarks: "",
        discharge: "",
   
      });
      alert('Diagnosis Added Successfully');
      // setRemarks('');
      // setDischarge('');
      // setMedData({});
      // ToastAndroid.show('Diagnosis added successfully', ToastAndroid.SHORT);
      navigation.navigate('DocDashboard');
    } 
    catch (error) {
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

    // const [form, setForm] = useState({
  //   title: "",
  //   video: null,
  //   thumbnail: null,
  //   prompt: "",
  // });

  // const handleSubmit = () => {
  //   // Perform submission logic here, using the form values
  //   console.log({
  //     admitId,
  //     remarks,
  //     bloodPressure,
  //     oxygenLevel,
  //     reportFile,
  //     isDischarged,
  //     medicineList,
  //   });
  // };

  const openPicker = async (selectType) => {
    let acceptedTypes;
    let alertMessage;
  
    if (selectType === "image") {
      acceptedTypes = ["image/png", "image/jpeg"];
      alertMessage = "Please select an image (PNG or JPEG) file.";
    } else if (selectType === "doc") {
      acceptedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      alertMessage = "Please select a document (PDF or DOC) file.";
    } else {
      // Unsupported type
      Alert.alert("Unsupported File Type", "Only images (PNG, JPEG) and documents (PDF, DOC) are supported.");
      return;
    }
  
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: acceptedTypes,
      });
  
      if (result.type === "cancel") {
        // User canceled
        return;
      }
  
      if (!acceptedTypes.includes(result.type)) {
        // File type not supported
        Alert.alert("Unsupported File Type", alertMessage);
        return;
      }
  
      // Handle the selected file
      console.log("Selected file:", result);
    } catch (error) {
      // Handle any errors
      console.error("Error selecting document:", error);
      Alert.alert("Error", "An error occurred while selecting the document. Please try again.");
    }
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          Alert.alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Diagnosis</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Remarks:</Text>
        <TextInput
          style={styles.input}
          multiline
          value={formData.remarks}
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

    <View style={styles.uploadContainer}>
      <TouchableOpacity onPress={() => openPicker("image")}>
          <View style={styles.uploadOption}>
            <Text>Upload Image</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPicker("doc")}>
          <View style={styles.uploadOption}>
            <Text>Upload Document</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Discharge</Text>
      <Picker
        selectedValue={formData.discharge}
        onValueChange={(itemValue) => handleChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="NO" value="0" />
        <Picker.Item label="YES" value="1" />
      </Picker>

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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  uploadContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadOption: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});

export default AddDiagnosis;
