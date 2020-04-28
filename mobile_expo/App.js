import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

import { TagsProvider } from './TagsContext';
import { ImagesProvider } from './ImagesContext';

export default function App() {
  return (
    <NavigationContainer>
      <ImagesProvider>
        <TagsProvider>
          <Routes />
        </TagsProvider>
      </ImagesProvider>
    </NavigationContainer>
  );
}
