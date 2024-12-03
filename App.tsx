import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
// import PatientScreen from "./screens/PatientScreen";
// import PsychologistScreen from "./screens/PsychologistScreen";
// import AdminScreen from "./screens/AdminScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        {/* <Stack.Screen name="Patient" component={PatientScreen} />
        <Stack.Screen name="Psychologist" component={PsychologistScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
