<script setup lang="ts">
import MomoIcon from '../components/icons/IconMomo.vue'
</script>

<template>
  <div class="default-layout">
    <v-app-bar :elevation="2" color="primary">
      <template v-slot:prepend>
        <MomoIcon class="default-layout-icon"></MomoIcon>
      </template>

      <v-app-bar-title>MomoTalk</v-app-bar-title>
    </v-app-bar>
    <v-main style="height: 100vh;background-color: #f3f7f8;">
      <slot></slot>
    </v-main>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  &-icon {
    width: 24px;
    height: 24px;
    margin-left: 10px;
  }

  :deep(.v-toolbar-title__placeholder) {
    color: #fff;
    font-family: Nunito, sans-serif;
    font-weight: 1000;
    font-size: 32px;
    user-select: none;
  }
}
</style>
