<template>
  <v-app-bar color="#5F4E5F" dark app elevate-on-scroll >
        <v-icon>mdi-tooltip-image</v-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="mx-2">Images</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="menuBar">
        <v-menu
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on" class="mx-3">
              <v-icon>mdi-apps</v-icon>
            </v-btn>
          </template>

          <v-list v-if="!hideIcons">
            <!-- new photo -->
            <!-- <v-list-item @click="() => this.$emit('toggleUploadModal')">
            <v-list-item-icon><v-icon>mdi-camera</v-icon></v-list-item-icon>
              <v-list-item-title>Nova Foto</v-list-item-title>
            </v-list-item> -->

            <!-- presentation -->
            <v-list-item @click="() => this.$emit('presentationButton')">
            <v-list-item-icon>
              <v-icon v-if="!this.togglePresentationPreview">mdi-plus</v-icon>
            </v-list-item-icon>
              <v-list-item-title>
                {{this.togglePresentationPreview ? 'Cancelar' : 'Apresentação'}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div id="menuButtons">
        <!-- new photo -->
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon large @click="() => $emit('toggleUploadModal')" v-on="on">
              <v-icon>mdi-camera</v-icon>
            </v-btn>
          </template>
          <span>Nova Foto</span>
        </v-tooltip> -->
        <!-- presentation -->
        <v-tooltip v-if="!hideIcons" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              large
              class="ml-5"
              :color="togglePresentationPreview ? 'error' : ''"
              @click="() => $emit('presentationButton')"
              v-on="on"
            >
              <v-icon>
                {{ !togglePresentationPreview ? 'mdi-presentation' : 'mdi-close-circle' }}
              </v-icon>
              <!-- {{this.togglePresentationPreview ? 'Cancelar' : 'Apresentação'}} -->
            </v-btn>
          </template>
          <span>
            {{ this.togglePresentationPreview ? 'Cancelar' : 'Nova Apresentação' }}
          </span>
        </v-tooltip>
        <!-- avatar -->
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn @click="$emit('toggleProfileModal')" class="ml-5" icon v-on="on">
              <v-avatar color="purple lighten-2">
                <span class="white--text headline">GP</span>
              </v-avatar>
            </v-btn>
          </template>
          <span>Perfil</span>
        </v-tooltip> -->
      <!-- <profile-menu
        @toggleProfileModal="$emit('toggleProfileModal')"
        @toggleLoginModal="$emit('toggleLoginModal')"/> -->

      </div>
    </v-app-bar>
</template>

<script>
// import ProfileMenu from './ProfileMenu.vue';

export default {
  components: {
    // ProfileMenu,
  },
  props: {
    togglePresentationPreview: Boolean,
    hideIcons: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
  @media only screen and (min-width: 768px) {
    #menuBar {
      display: none;
    }
  }

  @media only screen and (max-width: 768px) {
    #menuButtons {
      display: none;
    }
  }
</style>
