import React from "react"; 
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import AdDashboard from "./Screens/Admin/AdDashboard"
import DocDashboard from "./Screens/Doctor/DocDashboard"
import AddDiagnosis from "./Screens/Doctor/AddDiagnosis";
import PatientList from "./Screens/Doctor/PatientList";
import PatientInfo from "./Screens/Doctor/PatientInfo";
import ChangePassword from "./Screens/Doctor/ChangePassword";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
 
const Stack = createStackNavigator();

function App(){
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "DocDashboard" component={DocDashboard} />
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Forgot Password" component={ForgotPassword} />
      <Stack.Screen name = "AdDashboard" component={AdDashboard} />
      <Stack.Screen name = "AddDiagnosis" component={AddDiagnosis} />
      <Stack.Screen name = "PatientList" component={PatientList} />
      <Stack.Screen name = "PatientInfo" component={PatientInfo} />
      <Stack.Screen name = "Change Password" component={ChangePassword} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <PaperProvider>
      <App />
      </PaperProvider>
    </NavigationContainer>
  )
}
