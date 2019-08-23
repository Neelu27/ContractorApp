import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StyleSheet,
  StatusBar,
  View,Platform
} from 'react-native';

import { AppLoading, Asset, Font, Icon } from 'expo';

import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import LogInScreen from './pages/LogInScreen';
import HomeScreen from './pages/HomeScreen';
import SocialScreen from './pages/SocialScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import ChatScreen from './pages/ChatScreen';
import DevelopScreen from './pages/DevelopScreen';
import DetailsScreen from './pages/DetailsScreen';
import ItemScreen from './pages/ItemScreen';
import UserDetails from './pages/UserDetails';
import TermsConditionScreen from './pages/TermsConditionScreen';
import SplashScreen from './pages/SplashScreen';




const AuthStack = createStackNavigator
(
  {
  LogInScreen: { screen: LogInScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  },
 {
   initialRouteName: 'LogInScreen',
 }
);

const AppStack = createStackNavigator({
    UserDetails: { screen: UserDetails },
    SocialScreen: { screen: SocialScreen },
    DevelopScreen: { screen: DevelopScreen },
    DetailsScreen: { screen: DetailsScreen },
    ItemScreen: { screen: ItemScreen },
    TermsConditionScreen: { screen: TermsConditionScreen },
    // ChatScreen: { screen: ChatScreen },
  },
  {
    initialRouteName: 'DetailsScreen',
  }
);
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
