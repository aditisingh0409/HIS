// import React from "react";
// import 'react-native-gesture-handler'; 
// import Login from "./Screens/Login";
// import ForgotPassword from "./Screens/ForgotPassword";
// import DocDashboard from "./Screens/Doctor/DocDashboard"
// import AddDiagnosis from "./Screens/Doctor/AddDiagnosis";
// import PatientList from "./Screens/Doctor/PatientList";
// import PatientInfo from "./Screens/Doctor/PatientInfo";
// import DoctorInfo from "./Screens/Doctor/DoctorInfo";
// import UpdateProfile from "./Screens/Doctor/UpdateProfile";
// import ChangePassword from "./Screens/Doctor/ChangePassword";
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { createDrawerNavigator } from "@react-navigation/drawer";
 
// const StackNav=()=>{
//   const Stack=createStackNavigator();
//   return (
//     <Stack.Navigator screenOptions = {{headerShown: false}}>
//         <Stack.Screen name = "Login" component={Login}/>
//         <Stack.Screen name = "Forgot Password" component={ForgotPassword} />
//         <Stack.Screen name = "DocDashboard" component={DocDashboard} />
//         <Stack.Screen name = "AddDiagnosis" component={AddDiagnosis} />
//         <Stack.Screen name = "PatientList" component={PatientList} />
//         <Stack.Screen name = "PatientInfo" component={PatientInfo} />
//         <Stack.Screen name = "DoctorInfo" component={DoctorInfo} />
//         <Stack.Screen name = "Update Profile" component={UpdateProfile} />
//         <Stack.Screen name = "Change Password" component={ChangePassword} />
//       </Stack.Navigator>
//   );
// }

// const DrawerNav=()=>{
//   const Drawer=createDrawerNavigator();
//   return(
//     <Drawer.Navigator screenOptions={{
//       statusBarColor: "#0163d2",
//       headerStyle: { backgroundColor : "#0163d2",},
//       headerTintColor: "#fff",
//       headerTitleAlign: 'center',
//     }}>
//       <Drawer.Screen name = "DocDashboard" component={DocDashboard} />
//       <Drawer.Screen name = "AddDiagnosis" component={AddDiagnosis} />
//       <Drawer.Screen name = "PatientList" component={PatientList} />
//       <Drawer.Screen name = "PatientInfo" component={PatientInfo} />
//       <Drawer.Screen name = "DoctorInfo" component={DoctorInfo} />
//       <Drawer.Screen name = "Update Profile" component={UpdateProfile} />
//       <Drawer.Screen name = "Change Password" component={ChangePassword} />
//     </Drawer.Navigator>
//   )
// }

// function App(){
//   return(
//     <NavigationContainer>
//       {/* <StackNav/> */}
//       <DrawerNav/>
//     </NavigationContainer>
//   );
// }

// export default () => {
//   return (
//     <NavigationContainer>
//       <App />
//       </NavigationContainer>
//   )
// };

import React from "react";
import 'react-native-gesture-handler';
import Login from "./Screens/Login";
import ForgotPassword from "./Screens/ForgotPassword";
import DocDashboard from "./Screens/Doctor/DocDashboard"
import AddDiagnosis from "./Screens/Doctor/AddDiagnosis";
import PatientList from "./Screens/Doctor/PatientList";
import PatientInfo from "./Screens/Doctor/PatientInfo";
import DoctorInfo from "./Screens/Doctor/DoctorInfo";
import UpdateProfile from "./Screens/Doctor/UpdateProfile";
import ChangePassword from "./Screens/Doctor/ChangePassword";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from "@react-navigation/drawer";

const StackNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="DocDashboard" component={DocDashboard} />
      <Stack.Screen name="AddDiagnosis" component={AddDiagnosis} />
      <Stack.Screen name="PatientList" component={PatientList} />
      <Stack.Screen name="PatientInfo" component={PatientInfo} />
      <Stack.Screen name="DoctorInfo" component={DoctorInfo} />
      <Stack.Screen name="Update Profile" component={UpdateProfile} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
    </Stack.Navigator>
  );
}

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{
      statusBarColor: "#0163d2",
      headerStyle: {
        backgroundColor: "#0163d2",
      },
      headerTintColor: "#fff",
      headerTitleAlign: 'center',
    }}>
      <Drawer.Screen name="DocDashboard" component={DocDashboard} />
      <Drawer.Screen name="AddDiagnosis" component={AddDiagnosis} />
      <Drawer.Screen name="PatientList" component={PatientList} />
      <Drawer.Screen name="PatientInfo" component={PatientInfo} />
      <Drawer.Screen name="DoctorInfo" component={DoctorInfo} />
      <Drawer.Screen name="Update Profile" component={UpdateProfile} />
      <Drawer.Screen name="Change Password" component={ChangePassword} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        {/* <StackNav/> */}
        <DrawerNav/>
      </PaperProvider>
    </NavigationContainer>
  );
}