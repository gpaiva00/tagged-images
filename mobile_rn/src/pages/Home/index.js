import React, { useEffect, useState } from 'react';
import { View, StatusBar, Platform, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const { dirs: DIRS, unlink } = RNFetchBlob.fs;
import Share from 'react-native-share';

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

  async function uploadSelectedImages(images) {
    const response = await api.post('presentation', { images });

    return response;
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

  async function handleSavePresentation() {
    try {
      setLoading(true);
      
      const { data: fileName } = await uploadSelectedImages(selectedImages);
      // const apiUrl = 'http://10.0.0.109:3333';
      const apiUrl = 'https://tagged-images.herokuapp.com';
      const fetchUrl = `${apiUrl}/download/${fileName}`;


      await RNFetchBlob
        .config({
          fileCache: true,
          path: DIRS.DocumentDir + 'Apresentação.pptx'
        })
        .fetch('GET', fetchUrl)
        .then(shareDownloadFile)
        .then(handleCancelPresentation);        
      
      setLoading(false);
    } catch(err) {
      Alert.alert('Download', 'Desculpe, houve um erro ao tentar baixar o arquivo.')
      // console.error('failed to download', err);
      setLoading(false);
    } 
  }

  async function shareDownloadFile({ path, respInfo: { headers }}) {

    const filePath = Platform.OS === 'android' ? 'file://' + path() : path();
    const type = headers['Content-Type'];

    // console.log({ type, filePath });

    let options = {
      type,
      url: filePath
    };

    try {
      await Share.open(options);
      
      // remove the image or pdf from device's storage
      await unlink(filePath);
    } catch(err) {
      // console.log(err.message);
      
      if (err.message === 'User did not share')
        Alert.alert('Compartilhar', 'Compartilhamento cancelado.');
    }
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
          handleCancelPresentation={handleCancelPresentation}
        />

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
            isCreatingPresentation={isCreatingPresentation}
            handleSavePresentation={handleSavePresentation}
          />
        </View>
    
    </>
  );
}