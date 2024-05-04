import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Picker, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';

const AddDiagnosis = () => {
  const [medicineName, setMedicineName] = useState('');
  const [count, setCount] = useState(0);
  const [medicines, setMedicines] = useState({});
  const [document,setDocument] = useState(null);
  
  const navigation = useNavigation();

  const route = useRoute();
  const { State } = route.params;
  const { admitId, aadhaar } = State;

  const [formData, setFormData] = useState({
    remarks: "",
    discharge: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  formData["admitId"]=admitId;
  formData["patientId"]=aadhaar;
  formData["medicine"]=medicines;

  // const handleAddMedicine = () => {
  //   if (medicineName && count) {
  //     setMedicines([...medicines, { medicineName: count }]);
  //     setMedicineName('');
  //     setCount('');
  //   }
  // };

  const handleAddMedicine = () => {
    setMedicines(medicines => ({
      ...medicines,
      [medicineName]: count
    }));
  //   setMedicines(...medicines,{
  //     medicineName: count
  // });
    setMedicineName('');
    setCount(0); // Reset count after adding
  };

  // const handleIncreaseCount = (index) => {
  //   const updatedMedicines = [...medicines];
  //   updatedMedicines[index].count = Number(updatedMedicines[index].count) + 1;
  //   setMedicines(updatedMedicines);
  // };

  const handleIncreaseCount = (index) => {
    setMedicines(medicines => ({
      ...medicines,
      [index]: medicines[index] + 1
    }));
    
    //   setMedicines(
  //     ...medicines,
  //     {index: medicines[index] + 1
  // });
  };

  // const handleDecreaseCount = (index) => {
  //   const updatedMedicines = [...medicines];
  //   if (updatedMedicines[index].count > 1) {
  //     updatedMedicines[index].count -= 1;
  //     setMedicines(updatedMedicines);
  //   } 
  //   else {
  //     // Remove medicine if count reaches 0
  //     updatedMedicines.splice(index, 1);
  //     setMedicines(updatedMedicines);
  //   }
  // };

  // const handleRemoveMedicine = (index) => {
  //   const updatedMedicines = [...medicines];
  //   updatedMedicines.splice(index, 1);
  //   setMedicines(updatedMedicines);
  // };

  const handleRemoveMedicine = (index) => {
    // if (medicineName[index] > 1) {
    //   setMedicines(
    //     ...medicines,
    //     {index: medicines[index] - 1
    // });
    // } else {
    //   const updatedData = { ...medicines };
    //   delete updatedData[index];
    //   setMedicines(updatedData);
    // }
    if (medicineName[index] > 1) {
      setMedicines(medicines => ({
        ...medicines,
        [index]: medicines[index] - 1
      }));
    } else {
      const updatedData = { ...medicines };
      delete updatedData[index];
      setMedData(updatedData);
    }
  };

  const newFile = {
    file: document,
    request : JSON.stringify(formData)
  }

  const handleSubmit = async () => {
    
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");
  
      const headers = {
        Authorization: token,
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "multipart/form-data",
      };
  
      console.log("FormData:", newFile);
      
      const response = await axios.post(
        `https://present-neat-mako.ngrok-free.app/his/patient/addDiagnosis?role=${role}&userId=${userId}`,
        newFile,
        {
          headers: headers,
          // body: formData
        }
      );
  
      const data = response.data;
      console.log("API Response: " + JSON.stringify(data));
  
      if (response.ok) {
        console.log(formData);
        alert("Diagnosis added successfully");
        navigation.replace  ("DocDashboard");
      } else {
        throw new Error("Error adding diagnosis");
      }
    } 
    catch (error) {
      console.log("Error", error);
      // toast.error("Error adding diagnosis. Please try again.");
    }
  };

  const openPicker = async (selectType) => {
    let acceptedTypes;
    let alertMessage;
  
    if (selectType === "doc") {
      acceptedTypes = ["image/png", "image/jpeg","application/pdf", "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      alertMessage = "Please select a document or image file.";
    } else {
      // Unsupported type
      alert("Unsupported File Type", "Only images (PNG, JPEG) and documents (PDF, DOC) are supported.");
      return;
    }
  
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      console.log("Selected file type:", result.type);
      console.log("result:", result);
      console.log("Accepted types:", acceptedTypes);
  
      if (result.type === "cancel") {
        // User canceled
        return;
      }
  
      // if (!acceptedTypes.includes(result.type)) {
      //   // File type not supported
      //   alert("Unsupported File Type", alertMessage);
      //   return;
      // }
  
      // Handle the selected file
      // setDocument(result.assets[0]);
      // console.log("Selected file:", document);
      console.log("Selected file:", result.assets[0]);
      setDocument(result.assets[0]);
    } 
    catch (error) {
      // Handle any errors
      console.error("Error selecting document:", error);
      alert("Error", "An error occurred while selecting the document. Please try again.");
    }
  };

  const renderMedicine = ({ item, index }) => (
    <View style={styles.medicineItem}>
      <Text style={styles.medicineName}>{item[0]}</Text>
      <View style={styles.countContainer}>
        <TouchableOpacity style={styles.countButton} onPress={() => handleRemoveMedicine(index)}>
          <Text style={styles.countButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{item[1]}</Text>
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
        <Text style={styles.label}>Remarks</Text>
        <TextInput
          style={styles.input}
          value={formData.remarks}
          onChangeText={(text) => handleChange('remarks', text)}
          multiline={true}
        />

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

      {Object.keys(medicines).length > 0 && (
        <View style={styles.medicinesList}>
          <Text style={styles.medicinesListTitle}>Added Medicines:</Text>
          <FlatList
            data={Object.entries(medicines)}
            renderItem={renderMedicine}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}

      {/* {Object.keys(medicines).length > 0 && (
        <View style={styles.medicinesList}>
          <Text style={styles.medicinesListTitle}>Added Medicines:</Text>
          <FlatList
            data={Object.entries(medicines)}
            renderItem={({ item }) => (
              <Text>{item[0]}: {item[1]}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )} */}


    <View style={styles.uploadContainer}>
      {/* <TouchableOpacity onPress={() => openPicker("image")}>
          <View style={styles.uploadOption}>
            <Text>Upload Image</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => openPicker("doc")}>
          <View style={styles.uploadOption}>
            <Text>Upload Document</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Discharge</Text>
        {/* <Picker
          selectedValue={formData.discharge}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange('discharge', itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="NO" value="0" />
          <Picker.Item label="YES" value="1" />
        </Picker> */}
        <RNPickerSelect
          style={{
            inputIOS: {
              // backgroundColor: 'white', 
              color: 'black',
            },
            inputAndroid: {
              // backgroundColor: 'white',
              color: 'black',
            },
            placeholder: { // Style for placeholder text
              color: 'gray', 
            },
          }}
          onValueChange={(value) => handleChange('discharge',value)}
          items={[
            { label: 'NO', value: '0' },
            { label: 'YES', value: '1' },
          ]}
          value={formData.discharge}
        />
      </View>

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
  inputContainer: {
    marginBottom: 20,
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
    backgroundColor: '#FFFFFF',
  },
});

export default AddDiagnosis;