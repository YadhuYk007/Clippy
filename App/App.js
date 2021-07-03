import React from 'react';
import Navigator from './components/Navigator';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  SplashScreen.hide();
  return <Navigator />;
};

export default App;
