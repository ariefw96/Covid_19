import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  RegisterScreen,
  LoginScreen,
  Splash,
  ProfileScreen,
  AddScreen,
  ListScreen,
  ListRegion,
  ListByRegion,
  ListAllCases,
  Details,
  EditScreen,
  ChartScreen
} from '../screens';

import { SocketProvider } from '../utils/context/SocketProvider';

const Stack = createStackNavigator();

const Navigation = ({ navigation }) => {
  const user_id = useSelector((state) => state.authReducer.id);
  return (
    <SocketProvider id={user_id}>
      <Stack.Navigator>
        <Stack.Screen
          initialRouteName="Splash"
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListRegion"
          component={ListRegion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListByRegion"
          component={ListByRegion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListAllCases"
          component={ListAllCases}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chart"
          component={ChartScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SocketProvider>
  );
};

export default Navigation;
