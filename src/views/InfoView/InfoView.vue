<script setup lang="ts">
import BirhdayIcon from '@/components/icons/IconBirhday.vue'
import PlayIcon from '@/components/icons/IconPlay.vue'
import { studentsDb } from '@/assets/storeUtils/students'
import { computed } from 'vue';
const avatar = computed(() => {
  try {
    return studentsDb.currentInfo.Avatars[studentsDb.currentInfo.cnt]
  } catch (error) {
    return ''
  }
})
</script>

<template>
  <main class="student-info">
    <div v-if="studentsDb.currentInfo">
      <RouterLink class="student-info__play" :to="{ path: '/chat', query: { id: studentsDb.currentInfo.Id } }">
        <PlayIcon class="icon play" />
      </RouterLink>
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
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/css/icons.scss';
@import './info-view.scss';
</style>
