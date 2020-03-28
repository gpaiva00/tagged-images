<template>
  <div class="overflow-hidden">
    <v-bottom-navigation
      height="70"
      fixed
      dark
      v-show="toggle"
    >
      <v-row class="ml-5">
        <p v-if="!selectedImages.length" class="headline ma-5 grey--text">
          Selecione as imagens
        </p>
        <div v-for="(image, index) in selectedImages" :key="index" class="mt-2">
          <v-avatar left size="3.5em">
            <v-img :src="getImageUrl(image)"></v-img>
          </v-avatar>
          <v-icon v-if="showArrow(index, selectedImages)">mdi-chevron-right</v-icon>
        </div>
      </v-row>

      <v-row v-if="showDownloadOptions">
        <v-col cols="12">
          <v-combobox
            v-model="selectedDownloadOption"
            :items="downloadOptions"
            label="Selecione o formato para baixar"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-btn
        v-if="selectedImages.length"
        @click="handleSaveButton"
        :disabled="showDownloadOptions && selectedDownloadOption.length ===0"
        right>
        <span>{{ showDownloadOptions ? 'Baixar' : 'Finalizar' }}</span>
        <v-icon>{{ showDownloadOptions ? 'mdi-download' : 'mdi-check' }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import Pptxgen from 'pptxgenjs';

export default {
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
    selectedImages: Array,
  },
  data: () => ({
    showDownloadOptions: false,
    selectedDownloadOption: '',
    downloadOptions: ['Power Point'],
  }),
  methods: {
    showArrow(index, selectedImages) {
      return index + 1 !== selectedImages.length;
    },
    handleSaveButton() {
      // when click to download
      if (this.showDownloadOptions) {
        this.createPresentation();
        return;
      }
      // when click to save
      this.showDownloadOptions = true;
    },
    createPresentation() {
      // eslint-disable-next-line default-case
      switch (this.selectedDownloadOption) {
        case 'Power Point':
          this.createPptxPresentation();
          break;
      }
    },
    createPptxPresentation() {
      const pptGen = new Pptxgen();
      pptGen.company = 'JW';
      pptGen.title = 'Teste de Apresentação';

      // add first default slide image
      this.addDefaultSlideImage(pptGen);
      // add other images
      this.selectedImages.forEach((image) => {
        const slide = pptGen.addSlide();
        const imageUrl = this.getImageUrl(image);
        // set image config
        slide.addImage({
          path: imageUrl,
          w: '100%',
          h: '100%',
          sizing: {
            type: 'cover',
            w: '100%',
            h: '100%',
          },
        });

        // add default slide image
        this.addDefaultSlideImage(pptGen);
      });

      pptGen.writeFile('JWI presentation.pptx')
        .then(() => {
          this.$emit('toggle');
          this.showDownloadOptions = false;
        })
        .catch(() => this.$toggleNotification({
          text: 'Desculpe, houve um erro ao criar sua apresentação.',
          color: 'error',
        }));
    },
    addDefaultSlideImage(pptGen) {
      const slide = pptGen.addSlide();

      slide.addImage({
        path: 'https://i.ibb.co/q96c55J/texto-do-ano-2020.jpg',
        w: '100%',
        h: '100%',
        sizing: {
          type: 'cover',
          w: '100%',
          h: '100%',
        },
      });
    },
    getImageUrl(image) {
      return image.image.image.url;
    },
  },
  watch: {
    toggle(value) {
      if (value === false) this.showDownloadOptions = false;
    },
  },
};
</script>
