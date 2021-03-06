import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Header from '~/components/Header';

import SignIn from './pages/SignIn';

import CheckinList from './pages/CheckinList';

import HelpOrderList from './pages/HelpOrderList';
import Detail from './pages/HelpOrderList/Detail';
import New from './pages/HelpOrderList/New';

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
                CheckinList,
                HelpOrder: {
                  screen: createStackNavigator(
                    {
                      HelpOrderList,
                      Detail,
                      New,
                    },
                    {
                      defaultNavigationOptions: {
                        headerShown: false,
                      },
                    },
                  ),
                  navigationOptions: {
                    tabBarLabel: 'Pedir ajuda',
                  },
                },
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
