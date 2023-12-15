import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {navigationConstants} from "../constants/NavigationConstant";
import Login from "../screens/Authentication/Login/Login";
import StoreList from "../screens/Stores/StoreList";
import Splash from "../screens/Splash/Splash";
import StoreDetails from "../screens/Stores/StoreDetails";

const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="StoreList">
      <Stack.Screen name={navigationConstants.LOGIN} component={Login} />
      <Stack.Screen name={navigationConstants.STORE_LIST} component={StoreList} />
      <Stack.Screen name={navigationConstants.STORE_DETAILS} component={StoreDetails} />
      <Stack.Screen name={navigationConstants.SPLASH} component={Splash} />
    </Stack.Navigator>
  );
};
