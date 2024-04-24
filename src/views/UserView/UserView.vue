<script setup lang="ts">
import { getStudents } from '@/assets/utils/request.ts'
import { ref, onMounted } from 'vue'
const searchText = ref('')
const database = ref(null)
onMounted(async () => {
  let res = await getStudents('zh')
  database.value = res[0]
})
</script>

<template>
  <div class="user-list">
    <div id="listcard__header">
      <div class="search-group">
        <!-- <SearchIcon class="icon search-group__icon" /> -->
        <input
          type="text"
          placeholder="Type / to search"
          class="search-group__text"
          v-model="searchText"
          id="searchBox"
        />
      </div>
    </div>

    <div id="listbody">
      <div
        class="list-item"
        v-for="(item, index) in database"
        :key="index"
        :class="{ active: false }"
      >
        <div class="list-item__avatar" @click.stop="">
          <img v-lazy="item.Avatars[item.cnt]" />
          <button :class="true ? 'minus' : 'add'" v-if="item.Avatars.length > 2"></button>
        </div>
        <span class="list-item__name">{{ item.Name }}</span>
        <span class="list-item__bio">{{ item.Bio }}</span>
        <div class="list-item__mark" v-if="item.School" @click.stop="">
          <!-- <img v-lazy="getSchaleSchoolIcon(item.School)" /> -->
        </div>
        <div class="list-item__avatars" @click.stop="" v-show="false">
          <img v-for="(avatar, index) in item.Avatars" :key="index" v-lazy="avatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './user-view.scss';
</style>
