import React from 'react';
import Home from '../pages/Home';
import Search from '../pages/Search';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

export default function AppRoutes() {
  return (
    <AppStack.Navigator headerMode='none'>
      <AppStack.Screen name='Home' component={Home} />
      <AppStack.Screen name='Search' component={Search} />
    </AppStack.Navigator>
  );
}