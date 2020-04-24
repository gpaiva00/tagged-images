import React from 'react';
import { FlatList, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

import styles from './styles';

export default function ImagesList({ images, loadImages, handleImagePress }) {
  function renderCheck() {
    return (
      <Icon
        name='check-circle'
        size={35}
        style={styles.checkIcon}
      ></Icon>
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
          
          {image.selected && renderCheck()}
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