import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';

import Header from '../../components/Header';
import ChipList from '../../components/ChipList';
import ImagesList from '../../components/ImagesList';
import PresentationPreview from '../../components/PresentationPreview';
import Loader from '../../components/Loader';

import api  from '../../services/api';

import styles from './styles';

export default function Home() {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsFilter, setTagsFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedImagesTotal, setSelectedImagesTotal] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCreatingPresentation, setIsCreatingPresentation] = useState(false);

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

  function handleImagePress({ image }) {
    if (!isCreatingPresentation) return;

    // console.log({ image });
    let newSelectedImages = [...selectedImages];
    let newImages = [...images];

    /**
     * Set prop 'selected' to images array
     */
    const imageIndex = newImages.findIndex(img => img._id === image._id);
    const { selected = false } = newImages[imageIndex];

    newImages[imageIndex] = {
      ...images[imageIndex],
      selected: !selected
    }
    
    /**
     * Toggle selected images array
     */
    const selectedImageIndex = newSelectedImages.findIndex(selectedImage => 
      selectedImage._id === image._id);
    
    if (selectedImageIndex === -1) newSelectedImages = [...newSelectedImages, image];
    else newSelectedImages.splice(selectedImageIndex, 1); 

    const total = newSelectedImages.length

    console.log(total);
    
    setSelectedImages(newSelectedImages);
    setImages(newImages);
    setSelectedImagesTotal(total);
  }

  function handleCreatePresentation() {
    setIsCreatingPresentation(true);
  }

  function handleCancelPresentation() {
    // deselect images
    const newImages = images.map(image => {
      (image || {}).selected = false;

      return image;
    });
    
    setImages(newImages);
    setSelectedImages([]);
    setSelectedImagesTotal(0);
    setIsCreatingPresentation(false);
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

      <Header 
        isCreatingPresentation={isCreatingPresentation}
        handleCreatePresentation={handleCreatePresentation}
        handleCancelPresentation={handleCancelPresentation}/>
    
      <View style={styles.container}>
        <Loader loading={loading} />
        
        <ChipList tags={tags} handleTagPress={handleTagPress}/>
        
        <ImagesList
          images={images} 
          loadImages={loadImages}
          handleImagePress={handleImagePress}
        />

        <PresentationPreview 
          totalImages={selectedImagesTotal}
          isCreatingPresentation={isCreatingPresentation}/>
      </View>
    </>
  );
}