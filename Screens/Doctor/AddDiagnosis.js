import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Picker, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Voice from '@react-native-voice/voice';
// import { Camera } from 'expo-camera';

const AddDiagnosis = () => {
  const [medicineName, setMedicineName] = useState('');
  const [count, setCount] = useState(0);
  const [medicines, setMedicines] = useState({});
  const [document,setDocument] = useState(null);
  const [selectedValue, setSelectedValue] = useState('0');

  const [remarks, setRemarks] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const navigation = useNavigation();

  const route = useRoute();
  const { State } = route.params;
  const { admitId, aadhaar } = State;

  const [formData, setFormData] = useState({
    remarks: "",
    discharge: "",
  });

  // const startSpeechToText = async () => {
  //   try {
  //     // Check and request microphone permission
  //     const permission = await Camera.getMicrophonePermissionsAsync();
  //     if (permission === RESULTS.GRANTED) {
  //       setIsListening(true);
  //       Voice.start('en-US');
  //     } else {
  //       console.error('Microphone permission denied');
  //     }
  //   } catch (error) {
  //     console.error('Error starting speech-to-text:', error);
  //   }
  // };

  // const onSpeechResults = (event) => {
  //   setIsListening(false);
  //   setRemarks(event.value[0]); // Set the speech-to-text result to remarks state
  // };

  // // Function to handle speech-to-text errors
  // const onSpeechError = (error) => {
  //   console.error('Speech-to-text error:', error);
  //   setIsListening(false);
  // };

  // // Function to stop speech-to-text
  // const stopSpeechToText = () => {
  //   Voice.stop();
  // };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
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
    // const newMedicine = { [medicineName]: { count } };
    setMedicines((medicines) => 
      ({ ...medicines, 
      [medicineName]:  count 
    }));
  
    // setMedicines(medicines => ({
    //   ...medicines,
    //   [medicineName]: count
    // }));
  //   setMedicines(...medicines,{
  //     medicineName: count
  // });
    setMedicineName('');
    setCount(0); // Reset count after adding
  };

  const handleIncreaseCount = (index) => {
    const updatedMedicines = { ...medicines };
    updatedMedicines[index].count += 1;
    // updatedMedicines[index].count = Number(updatedMedicines[index].count) + 1;
    setMedicines(updatedMedicines);
  };

  // // const handleIncreaseCount = (index) => {
  // //   if (medicines.hasOwnProperty(index)) {
  // //     setMedicines((medicines) => ({
  // //       ...medicines,
  // //       [index]: medicines[index] + 1
  // //     }));
  // //   }
  // // };

  const handleDecreaseCount = (index) => {
    const updatedMedicines = {...medicines};
    if (updatedMedicines[index].count > 1) {
      updatedMedicines[index].count -= 1;
      setMedicines(updatedMedicines);
    } 
    else {
      // Remove medicine if count reaches 0
      delete updatedMedicines[index];
      setMedicines(updatedMedicines);
    }
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = {...medicines};
    delete updatedMedicines[index];
    // updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  // const handleRemoveMedicine = (index) => {
  //   // if (medicineName[index] > 1) {
  //   //   setMedicines(
  //   //     ...medicines,
  //   //     {index: medicines[index] - 1
  //   // });
  //   // } else {
  //   //   const updatedData = { ...medicines };
  //   //   delete updatedData[index];
  //   //   setMedicines(updatedData);
  //   // }
  //   if (medicineName[index] > 1) {
  //     setMedicines(medicines => ({
  //       ...medicines,
  //       [index]: medicines[index] - 1
  //     }));
  //   } else {
  //     const updatedData = { ...medicines };
  //     delete updatedData[index];
  //     setMedicines(updatedData);
  //   }
  // };
  
  // const handleIncreaseCount = (index) => {
  //   setMedicines((prevMedicines) => {
  //     const updatedMedicines = { ...prevMedicines };
  //     updatedMedicines[index] += 1; // Increase count by one
  //     return updatedMedicines;
  //   });
  // };
  
  // const handleDecreaseCount = (index) => {
  //   setMedicines((prevMedicines) => {
  //     const updatedMedicines = { ...prevMedicines };
  //     if (updatedMedicines[index] > 0) {
  //       updatedMedicines[index] -= 1; // Decrease count by one if it's greater than 0
  //     }
  //     return updatedMedicines;
  //   });
  // };
  
  // const handleRemoveMedicine = (index) => {
  //   setMedicines((prevMedicines) => {
  //     const updatedMedicines = { ...prevMedicines };
  //     delete updatedMedicines[index]; // Remove the medicine entry altogether
  //     return updatedMedicines;
  //   });
  // };

  // const handleRemoveMedicine = (index) => {
  //   if (medicines[index] > 1) {
  //     setMedicines(medicines => ({
  //       ...medicines,
  //       [index]: medicines[index] - 1
  //     }));
  //   } else {
  //     const updatedData = { ...medicines };
  //     delete updatedData[index];
  //     setMedicines(updatedData);
  //   }
  // };

  // // Function to handle increasing count for existing key
  // const handleIncreaseCount = (index) => {
  //   setMedicines(medicines => ({
  //     ...medicines,
  //     [index]: medicines[index] ? medicines[index] + 1 : 1
  //   }));
  // };

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
        }
      );
  
      const data = response.data;
      console.log("API Response: " + JSON.stringify(data));
      alert("Diagnosis added successfully");
      navigation.replace("DocDashboard");
    } 
    catch (error) {
      console.log("Error", error);
    }
  };

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (result.type === "cancel" || !result.assets) {
        // User canceled
        console.log("User canceled file operation");
        return;
      }
  
      console.log("Selected file:", result.assets[0].file);
      setDocument(result.assets[0].file);
      
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
        <TouchableOpacity style={styles.countButton} onPress={() => handleDecreaseCount(index)}>
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

        // const audioStatus = await requestPermissionsAsync();
        // if (audioStatus.status !== 'granted') {
        //   Alert.alert('Sorry, we need microphone permissions to make this work!');
        // }
        // const audioStatus = await requestPermissionsAsync();
        // if (audioStatus.status !== 'granted') {
        //   Alert.alert('Sorry, we need microphone permissions to make this work!');
        // }
        // startSpeechToText();
        // const audioStatus = await Camera.getMicrophonePermissionsAsync(); // Use requestPermissionsAsync from expo-permissions
        // if (audioStatus !== 'granted') {
        //   console.log('Microphone permission denied');
        // }
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
          editable={!isListening}
        />
        
        <View style={styles.uploadContainer}>
          {/* <TouchableOpacity onPress={isListening ? stopSpeechToText : startSpeechToText}>
            <Text>{isListening ? 'Stop Listening' : 'Start Listening'}</Text>
          </TouchableOpacity>   */}
          <TouchableOpacity >
            <Icon name={isListening ? 'microphone' : 'microphone-slash'} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openPicker()}>
            <View style={styles.uploadOption}>
              <Text>Upload Document</Text>
            </View>
          </TouchableOpacity>
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
          // style={{
          //   inputIOS: {
          //     color: 'black',
          //   },
          //   inputAndroid: {
          //     color: 'black',
          //   },
          //   placeholder: {
          //     color: 'white', 
          //   },
          // }}
          onValueChange={(value) => handleChange('discharge', value)}
          items={[
            { label: 'NO', value: '0' },
            { label: 'YES', value: '1' },
          ]}
          value={formData.discharge || '0'} // Set default value to 'NO'
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
    marginTop: 16,
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
    backgroundColor: '#C67C00',
    width: '50%',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 20,
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
    justifyContent: 'flex-start',
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
    padding: 20,
  },
});

export default AddDiagnosis;