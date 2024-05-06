<script setup lang="ts">
import { onMounted } from 'vue';
import BirhdayIcon from '@/components/icons/IconBirhday.vue'
import PlayIcon from '@/components/icons/IconPlay.vue'
import { studentsDb } from '@/assets/storeUtils/students'
import { getMessage } from '@/assets/utils/request'
import PlayerDialog from '@/components/PlayerWindow.vue'
import { computed } from 'vue'
import { store } from '@/assets/storeUtils/store'
import { useRoute } from 'vue-router';
const route = useRoute()
const avatar = computed(() => {
  try {
    return studentsDb.currentInfo.Avatars[studentsDb.currentInfo.cnt]
  } catch (error) {
    return ''
  }
})
onMounted(async () => {
  store.storyKey = route.params.id
  store.storyList = (await getMessage(route.params.id, 'index')) as {}
  if (store.storyList) {
    if (!Object.keys(store.storyList).find((ele) => ele === store.storyFile))
      store.storyFile = Object.keys(store.storyList)[0]
  }
})
function handleChat() {
  store.showPlayerDialog = true

}
</script>

<template>
  <div class="student-info">
    <div v-if="studentsDb.currentInfo">
      <a class="student-info__play" @click="handleChat">
        <PlayIcon class="icon play" />
      </a>
      <div class="student-info__avatar">
        <img :src="avatar" />
      </div>
      <div class="student-info__name">{{ studentsDb.currentInfo.Name }}</div>
      <div class="student-info__bio">{{ studentsDb.currentInfo.Bio }}</div>
      <div class="student-info__birthday">
        <BirhdayIcon style="margin-left: 10px" />
        <p style="margin-right: 10px">{{ studentsDb.currentInfo.Birthday }}</p>
      </div>
    </div>
    <div v-else style="display: flex; align-items: center; justify-content: center">
      {{ $t('selectInfo') }}
    </div>
    <PlayerDialog></PlayerDialog>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/icons.scss';
@import './info-view.scss';
</style>
