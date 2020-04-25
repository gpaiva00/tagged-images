import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';

import Header from '../../components/Header';
import ChipList from '../../components/ChipList';
import ImagesList from '../../components/ImagesList';
import PresentationPreview from '../../components/PresentationPreview';
import Loader from '../../components/Loader';

import api  from '../../services/api';

import styles from './styles';

export default function Home({ navigation }) {
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

  function navigateToSearch() {
    navigation.navigate('Search');
  }

  useEffect(() => {
    loadImages();
  }, [tagsFilter]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <Header 
        isCreatingPresentation={isCreatingPresentation}
        setIsCreatingPresentation={setIsCreatingPresentation}
        handleCancelPresentation={handleCancelPresentation}
        navigateToSearch={navigateToSearch}/>
    
      <View style={styles.container}>
        <Loader loading={loading} />
        
        {/* <ChipList filterImages={filterImages} tagsFilter={tagsFilter} /> */}
        
        <ImagesList
          images={images}
          selectedImages={selectedImages}
          loadImages={loadImages}
          isCreatingPresentation={isCreatingPresentation}
          setImages={setImages}
          setSelectedImages={setSelectedImages}
          setSelectedImagesTotal={setSelectedImagesTotal}
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