import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

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
        <Icon name='slideshow' size={28} style={styles.headerIcons}></Icon>
      </TouchableOpacity>
     );
    
     return (
      <TouchableOpacity
        onPress={handleCancelPresentation}
        style={styles.headerButtons}
      >
        <Icon name='cancel' size={28} style={styles.cancelIcon}></Icon>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerPageContent}>
        <Icon
          name="image"
          size={28}
          style={[styles.headerPageIcon, styles.headerIcons]}>
          </Icon>

        <Text style={styles.headerTitle}>Imagens</Text>
      </View>
      
      <View style={styles.headerOptionsContent}>
        {renderTogglePresentationButton()}
      </View>
    </View>
  );
}