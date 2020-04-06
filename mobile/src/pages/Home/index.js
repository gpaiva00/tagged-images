import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Header from '../../components/Header';
import ChipList from '../../components/ChipList';
import ImagesList from '../../components/ImagesList';

import api  from '../../services/api';

import styles from './styles';

export default function Home() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [total, setTotal] = useState(0);
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadImages() {
    if (loading) return;

    if (total > 0 && total === images.length) return;

    setLoading(true);

    const response = await api.get('images', {
      params: { page }
    });

    setImages([...images, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  async function loadTags() {
    const response = await api.get('tags');

    setTags(response.data);
  }

  useEffect(() => {
    loadImages();
    loadTags();
  }, [])

  return (
    <>
      <ChipList tags={tags} showTags={showTags}/>
      
      <View style={styles.container}>
        <ImagesList images={images} loadImages={loadImages}/>
      </View>

      <Header />
    </>
  );
}