import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import api  from '../../services/api';

import styles from './styles';

export default function Home() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
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

  function handleTagPress(text) {}

  useEffect(() => {
    loadImages();
    loadTags();
  }, [])

  return (
    <>
      <View style={styles.header}>
        <MaterialIcons name="image" size={28} style={styles.headerIcon}></MaterialIcons>
        <Text style={styles.headerTitle}>Imagens</Text>
      </View>

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
      
      <View style={styles.container}>
        <FlatList 
          data={images}
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
      
        {/* <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => {}} style={styles.navButton}>
            <MaterialIcons name="home" size={28}></MaterialIcons>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.navButton}>
            <MaterialIcons name="search" size={28}></MaterialIcons>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.navButton}>
            <MaterialIcons name="add" size={28}></MaterialIcons>
          </TouchableOpacity>
        </View> */}
      </View>
    </>
  );
}