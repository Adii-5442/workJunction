import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/routes';

function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

export default App;
