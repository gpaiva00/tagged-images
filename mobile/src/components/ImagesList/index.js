import React from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function ImagesList({ images, loadImages, handleImagePress }) {
  function renderCheck() {
    return (
      <MaterialIcons
        name='check-circle'
        size={35}
        style={styles.checkIcon}
      ></MaterialIcons>
    );
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
        <TouchableOpacity
          onPress={() => handleImagePress({ image })}
        >
          <Image
            style={[styles.image, image.selected && styles.selected]}
            source={{ uri: image.image.image.url }}
            resizeMode='stretch'
          />

          {image.selected && renderCheck()}
        </TouchableOpacity>

      )}
      ListEmptyComponent={
        <View style={styles.container}>
          <Text style={styles.noText}>Nenhuma imagem encontrada</Text>
        </View>
      }
    />
  );
}