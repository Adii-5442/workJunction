import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../../screens/LandingScreen';
import LoginScreen from '../../screens/Login';

const Stack = createNativeStackNavigator();

const NonAuthenticatedRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="LandingScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default NonAuthenticatedRoutes;