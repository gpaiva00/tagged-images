import React from 'react';
import { FlatList, Text, View, Image } from 'react-native';

import styles from './styles';

export default function ImagesList({ images, loadImages }) {
  return (
    <FlatList 
      data={images}
      keyExtractor={(item) => String(item._id)}
      showsHorizontalScrollIndicator={false}
      onEndReached={loadImages}
      onEndReachedThreshold={0.2}
      initialNumToRender={5}
      renderItem={({ item: image }) => (
        <Image
          style={styles.image}
          source={{ uri: image.image.image.url }}
          resizeMode='stretch'
        />
      )}
      ListEmptyComponent={
        <View style={styles.container}>
          <Text style={styles.noText}>Nenhuma imagem encontrada</Text>
        </View>
      }
    />
  );
}