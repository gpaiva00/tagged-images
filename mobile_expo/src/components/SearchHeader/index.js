import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function Default({ 
  handleSubmitSearch, handleSearch, handleNavigateBack
}) {

  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.header}>
      {/* <View style={styles.headerPageContent}> */}
      <TouchableOpacity
        onPress={handleNavigateBack}>
        <MaterialIcons
          name="chevron-left"
          size={30}
          style={[styles.headerPageIcon, styles.headerIcons]}>
          </MaterialIcons>
      </TouchableOpacity>
      {/* </View> */}
      
      {/* <View style={styles.headerOptionsContent}> */}
        <TextInput
          style={styles.searchInputText}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          placeholder='Alegria, Paz, Felicidade...'
          maxLength={30}
          onSubmitEditing={() => handleSearch(searchText)}
          clearButtonMode='always'
        />
        <TouchableOpacity
          onPress={handleSubmitSearch}
          style={styles.headerButtons}
        >
          <MaterialIcons 
            name='check-circle' 
            size={30} 
            style={[styles.headerIcons, styles.checkButton]}>
          </MaterialIcons>
        </TouchableOpacity>
      {/* </View> */}
    </View>
  );
}