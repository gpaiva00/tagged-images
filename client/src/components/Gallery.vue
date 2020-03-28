<template>
  <v-container fluid>
    <div class="gallery-image">
      <div
        v-for="(image, index) in galleryImages"
        :key="index"
        @click="handleClickImage(image)"
        class="img-box">
        <img
          :class="{ selected: image.selected === true }"
          :src="image.image.image.url"
          :lazy-src="image.image.thumb.url" />
        <div class="transparent-box">
          <div class="caption">
            <v-chip
              v-for="(tag, index) in image.tags"
              :key="index"
              class="ma-2"
              color="secondary"
              label
              small
              text-color="white"
            >
              <v-icon left>mdi-label</v-icon>
              {{ tag }}
            </v-chip>
            <!-- <p class="headline">{{ image.tags.join(',') }}</p> -->
            <!-- <p>{{ image.image.image.name }}</p> -->
            <!-- <p class="opacity-low">{{ image.tags.join(',') }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  components: {},
  props: {
    creatingPresentation: Boolean,
    galleryImages: Array,
  },
  data: () => ({
    selectedImages: [],
  }),
  methods: {
    handleClickImage(image) {
      this.$emit('handleClickImage', image);
    },
  },
};
</script>

<style lang="scss">
$imageWidth: 370px;
$imageHeight: 290px;
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.selected {
  opacity: 0.2;
}

.gallery-image {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-image img {
  height: $imageHeight;
  width: $imageWidth;
  transform: scale(1);
  transition: transform 0.4s ease;
}

.img-box {
  box-sizing: content-box;
  margin: 10px;
  height: $imageHeight;
  width: $imageWidth;
  overflow: hidden;
  display: inline-block;
  color: white;
  position: relative;
  background-color: white;
}

.caption {
  position: absolute;
  bottom: 5px;
  left: 20px;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.transparent-box {
  height: $imageHeight;
  width: $imageWidth;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  transition: background-color 0.3s ease;
}

.img-box:hover img {
  transform: scale(1.1);
}

.img-box:hover .transparent-box {
  background-color: rgba(0, 0, 0, 0.5);
}

.img-box:hover .caption {
  transform: translateY(-20px);
  opacity: 1;
}

.img-box:hover {
  cursor: pointer;
}

.caption > p:nth-child(2) {
  font-size: 0.8em;
}

.opacity-low {
  opacity: 0.5;
}
</style>
