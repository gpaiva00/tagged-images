import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import styles from './styles';

export default function ChipList({ tags, handleTagPress }) {
  return (
    <View style={styles.chipsList}>
      <FlatList
        data={tags}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item: tag }) => (
          <TouchableOpacity onPress={() => handleTagPress(tag.text)} style={styles.chip}>
            <Text style={styles.chipText}>{tag.text}</Text>
          </TouchableOpacity>
        )} />
    </View>
  );
}