import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from  './styles';

export default function PresentationPreview({ 
  totalImages, isCreatingPresentation, handleSavePresentation
}) {

  function renderContent() {
    if (totalImages === 0)
     return (
      <View style={styles.noContentView}>
        <Text>Selecione as imagens</Text>
      </View>
     );
    
    return (
      <View style={styles.previewContainer}>
        <Text>{totalImages} {totalImages > 1 ? 'imagens' : 'imagem'}</Text>
        
        <TouchableOpacity
          style={styles.savePresentationButton}
          onPress={handleSavePresentation}
        >
          <MaterialIcons name='save' size={28} style={styles.saveIcon}></MaterialIcons>
        </TouchableOpacity>
      </View>
    );
  }

  if (isCreatingPresentation)
    return (
      <View style={styles.container}>
        {renderContent()}
      </View>
    )
  else return <></>
}