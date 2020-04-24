import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';

import api  from '../../services/api';

import styles from './styles';

export default function ChipList({ tagsFilter, filterImages }) {
  const [tags, setTags] = useState([]);

  async function loadTags() {
    const response = await api.get('tags');

    setTags(response.data);
  }

  function handleTagPress(text) {
    let newTagsFilter = JSON.parse(JSON.stringify(tagsFilter));
    let newTagsState = [...tags]; 
    
    // turns into array of tags
    newTagsFilter = newTagsFilter.split(',');
    
    const tagFilterIndex = newTagsFilter.findIndex(tag => tag === text);
    const tagIndex = newTagsState.findIndex(tag => tag.text === text);
    const { active = false } = newTagsState[tagIndex];
    
    // toggle color prop
    newTagsState[tagIndex] = { 
      ...tags[tagIndex], 
      active: !active
    };
    
    // toggle tag on array
    if (tagFilterIndex === -1) newTagsFilter = [...newTagsFilter, text]
    else newTagsFilter.splice(tagFilterIndex, 1);
    
    // remove empty tags
    newTagsFilter = newTagsFilter.filter(tag => tag !== '');
    
    setTags(newTagsState);
    filterImages(newTagsFilter);
  }

  useEffect(() => {
    loadTags();
  }, []);


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