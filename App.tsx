/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { AppStack } from "./src/navigation/AppStack";
import { navigationRef } from "./src/navigation/Navigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider>
        <NavigationContainer
          theme={{colors: {background: '#000'}}}
          ref={navigationRef}>
          <AppStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default App;
