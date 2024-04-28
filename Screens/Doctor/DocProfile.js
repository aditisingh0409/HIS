import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function DocProfile( {Toggle}) {
  const [isOpen, setIsOpen] = useState(false);
  const [docInfo, setDocInfo] = useState([]); 

  const handleToggle = () => {
    setIsOpen(!isOpen);
    Toggle();
  };

  const fetchDoc = async () => {

    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    try {
      const headers = {
        Authorization: token,
        "ngrok-skip-browser-warning": "true",
      };
      console.log("User Id : ", userId);

      const response = await axios.get(
        `https://present-neat-mako.ngrok-free.app/his/personalDetails?role=${role}&id=${userId}`,
        {
          headers: headers,
        }
      );

      // Check if response status is successful before setting state
      if (response.status === 200) {
        console.log("API response of user : "+JSON.stringify(response.data))
        setDocInfo(response.data.response);
      } 
      else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error here", error);
    }
  };

  useEffect(() => {
    fetchDoc();
  }, []);
  
return (
  <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
            <View style={styles.profileContainer}>
              <Image source={{ url: docInfo.profileImage }} style={styles.profileImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.heading}>Doctor Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>First Name:</Text>
                  <Text style={styles.label}>{docInfo.firstName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Last Name:</Text>
                  <Text style={styles.label}>{docInfo.lastName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Phone:</Text>
                  <Text style={styles.label}>{docInfo.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Gender:</Text>
                  <Text style={styles.label}>{docInfo.gender}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Date of Birth:</Text>
                  <Text style={styles.tableData}>{docInfo.birthDate}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Blood group:</Text>
                  <Text style={styles.label}>{docInfo.blood}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Address:</Text>
                  <Text style={styles.label}>{docInfo.address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Experience:</Text>
                  <Text style={styles.label}>{docInfo.experience} Years</Text>
                </View>
              </View>
            </View>
          </View>      
        </View>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  sidebarContainer: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: '100%',
  },
  profileContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    width: '100%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 50,
  },
  infoContainer: {
    marginLeft: 50,
    width: '50%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    minWidth: 100,
    marginRight: 50,
  },
});

{/* <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image source={require('./Screens/Doctor/img1.jpg')} style={{width: 50, height: 50, borderRadius: 50, marginRight: 10,}} />
          <Text style={styles.name}>Julie L. Arsenault</Text>
          <Text style={styles.subtitle}>@Programmer | mdbootstrap.com</Text>
          <View style={styles.socialButtons}>
            <Button icon="facebook" mode="outlined" style={styles.socialButton} />
            <Button icon="twitter" mode="outlined" style={styles.socialButton} />
            <Button icon="skype" mode="outlined" style={styles.socialButton} />
          </View>
          <Button mode="contained" style={styles.messageButton}>
            Message now
          </Button>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>8471</Text>
              <Text style={styles.statLabel}>Wallets Balance</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>8512</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>4751</Text>
              <Text style={styles.statLabel}>Total Transactions</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    

    <TouchableOpacity onPress={handleToggle}>
      <View>
        <ImageBackground
          source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp' }}
          style={styles.profileImage}
        />
    </View>
    </TouchableOpacity>
  </View> */}

  
  // container: {
  //   flex: 1,
  //   backgroundColor: '#eee',
  //   justifyContent: 'center',
  // },
  // card: {
  //   borderRadius: 15,
  //   margin: 20,
  // },
  // cardContent: {
  //   alignItems: 'center',
  //   padding: 20,
  // },
  // avatar: {
  //   marginBottom: 20,
  // },
  // name: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 5,
  // },
  // subtitle: {
  //   fontSize: 16,
  //   marginBottom: 20,
  //   color: 'grey',
  // },
  // socialButtons: {
  //   flexDirection: 'row',
  //   marginBottom: 20,
  // },
  // socialButton: {
  //   marginRight: 10,
  // },
  // messageButton: {
  //   marginBottom: 20,
  // },
  // statsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 10,
  // },
  // stat: {
  //   alignItems: 'center',
  // },
  // statValue: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  // statLabel: {
  //   fontSize: 12,
  //   color: 'grey',
  // },