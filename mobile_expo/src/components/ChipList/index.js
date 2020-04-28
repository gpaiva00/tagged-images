import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChipList({ 
  selectedTags, filterImages, handleRemoveTag, showRemoveButton = false
}) {
  
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

  if(!selectedTags.length) return <></>
  else
    return (
      <View style={styles.chipsList}>
        <FlatList
          data={selectedTags}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item: tag, index }) => (
            <View
              style={styles.chip}
              underlayColor='#7159c1'
            >
              
              <Text style={[ styles.chipText, tag.active && styles.activeChipText ]}>
                {tag.text}
              </Text>

              {showRemoveButton && (
                <TouchableOpacity
                  onPress={() => handleRemoveTag(index, tag._id)}
                  style={{ paddingStart: 10 }}
                >
                  <MaterialIcons name='cancel' size={15} style={{ color: '#fff' }}>
                  </MaterialIcons>
                </TouchableOpacity>
              )}
              
            </View>
          )} />
      </View>
    );
}