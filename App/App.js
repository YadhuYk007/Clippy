import React from 'react';
import {createAppContainer, createStackNavigator} from '@react-navigation';
import LandingScreen from './screens/LandingScreen';
import Navigator from './components/Navigator';

// const Stack = createStackNavigator();
const App = () => {
  return <Navigator />;
};

export default App;
