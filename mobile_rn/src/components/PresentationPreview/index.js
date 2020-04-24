import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

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
        <Text>{totalImages} imagens</Text>
        
        <TouchableOpacity
          style={styles.savePresentationButton}
          onPress={handleSavePresentation}
        >
          <Icon name='save' size={28} style={styles.saveIcon}></Icon>
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