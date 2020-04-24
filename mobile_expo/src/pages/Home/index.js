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

    const { data, headers } = await api.get('images', {
      params: { page, tags: tagsFilter }
    });
    

    let imagesResult = images;
    let imagesResponse = reCheckSelectedImages(data);

    if (isFiltering) {
      imagesResult = [];
      setIsFiltering(false);
    }

    setImages([...imagesResult,...imagesResponse]);
    setTotal(Number(headers['x-total-count']));
    setPage(page + 1);
    setLoading(false);
  }

  function filterImages(tagsFilter) {
    setTagsFilter(tagsFilter.join(','));
    setTotal(0);
    setIsFiltering(true);
    setPage(1);
    setLoading(false);
  }

  function handleImagePress({ image }) {
    if (!isCreatingPresentation) return;

    let newSelectedImages = [...selectedImages];
    let newImages = [...images];
    const { _id: imageId, image: { image: { url: imageUrl } } } = image;

    /**
     * Set prop 'selected' to images array
     */
    const imageIndex = newImages.findIndex(img => img._id === imageId);
    const { selected = false } = newImages[imageIndex];

    newImages[imageIndex] = {
      ...images[imageIndex],
      selected: !selected
    }
    
    /**
     * Toggle selected images array
     */
    const selectedImageIndex = newSelectedImages.findIndex(selectedImage => 
      selectedImage._id === imageId);
    
    if (selectedImageIndex === -1) {
      newSelectedImages = [
        ...newSelectedImages,
        {
          _id: imageId,
          url: imageUrl
        }
      ];
    } else newSelectedImages.splice(selectedImageIndex, 1); 

    const total = newSelectedImages.length
    
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

  function reCheckSelectedImages(images) {
    const newImages = images.map(image => {
      const imageIndex = selectedImages.findIndex(selectedImage =>
        selectedImage._id === image._id) 
      const isSelected = imageIndex !== -1;
      
      if (isSelected) {
        image.selected = true;
      }

      return image;
    });
  
    return newImages;
  }

  useEffect(() => {
    loadImages();
  }, [tagsFilter]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <Header 
        isCreatingPresentation={isCreatingPresentation}
        handleCreatePresentation={handleCreatePresentation}
        handleCancelPresentation={handleCancelPresentation}/>
    
      <View style={styles.container}>
        <Loader loading={loading} />
        
        <ChipList filterImages={filterImages} tagsFilter={tagsFilter} />
        
        <ImagesList
          images={images}
          selectedImages={selectedImages}
          loadImages={loadImages}
          handleImagePress={handleImagePress}
        />

        <PresentationPreview
          selectedImages={selectedImages}
          totalImages={selectedImagesTotal}
          isCreatingPresentation={isCreatingPresentation}
          handleCancelPresentation={handleCancelPresentation}
          setLoading={setLoading}/>
      </View>
    </>
  );
}