import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function Default({ 
  isCreatingPresentation, handleCreatePresentation, handleCancelPresentation 
}) {

  function renderTogglePresentationButton() {
    if (!isCreatingPresentation) 
     return (
      <TouchableOpacity
        onPress={handleCreatePresentation}
        style={styles.headerButtons}
      >
        <MaterialIcons name='slideshow' size={28} style={styles.headerIcons}></MaterialIcons>
      </TouchableOpacity>
     );
    
     return (
      <TouchableOpacity
        onPress={handleCancelPresentation}
        style={styles.headerButtons}
      >
        <MaterialIcons name='cancel' size={28} style={styles.cancelIcon}></MaterialIcons>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerPageContent}>
        <MaterialIcons
          name="image"
          size={28}
          style={[styles.headerPageIcon, styles.headerIcons]}>
          </MaterialIcons>

        <Text style={styles.headerTitle}>Imagens</Text>
      </View>
      
      <View style={styles.headerOptionsContent}>
        {renderTogglePresentationButton()}
      </View>
    </View>
  );
}