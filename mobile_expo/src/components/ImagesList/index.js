import React from 'react';
import { FlatList, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

export default function ImagesList({ 
  images, selectedImages, loadImages, handleImagePress
 }) {

  function renderCheck(number) {
    return (
      // <MaterialIcons
      //   name='check-circle'
      //   size={35}
      //   style={styles.checkIcon}
      // >
      // </MaterialIcons>
      <View style={styles.checkView}>
        <Text style={styles.checkText}>{number}</Text>
      </View>
    );
  }

  function getSelectedImageIndex(imageId) {
    const imageIndex = selectedImages.findIndex(image => image._id === imageId);

    return imageIndex + 1;
  }

  return (
    <FlatList 
      data={images}
      keyExtractor={(item) => String(item._id)}
      showsHorizontalScrollIndicator={false}
      onEndReached={loadImages}
      onEndReachedThreshold={0.2}
      windowSize={5}
      renderItem={({ item: image, index }) => (
        <>
          <TouchableWithoutFeedback
            onPress={() => handleImagePress({ image })}
          >
            <Image
              style={[styles.image, image.selected && styles.selected]}
              source={{ uri: image.image.image.url }}
              resizeMode='stretch'
            />
          </TouchableWithoutFeedback>
          
          {image.selected && renderCheck(getSelectedImageIndex(image._id))}
        </>
      )}
      ListEmptyComponent={
        <View style={styles.container}>
          <Text style={styles.noText}>Nenhuma imagem encontrada</Text>
        </View>
      }
    />
  );
}