<template>
  <div>
  <!-- <v-app> -->
    <!-- menu bar -->
    <app-menu
      @toggleUploadModal="handleToggleUploadModal"
      @presentationButton="handleClickPresentationButton"
      :togglePresentationPreview="togglePresentationPreview"
    />

    <v-content>
      <!-- search field -->
      <search-field @handleTagsInput="handleTagsInputFilter"/>

      <!-- gallery -->
      <gallery
        :galleryImages="filteredImages"
        :creatingPresentation="togglePresentationPreview"
        @handleClickImage="handleClickImage"/>

      <!-- upload modal -->
      <upload-modal
        :dialog="toggleUploadModal"
        @fetchGallery="getGalleryImages"
        @toggleModal="handleToggleUploadModal"/>

      <!-- preview -->
      <presentation-preview
        @toggle="resetPreview"
        :toggle="togglePresentationPreview"
        :selectedImages="selectedImages"/>

    </v-content>
  </div>
  <!-- </v-app> -->
</template>

<script>
import axios from 'axios';
import UploadModal from '../components/UploadModal.vue';
import SearchField from '../components/SearchField.vue';
import Gallery from '../components/Gallery.vue';
import PresentationPreview from '../components/PresentationPreview.vue';
import AppMenu from '../components/AppMenu.vue';

export default {
  name: 'Home',

  components: {
    UploadModal,
    PresentationPreview,
    Gallery,
    SearchField,
    AppMenu,
  },

  data: () => ({
    toggleUploadModal: false,
    togglePresentationPreview: false,
    galleryImages: [],
    filteredImages: [],
    selectedImages: [],
  }),

  mounted() {
    this.load();
  },

  methods: {
    load() {
      this.getGalleryImages();
      this.fetchTags();
    },
    fetchTags() {
      const apiUrl = `${process.env.VUE_APP_JSON_API}/tags?limit=1000`;

      axios
        .get(apiUrl)
        .then((res) => {
          const tags = res.data.map(({ text }) => ({ text }));
          this.$store.dispatch('settingTags', tags);
        });
    },
    getGalleryImages() {
      const apiUrl = `${process.env.VUE_APP_JSON_API}/images`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.galleryImages = response.data;
          this.filteredImages = response.data;
        })
        .catch(() => {
          this.$toggleNotification({
            text: 'Desculpe, houve um erro ao tentar buscar a galeria.',
            color: 'error',
          });
        });
    },
    handleClickImage(image) {
      if (!this.togglePresentationPreview) return;
      // eslint-disable-next-line no-underscore-dangle
      const imageIndex = this.selectedImages.findIndex(img => img._id === image._id);
      // eslint-disable-next-line no-underscore-dangle
      const galleryImageItem = this.filteredImages.find(img => img._id === image._id);

      if (imageIndex !== -1) {
        galleryImageItem.selected = false;
        this.selectedImages.splice(imageIndex, 1);
      } else {
        // eslint-disable-next-line no-param-reassign
        galleryImageItem.selected = true;
        this.selectedImages.push(image);
      }
    },
    handleClickPresentationButton() {
      if (this.togglePresentationPreview) {
        this.resetPreview();
        return;
      }

      this.togglePresentationPreview = true;
    },
    handleTagsInputFilter(filters) {
      if (!filters.length) {
        this.filteredImages = this.galleryImages;
        return;
      }

      const { galleryImages } = this;
      const newFilteredImages = [];

      filters.forEach((filter) => {
        galleryImages.forEach((image) => {
          // eslint-disable-next-line no-underscore-dangle
          const imageDuplicated = newFilteredImages.findIndex(img => img._id === image._id) !== -1;
          // eslint-disable-next-line no-plusplus
          if (image.tags.includes(filter) && !imageDuplicated) newFilteredImages.push(image);
        });
      });

      this.filteredImages = newFilteredImages;
    },
    handleToggleUploadModal() {
      this.toggleUploadModal = !this.toggleUploadModal;
      // this.$store.dispatch('clearFields', false);
    },
    resetPreview() {
      this.togglePresentationPreview = false;

      this.selectedImages = [];

      this.resetSelectedImages();
    },
    resetSelectedImages() {
      const galleryImages = this.filteredImages.map((image) => {
        // eslint-disable-next-line no-param-reassign
        image.selected = false;

        return image;
      });

      this.filteredImages = galleryImages;
    },
  },
};
</script>
