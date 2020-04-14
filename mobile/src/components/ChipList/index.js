import React from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';

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
          <TouchableHighlight
            style={[ styles.chip, tag.active && styles.activeChip ]}
            underlayColor='#7159c1'
            onPress={() => handleTagPress(tag.text)}>
            <Text style={[ styles.chipText, tag.active && styles.activeChipText ]}>
              {tag.text}
            </Text>
          </TouchableHighlight>
        )} />
    </View>
  );
}