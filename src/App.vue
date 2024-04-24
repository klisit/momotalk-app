<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
let layoutName = computed(() => route.meta.layout + '-layout')
</script>

<template>
  <v-app>
    <component :is="layoutName" :key="layoutName">
      <RouterView />
    </component>
  </v-app>
</template>

<style scoped lang="scss"></style>
