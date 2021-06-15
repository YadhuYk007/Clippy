import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LandingScreen from '../screens/LandingScreen';
import CollectionDetails from '../screens/CollectionDetails';
import color from '../constants/Colors';
const screens = {
  Home: {
    screen: LandingScreen,
    navigationOptions: {
      title: 'Clippy',
      headerStyle: {
        backgroundColor: color.Primary,
      },
      headerTitleStyle: {
        fontFamily: 'IBMPlexSerif-Italic',
        alignSelf: 'center',
      },
      headerTintColor: color.White,
      color: color.White,
    },
  },
  Details: {
    screen: CollectionDetails,
    navigationOptions: {
      title: 'Clippy',
      headerStyle: {
        backgroundColor: color.Primary,
      },
      headerTitleStyle: {
        fontFamily: 'IBMPlexSerif-Italic',
        marginLeft: 100,
      },
      headerTintColor: color.White,
      color: color.White,
    },
  },
};

const Navigator = createStackNavigator(screens);

export default createAppContainer(Navigator);
