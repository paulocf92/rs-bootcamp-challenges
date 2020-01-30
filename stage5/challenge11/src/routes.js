import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Header from '~/components/Header';

import SignIn from './pages/SignIn';

import Checkin from './pages/Checkin';
import HelpOrder from './pages/HelpOrder';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createStackNavigator(
          {
            Main: createBottomTabNavigator(
              {
                Checkin,
                HelpOrder,
              },
              {
                cardStyle: {
                  backgroundColor: '#191920',
                },
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#ee4d64',
                  inactiveTintColor: '#ccc',
                  tabStyle: {
                    justifyContent: 'center',
                  },
                  showIcon: false,
                },
              },
            ),
          },
          {
            defaultNavigationOptions: navigation => ({
              header: () => <Header {...navigation} />,
            }),
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
