import React from "react";
import 'react-native-gesture-handler';
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import DocDashboard from "./Screens/Doctor/DocDashboard"
import AddDiagnosis from "./Screens/Doctor/AddDiagnosis";
import InPatientList from "./Screens/Doctor/InPatientList";
import PastPatientList from "./Screens/Doctor/PastPatientList";
import LivePatientInfo from "./Screens/Doctor/LivePatientInfo";
import PastPatientInfo from "./Screens/Doctor/PastPatientInfo";
import DoctorInfo from "./Screens/Doctor/DoctorInfo";
import CalendarScreen from "./Screens/Doctor/CalendarScreen";
import SettingsScreen from "./Screens/Doctor/SettingsScreen";
import UpdateProfile from "./Screens/Doctor/UpdateProfile";
import DocProfile from "./Screens/Doctor/DocProfile";
import ChangePassword from "./Screens/Doctor/ChangePassword";
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions={({ route }) => ({
        // headerRight: () => (
        //   <View>
        //     <Image source={require('./Screens/Doctor/img1.jpg')} style={{width: 50, height: 50, borderRadius: 50, marginRight: 10,}} />
        //   </View>
        // ),
        // headerRightContainerStyle: {
        //   paddingRight: 10,
        // },
        headerTitle: '', // Hides the screen name
      })}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DocDashboard" component={DocDashboard} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="AddDiagnosis" component={AddDiagnosis} />
        <Stack.Screen name="InPatientList" component={InPatientList} /> 
        <Stack.Screen name="PastPatientList" component={PastPatientList} />
        <Stack.Screen name="LivePatientInfo" component={LivePatientInfo} />
        <Stack.Screen name="PastPatientInfo" component={PastPatientInfo} />
        <Stack.Screen name="DoctorInfo" component={DoctorInfo} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="DocProfile" component={DocProfile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;