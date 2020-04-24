import React from 'react';
import { FlatList, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

export default function ImagesList({
  images, 
  selectedImages, 
  loadImages, 
  setSelectedImages, 
  setImages, 
  setSelectedImagesTotal,
  isCreatingPresentation
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

  function handleImagePress({ image }) {
    if (!isCreatingPresentation) return;

    let newSelectedImages = [...selectedImages];
    let newImages = [...images];
    const { _id: imageId, image: { image: { url: imageUrl } } } = image;

    /**
     * Set prop 'selected' to images array
     */
    const imageIndex = newImages.findIndex(img => img._id === imageId);
    const { selected = false } = newImages[imageIndex];

    newImages[imageIndex] = {
      ...images[imageIndex],
      selected: !selected
    }

    /**
     * Toggle selected images array
     */
    const selectedImageIndex = newSelectedImages.findIndex(selectedImage =>
      selectedImage._id === imageId);

    if (selectedImageIndex === -1) {
      newSelectedImages = [
        ...newSelectedImages,
        {
          _id: imageId,
          url: imageUrl
        }
      ];
    } else newSelectedImages.splice(selectedImageIndex, 1);

    const total = newSelectedImages.length

    setSelectedImages(newSelectedImages);
    setImages(newImages);
    setSelectedImagesTotal(total);
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => String(item._id)}
      showsHorizontalScrollIndicator={false}
      onEndReached={loadImages}
      onEndReachedThreshold={0.2}
      windowSize={5}
      renderItem={({ item: image }) => (
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