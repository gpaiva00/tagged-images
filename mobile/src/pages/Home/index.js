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

    console.log({ 
      total: response.headers['x-total-count'], 
      page, 
      images: response.data.length,
      isFiltering 
    });

    const imagesResult = isFiltering ? [] : images;

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
    let myTags = JSON.parse(JSON.stringify(tagsFilter));
    // turns into array of tags
    myTags = myTags.split(',');
    
    const tagIndex = myTags.findIndex(tag => tag === text);
    // toggle tag on array
    if (tagIndex === -1) myTags = [...myTags, text]
    else myTags.splice(tagIndex, 1);
    // remove empty tags
    myTags = myTags.filter(tag => tag !== '');
    
    setTagsFilter(myTags.join(','));
    setTotal(0);
    // setImages([]);
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