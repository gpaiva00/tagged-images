import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDownloadResumable, documentDirectory } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { MaterialIcons } from '@expo/vector-icons';

import api  from '../../services/api';

import styles from  './styles';

export default function PresentationPreview({ 
  totalImages, isCreatingPresentation, handleCancelPresentation, setLoading, selectedImages
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

  async function uploadSelectedImages(images) {
    const response = await api.post('presentation', { images });

    return response;
  }

  async function handleSavePresentation() {
    try {
      setLoading(true);
      
      const { data: fileName } = await uploadSelectedImages(selectedImages);
      // const apiUrl = 'http://10.0.0.109:3333';
      const apiUrl = 'https://tagged-images.herokuapp.com';
      
      const fileUri = documentDirectory + fileName;
      const url = `${apiUrl}/download/${fileName}`;
      
      let downloadObject = createDownloadResumable(
        url,
        fileUri
      );
      
      let { status, uri } = await downloadObject.downloadAsync();
      
      if (status === 200) {
        handleCancelPresentation();
        shareDownloadFile(uri);
      }
      
      setLoading(false);
    } catch(err) {
      console.error('failed to download', err);
      setLoading(false);
    } 
  }

  async function shareDownloadFile(uri) {
    const isShareAvailable = await Sharing.isAvailableAsync();

    if (isShareAvailable) return Sharing.shareAsync(uri);
  }

  if (isCreatingPresentation)
    return (
      <View style={styles.container}>
        {renderContent()}
      </View>
    )
  else return <></>
}