import * as React from 'react';
import {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/routes';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

function App() {
  useEffect(() => {
    const requestLocationPermission = async () => {
      let permission;
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      } else {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      }

      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            console.log({position});
          },
          error => {
            console.error({error});
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        Alert.alert('Location permission denied');
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
}

export default App;
