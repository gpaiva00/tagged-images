<template>
  <v-app>
    <admin-app-menu
      @toggleUploadModal="handleToggleUploadModal"
      @toggleProfileModal="handleToggleProfileModal"/>

    <v-content>
      <!-- search field -->
      <search-field @handleTagsInput="handleTagsInputFilter" />

      <!-- gallery -->
      <gallery :galleryImages="filteredImages" @handleClickImage="handleClickImage" />

      <!-- upload modal -->
      <upload-modal
        :dialog="toggleUploadModal"
        @fetchGallery="getGalleryImages"
        @toggleModal="handleToggleUploadModal"/>

      <edit-image-modal
        :dialog="toggleEditImageModal"
        :image="editImageData"
        @toggleModal="handleToggleEditImageModal"
        @fetchGallery="getGalleryImages"
      />

      <!-- profile modal -->
      <!-- <profile-modal
        :dialog="toggleProfileModal"
        @toggleModal="handleToggleProfileModal"/> -->
    </v-content>
  </v-app>
</template>

<script>
import AdminAppMenu from '../components/AdminAppMenu.vue';
import Gallery from '../components/Gallery.vue';
import UploadModal from '../components/UploadModal.vue';
import EditImageModal from '../components/EditImageModal.vue';
import SearchField from '../components/SearchField.vue';
import TagsAPI from '../API/Tags';
import GalleryAPI from '../API/Gallery';

export default {
  components: {
    AdminAppMenu,
    Gallery,
    UploadModal,
    SearchField,
    EditImageModal,
  },

  data: () => ({
    toggleUploadModal: false,
    toggleProfileModal: false,
    toggleEditImageModal: false,
    galleryImages: [],
    filteredImages: [],
    editImageData: {
      image: {
        thumb: {},
      },
    },
  }),

  mounted() {
    this.load();
  },

  methods: {
    load() {
      this.getGalleryImages();
      this.getTags();
    },
    getTags() {
      TagsAPI.list().then((response) => {
        const tags = response.data.map(({ text }) => ({ text }));
        this.$store.dispatch('settingTags', tags);
      });
    },
    getGalleryImages() {
      GalleryAPI.list()
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
      this.editImageData = image;
      this.toggleEditImageModal = true;

      // eslint-disable-next-line no-underscore-dangle
      // const imageIndex = this.selectedImages.findIndex(img => img._id === image._id);
      // eslint-disable-next-line no-underscore-dangle
      // const galleryImageItem = this.filteredImages.find(img => img._id === image._id);
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
    handleToggleProfileModal() {
      this.toggleProfileModal = !this.toggleProfileModal;
    },
    handleToggleLoginModal() {
      this.toggleLoginModal = !this.toggleLoginModal;
    },
    handleToggleEditImageModal() {
      this.editImageData = {
        image: {
          thumb: {},
        },
      };

      this.toggleEditImageModal = !this.toggleEditImageModal;
    },
  },
};
</script>
