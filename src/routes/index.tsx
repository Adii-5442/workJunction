import React, {useEffect, useState} from 'react';
import NonAuthenticatedRoutes from './NonAuthenticatedRoutes';
import AuthenticatedRoutes from './AuthenticatedRoutes';
const CheckUser = () => {
  const [user, setUser] = useState<string | null>();
  useEffect(() => {
    const userExists = localStorage.getItem('user') || null;
    setUser(userExists);
  }, []);
  return user ? <AuthenticatedRoutes /> : <NonAuthenticatedRoutes />;
};

export default CheckUser;
