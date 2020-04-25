import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Home from './src/pages/Home';
import Search from './src/pages/Search';

const mainNavigation = createSwitchNavigator({
  Home,
  Search
})

export default createAppContainer(mainNavigation);
