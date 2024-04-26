import React from "react";
import 'react-native-gesture-handler';
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import DocDashboard from "./Screens/Doctor/DocDashboard"
import AddDiagnosis from "./Screens/Doctor/AddDiagnosis";
import InPatientList from "./Screens/Doctor/InPatientList";
import PastPatientList from "./Screens/Doctor/PastPatientList";
import PatientInfo from "./Screens/Doctor/PatientInfo";
import DoctorInfo from "./Screens/Doctor/DoctorInfo";
import CalendarScreen from "./Screens/Doctor/CalendarScreen";
import SettingsScreen from "./Screens/Doctor/SettingsScreen";
import UpdateProfile from "./Screens/Doctor/UpdateProfile";
import ChangePassword from "./Screens/Doctor/ChangePassword";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigation from './AppNavigation';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="AppNavigation" component={AppNavigation} />
      <Stack.Screen name="DocDashboard" component={DocDashboard} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="AddDiagnosis" component={AddDiagnosis} />
      <Stack.Screen name="InPatientList" component={InPatientList} /> 
      <Stack.Screen name="PastPatientList" component={PastPatientList} />
      <Stack.Screen name="PatientInfo" component={PatientInfo} />
      <Stack.Screen name="DoctorInfo" component={DoctorInfo} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default App;