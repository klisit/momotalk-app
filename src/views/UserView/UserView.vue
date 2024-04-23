<script setup lang="ts"></script>

<template>
  <main class="user-list">
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
      <div
        class="student-list__button"
        @click="switchStudentList"
        title="Switch Student List"
      >
        <ListIcon class="icon list" />
      </div>
    </div>
    学生列表
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/css/icons.scss';
@import './user-view.scss';
</style>
