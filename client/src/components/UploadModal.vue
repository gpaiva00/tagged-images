<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <!-- <v-card-title class="headline text-capitalize">upload de nova foto</v-card-title> -->
        <!-- <v-card-subtitle>
          Faça upload de uma foto por vez e crie tags para elas
        </v-card-subtitle> -->
        <v-card-text>
          <!-- input -->
          <upload-image-input
            @handleImageInput="handleImageInput"
            :loadingPreview="loadingPreview"
            :clearFields="clearFields"/>
          <!-- preview -->
          <image-preview :src="previewUrl"/>
          <!-- tags -->
          <tags-input
            @handleTagsInput="tags => imageTags = tags"
            :clearFields="clearFields"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="resetModalFields">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="handleSave">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable func-names */
/* eslint-disable quote-props */
/* eslint-disable camelcase */
import TagsAPI from '../API/Tags';
import GalleryAPI from '../API/Gallery';
import UploadImageInput from './UploadImageInput.vue';
import ImagePreview from './ImagePreview.vue';
import TagsInput from './TagsInput.vue';

export default {
  props: {
    dialog: Boolean,
  },
  components: {
    UploadImageInput,
    ImagePreview,
    TagsInput,
  },
  data: () => ({
    formData: null,
    previewUrl: [],
    uploadedImages: [],
    loadingPreview: false,
    clearFields: false,
    imageTags: [],
  }),
  methods: {
    handleImageInput(files) {
      if (files[0]) {
        this.loadingPreview = true;

        const formData = new FormData();
        // Array.from(files).forEach((file) => {
        const fileReader = new FileReader();

        fileReader.addEventListener('loadend', (e) => {
          // append base64 data into formData
          formData.append('image', e.target.result.split(',')[1]);

          this.formData = formData;
          this.handleUploadImages();
        });

        fileReader.readAsDataURL(files[0]);
        // });
      }
    },
    handleUploadImages() {
      const data = this.formData;

      GalleryAPI.upload(data)
        .then((response) => {
          const {
            id, image, thumb, delete_url,
          } = response.data.data;

          // eslint-disable-next-line object-curly-newline
          this.uploadedImages.push({ id, image, thumb, delete_url });
          this.previewUrl.push({ image, thumb });
          this.loadingPreview = false;
        })
        .catch(() => {
          this.$toggleNotification({ text: 'Desculpe, houve um erro ao tentar salvar a imagem.' });
        });
    },
    handleSave() {
      this.clearFields = false;

      // notify when there is no images or tags
      if (!this.imageTags.length || !this.uploadedImages.length) {
        this.$toggleNotification({
          text: 'Adicione uma foto e pelo menos uma tag!',
          color: 'info',
        });
        return;
      }

      const requestBody = [];
      // create correct format of request body
      this.uploadedImages.forEach((image) => {
        const reqObject = {
          image,
          tags: this.imageTagsComputed,
          selected: false,
        };

        requestBody.push(reqObject);
      });

      GalleryAPI.create(requestBody)
        .then((response) => {
          if (response.status === 200) {
            this.saveNewTags();
            // reset modal preview and inputs
            this.resetModalFields();
            // refresh gallery
            this.$emit('fetchGallery');
          }
        })
        .catch(() => {
          this.$toggleNotification({
            text: 'Desculpe, houve um erro ao tentar salvar.',
            color: 'error',
          });
        });
    },
    saveNewTags() {
      // if user inputs a new tag, save it on db
      const savedTags = this.$store.state.tags.map(tag => tag.text);
      // filter new tags
      let newTags = this.imageTagsComputed.filter(newTag => savedTags.indexOf(newTag) === -1);
      // add text key to final object
      newTags = newTags.map(tag => ({ text: tag }));

      if (!newTags.length) return;

      TagsAPI.create(newTags)
        .then(({ status, data }) => {
          if (status === 200) {
            // sum new tags to existing tags on vuex
            const tags = [...this.$store.state.tags, ...data.map(({ text }) => ({ text }))];
            // save on vuex
            this.$store.dispatch('settingTags', tags);
          }
        })
        .catch(() => {
          this.$toggleNotification({
            text: 'Desculpe, houve um erro ao tentar salvar as tags.',
            color: 'error',
          });
        });
    },
    resetModalFields() {
      // variable used in tags input and modal
      this.previewUrl = [];
      this.imageTags = [];
      this.uploadedImages = [];
      this.$emit('toggleModal');
    },
  },
  computed: {
    imageTagsComputed() {
      try {
        // capitalizes tag text
        return this.imageTags
          .map(tag => tag
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' '));
      } catch (error) {
        return this.$toggleNotification({
          text: 'Desculpe, houve um erro ao tentar salvar. Tente novamente.',
          color: 'error',
        });
      }
    },
  },
  watch: {
    'dialog': function (value) {
      this.clearFields = !value;
    },
  },
};
</script>
