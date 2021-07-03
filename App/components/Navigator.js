import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import CollectionDetails from '../screens/CollectionDetails';
import color from '../constants/Colors';

const MainStack = createStackNavigator();

const screenNames = {
  Home: 'Collections',
  Details: 'Details',
};
const Navigator = () => (
  <NavigationContainer>
    <MainStack.Navigator>
      <MainStack.Screen
        name={screenNames.Home}
        component={LandingScreen}
        options={{
          title: 'Clippy',
          headerStyle: {
            backgroundColor: color.Primary,
          },
          headerTintColor: color.White,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
          },
        }}
      />

      <MainStack.Screen
        name={screenNames.Details}
        component={CollectionDetails}
        options={{
          title: 'Clippy',
          headerStyle: {
            backgroundColor: color.Primary,
          },
          headerBackTitleVisible: false,
          headerTintColor: color.White,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'IBMPlexSerif-SemiBoldItalic',
          },
        }}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);

export default Navigator;
