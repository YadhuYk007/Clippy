import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import CollectionDetails from '../screens/CollectionDetails';
import color from '../constants/Colors';

const MainStack = createStackNavigator();
const Navigator = () => (
  <NavigationContainer>
    <MainStack.Navigator
    // initialRouteName={screenNames.CollectionList}
    >
      <MainStack.Screen
        name={'Collections'}
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
        name={'Details'}
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
