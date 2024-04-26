import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook from react-navigation
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage

const AddDiagnosis = () => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(true);
  const [diagImage, setDiagImage] = useState(null);
  const [admitId, setAdmitId] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [remarks, setRemarks] = useState('');
  const [discharge, setDischarge] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [count, setCount] = useState(1);
  const [medData, setMedData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');
        const locationState = navigation.getParam('state');

        setAdmitId(locationState.admitId);
        setAadhaar(locationState.aadhaar);

        // if (!userId || !token || !role) {
        //   navigation.navigate('Login'); // Navigate to login if user data is missing
        // } else {
        //   setIsLoggedIn(true); // Set isLoggedIn to true
        // }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    if (medicineName && count > 0) {
      setMedData(prevData => ({
        ...prevData,
        [medicineName]: count
      }));
      setMedicineName('');
      setCount(1);
    }
  };

  const handleRemove = key => {
    if (medData[key] > 1) {
      setMedData(prevData => ({
        ...prevData,
        [key]: prevData[key] - 1
      }));
    } else {
      const updatedData = { ...medData };
      delete updatedData[key];
      setMedData(updatedData);
    }
  };

  const handleIncreaseCount = key => {
    setMedData(prevData => ({
      ...prevData,
      [key]: prevData[key] + 1
    }));
  };

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');

      const formData = new FormData();
      formData.append('remarks', remarks);
      formData.append('discharge', discharge);
      formData.append('medicine', JSON.stringify(medData));

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
      ToastAndroid.show('Diagnosis added successfully', ToastAndroid.SHORT);
      navigation.navigate('Doctor');
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show('Error adding diagnosis. Please try again.', ToastAndroid.SHORT);
    }
  };

  if (!isLoggedIn) {
    return null; // Render nothing until user is logged in
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Diagnosis</Text>
        <View style={styles.inputContainer}>
          <Text>Remarks</Text>
          <TextInput
            style={styles.input}
            value={remarks}
            onChangeText={text => setRemarks(text)}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Medicine Name</Text>
          <TextInput
            style={styles.input}
            value={medicineName}
            onChangeText={text => setMedicineName(text)}
          />
          <Text>Count</Text>
          <TextInput
            style={styles.input}
            value={count.toString()}
            onChangeText={text => setCount(parseInt(text))}
            keyboardType="numeric"
          />
          <Button title="Add" onPress={handleAdd} />
        </View>
        <View style={styles.medicineList}>
          <Text style={styles.medicineListTitle}>Added Medicines:</Text>
          {Object.entries(medData).map(([key, value]) => (
            <Text key={key}>{`${key}: ${value}`}</Text>
          ))}
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ECE3F0',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  medicineList: {
    marginBottom: 20,
  },
  medicineListTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AddDiagnosis;

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// export default function AddDiagnosis() {
//   const [toggle, setToggle] = useState(false);

//   const Toggle = () => {
//     setToggle(!toggle);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.row}>
//         <View style={styles.content}>
//           <Text style={styles.heading}>Add Diagnosis</Text>
//           <View style={styles.inputContainer}>
//             <View style={styles.inputRow}>
//               <View style={styles.inputField}>
//                 <Text>Medicine Name</Text>
//                 <TextInput style={styles.input} />
//               </View>
//               <View style={styles.inputField}>
//                 <Text>Days</Text>
//                 <TextInput style={styles.input} />
//               </View>
//               <View style={styles.inputField}>
//                 <Text>Add/Remove</Text>
//                 <TextInput style={styles.input} />
//               </View>
//             </View>
//             <View style={styles.inputRow}>
//               <View style={styles.inputField}>
//                 <Text>Remarks</Text>
//                 <TextInput style={styles.input} />
//               </View>
//               <View style={styles.inputField}>
//                 <Text>Add/Remove</Text>
//                 <TextInput style={styles.input} />
//               </View>
//             </View>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button}>
//                 <Text>Submit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.button}>
//                 <Text>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     width: '100%',
//   },
//   row: {
//     flexDirection: 'row',
//     width: '100%',
//   },
//   sidebarContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 3,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flex: 1,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   inputField: {
//     flex: 1,
//     marginRight: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     borderRadius: 5,
//     padding: 5,
//     height: 40,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#DDDDDD',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },  
//   buttonText: {
//     color: '#000000',
//     fontSize: 16,
//   },
// });