<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import MomoIcon from '../components/icons/IconMomo.vue'
import StudentIcon from '../components/icons/IconStudent.vue'
import MessageIcon from '../components/icons/IconMessage.vue'
import IconTrends from '../components/icons/IconTrends.vue'
const route = useRoute()
const router = useRouter()

function handleNav(link: string) {
  router.push(link)
}
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
    <v-bottom-navigation
      :model-value="route.name"
      height="88"
      grow
      bg-color="#4b5a6f"
      color="grey-lighten-4"
      active
    >
      <v-btn @click="handleNav('/chat')">
        <MessageIcon></MessageIcon>
      </v-btn>
      <v-btn @click="handleNav('/user')">
        <StudentIcon></StudentIcon>
      </v-btn>
      <v-btn @click="handleNav('/trends')">
        <IconTrends></IconTrends>
      </v-btn>
    </v-bottom-navigation>
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
