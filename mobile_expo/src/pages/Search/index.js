import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import SearchHeader from '../../components/SearchHeader';
import ChipList from '../../components/ChipList';

import api  from '../../services/api';

import styles from './styles';
import { TagsContext } from '../../../TagsContext';
import { ImagesContext } from '../../../ImagesContext';

export default function Search({ navigation }) {
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags, tags, setTags] = useContext(TagsContext);
  const [applyFilter, setApplyFilter] = useContext(ImagesContext);
  
  async function loadTags() {
    let allTags = [];

    // use tags from state
    if (tags.length) allTags = tags;
    // or fetch tags again
    else allTags = await api.get('tags').then(res => res.data);
    
    setTags(allTags);
    setFilteredTags(allTags);
  }

  function handleSelectTag(tag) {
    const { _id: selectedTagId } = tag;
    
    const newTags = tags.map(originalTag => {
      if (originalTag._id === selectedTagId) originalTag.hide = true

      return originalTag;
    });

    setSelectedTags(selectedTags => ([...selectedTags, tag]));
    setTags(newTags);
  }

  function handleRemoveTag(selectedTagIndex, tagId) {
    const newSelectedTags = [...selectedTags];
    const newTags = [...tags];

    newSelectedTags.splice(selectedTagIndex, 1);

    const originalTagIndex = newTags.findIndex(tag => tag._id === tagId);
    
    newTags[originalTagIndex].hide = false;
    
    setSelectedTags(newSelectedTags);
    setTags(newTags);
  }

  function handleSearch(searchText) {
    if (!searchText.length) return setFilteredTags(tags);
    // trim
    const searchTerms = searchText.split(',').map(s => s.trim().toLowerCase());
    let newFilteredTags = [];

    searchTerms.forEach(term => {
      const tag = tags.filter(filteredTag => 
        filteredTag.text.toLowerCase().includes(term)
      );
      
      if (tag) newFilteredTags.push(...tag);
    });
      
    setFilteredTags(newFilteredTags);
  }

  function renderListItem(tag) {
    if ('hide' in tag && tag.hide === true) return;
    
    return (
      <TouchableOpacity
        onPress={() => handleSelectTag(tag)}
      >
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{tag.text}</Text>
          
          <MaterialIcons 
            name='chevron-right' 
            style={styles.listItemIcon}
            size={20}>
          </MaterialIcons>
        </View>
      </TouchableOpacity>
    )
  }

  function handleSubmitSearch() {
    setApplyFilter(true);
    navigation.navigate('Home');
  }

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SearchHeader 
        handleSearch={handleSearch}
        handleNavigateBack={() => navigation.navigate('Home')}
        handleSubmitSearch={handleSubmitSearch}/>
      
      <View styles={styles.container}>
        {/* list of selected filters */}
        <ChipList 
          selectedTags={selectedTags} 
          handleRemoveTag={handleRemoveTag} 
          showRemoveButton={true}/>

        <FlatList
          data={filteredTags}
          keyExtractor={item => String(item._id)}
          style={styles.list}
          renderItem={({ item: tag, index }) => renderListItem(tag, index)}
          ListEmptyComponent={
            <View style={styles.container}>
              <Text style={styles.noText}>Nenhuma tag encontrada</Text>
            </View>
          }
        />
        
      </View>
    </>
  )
}