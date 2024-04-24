import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DocDashboard from "./Screens/Doctor/DocDashboard"
import InPatientList from "./Screens/Doctor/InPatientList";
import PastPatientList from "./Screens/Doctor/PastPatientList";
import CalendarScreen from "./Screens/Doctor/CalendarScreen";
import SettingsScreen from "./Screens/Doctor/SettingsScreen";

const Tab = createBottomTabNavigator();

const AppNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerRight: () => (
        <View>
          <Image source={require('./Screens/Doctor/img1.jpg')} style={{width: 50, height: 50, borderRadius: 50, marginRight: 10,}} />
        </View>
      ),
      headerRightContainerStyle: {
        paddingRight: 10,
      },
      headerTitle: '', // Hides the screen name
    })}
  >
    <Tab.Screen name="DocDashboard" component={DocDashboard} />
    <Tab.Screen name="InPatientList" component={InPatientList} />
    <Tab.Screen name="PastPatientList" component={PastPatientList} />
    <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
    <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
  </Tab.Navigator>
);

export default AppNavigation;