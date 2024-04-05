import React from "react"; 
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import ForgotPassword from "./Screens/ForgotPassword";
import AdDashboard from "./Screens/Admin/Dashboard"
import DocDashboard from "./Screens/Doctor/DocDashboard"
import AddDiagnosis from "./Screens/Doctor/AddDiagnosis";
import PatientInfo from "./Screens/Doctor/PatientInfo";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
 
const Stack = createStackNavigator();

function App(){
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}}>
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Register" component={Register}/>
      <Stack.Screen name = "Forgot Password" component={ForgotPassword} />
      <Stack.Screen name = "AdDashboard" component={AdDashboard} />
      <Stack.Screen name = "DocDashboard" component={DocDashboard} />
      <Stack.Screen name = "AddDiagnosis" component={AddDiagnosis} />
      <Stack.Screen name = "PatientInfo" component={PatientInfo} />
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
