import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../../screens/LandingScreen';
import LoginScreen from '../../screens/Login';
import CreateAccount from '../../screens/CreateAccount';

const Stack = createNativeStackNavigator();

const NonAuthenticatedRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="LandingScreen" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default NonAuthenticatedRoutes;