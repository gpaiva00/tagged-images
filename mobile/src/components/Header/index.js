import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function Default() {

  function handleCreatePresentation() {

  }

  function handleCancelPresentation() {}

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
        <TouchableOpacity
          onPress={handleCreatePresentation}
          style={styles.headerSearchButton}
        >
          <MaterialIcons name='slideshow' size={28} style={styles.headerIcons}></MaterialIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}