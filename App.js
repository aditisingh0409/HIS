import React from "react";
import 'react-native-gesture-handler';
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import DocDashboard from "./Screens/Doctor/DocDashboard"
import AddDiagnosis from "./Screens/Doctor/AddDiagnosis";
import InPatientList from "./Screens/Doctor/InPatientList";
import PastPatientList from "./Screens/Doctor/PastPatientList";
import LivePatientInfo from "./Screens/Doctor/LivePatientInfo";
import PastPatientInfo from "./Screens/Doctor/PastPatientInfo";
import CalendarScreen from "./Screens/Doctor/CalendarScreen";
import UpdateProfile from "./Screens/Doctor/UpdateProfile";
import DocProfile from "./Screens/Doctor/DocProfile";
import ChangePassword from "./Screens/Doctor/ChangePassword";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DocDashboard"
      screenOptions={({ route }) => ({
        headerTitle: '', // Hides the screen name
      })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DocDashboard" component={DocDashboard} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="AddDiagnosis" component={AddDiagnosis} />
        <Stack.Screen name="InPatientList" component={InPatientList} /> 
        <Stack.Screen name="PastPatientList" component={PastPatientList} />
        <Stack.Screen name="LivePatientInfo" component={LivePatientInfo} />
        <Stack.Screen name="PastPatientInfo" component={PastPatientInfo} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="DocProfile" component={DocProfile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;