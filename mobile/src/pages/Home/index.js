import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';

import Header from '../../components/Header';
import ChipList from '../../components/ChipList';
import ImagesList from '../../components/ImagesList';
import Loader from '../../components/Loader';

import api  from '../../services/api';

import styles from './styles';

export default function Home() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsFilter, setTagsFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadImages() {
    if (loading) return;

    if (total > 0 && total === images.length) return;

    setLoading(true);

    const response = await api.get('images', {
      params: { page, tags: tagsFilter }
    });
    

    let imagesResult = images;

    if (isFiltering) {
      imagesResult = [];
      setIsFiltering(false);
    }

    setImages([...imagesResult,...response.data]);
    setTotal(Number(response.headers['x-total-count']));
    setPage(page + 1);
    setLoading(false);
  }

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
    
    setTagsFilter(newTagsFilter.join(','));
    setTags(newTagsState);
    setTotal(0);
    setIsFiltering(true);
    setPage(1);
    setLoading(false);
  }

  useEffect(() => {
    loadImages();
  }, [tagsFilter]);

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <Header />
    
      <View style={styles.container}>
        <Loader loading={loading} />
        <ChipList tags={tags} handleTagPress={handleTagPress}/>
        <ImagesList images={images} loadImages={loadImages}/>
      </View>
    </>
  );
}