import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DocDashboard from "./Screens/Doctor/DocDashboard"
import InPatientList from "./Screens/Doctor/InPatientList";
import PastPatientList from "./Screens/Doctor/PastPatientList";
import CalendarScreen from "./Screens/Doctor/CalendarScreen";
import SettingsScreen from "./Screens/Doctor/SettingsScreen";

const Tab = createBottomTabNavigator();

const AppNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen name="DocDashboard" component={DocDashboard} />
    <Tab.Screen name="InPatientList" component={InPatientList} />
    <Tab.Screen name="PastPatientList" component={PastPatientList} />
    <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
    <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
  </Tab.Navigator>
);

export default AppNavigation;