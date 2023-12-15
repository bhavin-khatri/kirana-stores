import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationConstants } from "../constants/NavigationConstant";
import OtpVerification from "../screens/Authentication/Verification/OtpVerification";
import Login from "../screens/Authentication/Login/Login";

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name={navigationConstants.LOGIN} component={Login} />
      <Stack.Screen name={navigationConstants.OTP_VERIFICATION} component={OtpVerification} />

    </Stack.Navigator>
  );
};
