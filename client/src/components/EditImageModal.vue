<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
         <v-card-text>
            <!-- preview -->
            <image-preview :src="previewUrl" :width="250"/>
            <!-- tags -->
            <tags-input
              :imageTags="tags"
              @handleTagsInput="tags => imageTags = tags"
            />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="handleDeleteImage">Deletar Foto</v-btn>
          <v-btn color="secondary darken-1" text @click="handleCancel">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="handleSave">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable func-names */
/* eslint-disable quote-props */
import ImagePreview from './ImagePreview.vue';
import TagsInput from './TagsInput.vue';
import GalleryAPI from '../API/Gallery';
import TagsAPI from '../API/Tags';

export default {
  components: {
    ImagePreview,
    TagsInput,
  },

  props: {
    image: Object,
    dialog: Boolean,
  },

  data: () => ({
    imageTags: [],
  }),

  methods: {
    handleCancel() {
      this.imageTags = [];
      this.$emit('toggleModal');
    },
    handleDeleteImage() {
      // eslint-disable-next-line no-underscore-dangle
      const imageId = this.image._id;
      this.deleteImage(imageId)
        .then(() => {
          this.$emit('fetchGallery');
          this.handleCancel();
        });
    },
    handleSave() {
      // eslint-disable-next-line no-unused-vars
      const { image: { _id }, imageTags, imageTagsComputed } = this;

      // notify when there is no images or tags
      if (!imageTags.length) {
        return this.$toggleNotification({
          text: 'Adicione pelo menos uma tag!',
          color: 'info',
        });
      }

      // eslint-disable-next-line no-underscore-dangle
      return this.updateImage(_id, imageTagsComputed);
    },
    updateImage(id, imageTags) {
      // eslint-disable-next-line no-underscore-dangle
      GalleryAPI.update(id, imageTags)
        .then((response) => {
          if (response.status === 200) {
            this.saveNewTags();
            // reset modal preview and inputs
            this.handleCancel();
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
    saveImage(image) {
      GalleryAPI.create(image)
        .then((response) => {
          if (response.status === 200) {
            this.saveNewTags();
            // reset modal preview and inputs
            this.handleCancel();
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
    async deleteImage(id) {
      return GalleryAPI.delete(id);
    },
    saveNewTags() {
      // if user inputs a new tag, save it on db
      const savedTags = this.$store.state.tags.map(tag => tag.text);
      // filter new tags
      let newTags = this.imageTagsComputed.filter(newTag => savedTags.indexOf(newTag) === -1);
      // add text key to final object
      newTags = newTags.map(tag => ({ text: tag }));
      console.log(newTags);
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
  },

  computed: {
    imageTagsComputed() {
      // capitalizes tag text
      return this.imageTags
        .map(tag => tag
          .toLowerCase()
          .split(' ')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' '));
    },
    previewUrl() {
      const { image: { thumb: { url = '' } } } = this.image;

      return [url];
    },
    tags() {
      const { tags } = this.image;
      return tags;
    },
  },

  watch: {
    'image': function (value) {
      if ('tags' in value) {
        this.imageTags = value.tags;
      }
    },
  },
};
</script>
