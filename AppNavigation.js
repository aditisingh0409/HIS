import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';


const NavigationBar = () => {

    const navigation = useNavigation();
    const route = useRoute();

  return (
    <View style={styles.bar}>        
      <MaterialCommunityIcons name="home-outline" size={26} color="black" onPress={() => navigation.navigate("DocDashboard")}/>
      <MaterialCommunityIcons name="account-group-outline" size={26} color="black" onPress={() => navigation.navigate("InPatientList")}/>
      <MaterialCommunityIcons name="history" size={24} color="black" onPress={() => navigation.navigate("PastPatientList")}/>
      <MaterialCommunityIcons name="calendar-outline" size={26} color="black" onPress={() => navigation.navigate("CalendarScreen")}/>
      <MaterialCommunityIcons name="cog-outline" size={26} color="black" onPress={() => navigation.navigate("SettingsScreen")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,  
  }
});

export default NavigationBar