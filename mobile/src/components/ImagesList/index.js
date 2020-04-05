import React from 'react';
import { FlatList, View, Image } from 'react-native';

import styles from './styles';

export default function ImagesList({ images, loadImages }) {
  return (
    <FlatList 
      data={images}
      style={{ paddingTop: 10 }}
      keyExtractor={(item) => String(item._id)}
      showsHorizontalScrollIndicator={false}
      onEndReached={loadImages}
      onEndReachedThreshold={0.2}
      renderItem={({ item: image }) => (
        <Image
          style={styles.image}
          source={{ uri: image.image.image.url }}
          resizeMode='stretch'
        />
      )}
    />
  );
}