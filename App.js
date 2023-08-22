import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, useColorScheme } from 'react-native';
import { ThemeProvider, SearchBar, lightColors, darkColors, createTheme, makeStyles } from '@rneui/themed';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

const theme = createTheme({
  lightColors: {
      ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
      }),
  },
  mode: 'light'
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Add Task" component={AddTask} />
          <Stack.Screen name="Edit Task" component={EditTask} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};



export default App;
