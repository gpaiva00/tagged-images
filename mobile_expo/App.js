import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { TagsProvider } from './TagsContext';

import Home from './src/pages/Home';
import Search from './src/pages/Search';

const mainNavigation = createSwitchNavigator({
  Home,
  Search
})

const AppContainer = createAppContainer(mainNavigation);

function App() {
  return (
      <TagsProvider>
        <AppContainer />
      </TagsProvider>
  );
}

export default App;