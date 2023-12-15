import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {navigationConstants} from "../constants/NavigationConstant";
import Login from "../screens/Authentication/Login/Login";
import Dashboard from "../screens/Dashboard/Dashboard";
import Splash from "../screens/Splash/Splash";

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name={navigationConstants.LOGIN} component={Login} />
      <Stack.Screen name={navigationConstants.DASHBOARD} component={Dashboard} />
      <Stack.Screen name={navigationConstants.SPLASH} component={Splash} />
    </Stack.Navigator>
  );
};
