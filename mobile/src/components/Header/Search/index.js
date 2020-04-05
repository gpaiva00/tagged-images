import React from 'react';
import { View, TextInput, TouchableOpacity, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function Header({ handleClosePress }) {
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="image"
        size={28}
        style={[styles.headerPageIcon, styles.headerIcons]}>
        </MaterialIcons>
        
        <View style={styles.searchContent}>
          <TextInput
            style={styles.searchField}
            autoFocus={true}>
          </TextInput>
        </View>
      
      <View style={styles.headerOptionsContent}>
        <TouchableOpacity onPress={handleClosePress} style={styles.headerSearchButton}>
          <MaterialIcons name='close' size={28} style={styles.headerIcons}></MaterialIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}