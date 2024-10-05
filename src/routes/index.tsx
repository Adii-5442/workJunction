import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NonAuthenticatedRoutes from './NonAuthenticatedRoutes';
import AuthenticatedRoutes from './AuthenticatedRoutes';

const AppStack = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const userExists = await AsyncStorage.getItem('user');
      setUser(userExists);
    };
    checkUser();
  }, []);

  return user ? <AuthenticatedRoutes /> : <NonAuthenticatedRoutes />;
};
export default AppStack;
