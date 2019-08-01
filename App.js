import React from 'react';
import {Dimensions} from 'react-native';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import MapScreen from './src/screens/MapScreen';
import StationScreen from './src/screens/StationScreen';
import AddStationScreen from './src/screens/AddStationScreen';
import SettingScreen from './src/screens/SettingScreen';
import Icon from 'react-native-vector-icons/EvilIcons';

//width: 411.42857142857144        height: 731.4285714285714  
const { width, height} = Dimensions.get('window');



const DashboardStackNavigator = createStackNavigator(
  {
    MapScreen: { screen: MapScreen},
    StationScreen:{screen: StationScreen},
    AddStationScreen:{screen: AddStationScreen},
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
      headerTitleStyle: {textAlign:"center", flex: 1, color:'white'},
        headerLeft: (
          <Icon 
            style={{marginLeft:width/205.5}}
            name="navicon" size={width/10.28}
            color="white"  
            onPress={() => navigation.openDrawer()} 
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Map: {
      screen: DashboardStackNavigator
    },
    Settings: {
      screen: SettingScreen
    }
  }
);

const App = createAppContainer(AppDrawerNavigator );

export default App;