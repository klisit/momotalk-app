<script setup lang="ts">
import ListIcon from '../../components/icons/IconList.vue'
import { getStudents, getSchaleSchoolIcon } from '../../assets/utils/request'
// import i18n from '@/locales/i18n'
import { baseStudent, studentInfo } from '@/assets/utils/interface'
import { ref, onMounted, watch } from 'vue'
import { store } from '@/assets/storeUtils/store'
import { talkHistory } from '@/assets/storeUtils/talkHistory'
import { search } from '@/assets/utils/search'
const database: any = ref([])
const dataDisplayIndex = ref<number>(0)
const dataDisplay = ref<studentInfo[]>()
onMounted(async () => {
  database.value = await getStudents(store.language)
  dataDisplay.value = database.value[dataDisplayIndex.value]
})
watch(dataDisplayIndex, async (flag: number) => {
  dataDisplay.value = database.value[flag]
})
const switchStudentList = () => {
  dataDisplayIndex.value = (dataDisplayIndex.value + 1) % database.value.length
  searchText.value = ''
  searchSchool.value = ''
  deactiveStudent()
}

// search and filter
const searchText = ref<string>('')
const searchSchool = ref<string>('')
watch(
  () => [searchText.value, searchSchool.value],
  () => {
    dataDisplay.value = search(
      database.value[dataDisplayIndex.value],
      searchText.value,
      searchSchool.value
    )
    deactiveStudent()
  }
)

// item in list
const studentSelected = ref<studentInfo | null>(null)
const student = ref<baseStudent | null>(null)
const selectStudent = (item: studentInfo) => {
  studentSelected.value = item
  student.value = {
    Id: studentSelected.value.Id,
    Name: studentSelected.value.Name,
    Avatar: studentSelected.value.Avatars[studentSelected.value.cnt]
  }
}
const deactiveStudent = () => {
  student.value = null
}
// multi-avatar student
const studentShowAvatars = ref<studentInfo | null>(null)
const showAvatars = (item: any) => {
  if (studentShowAvatars.value !== item) studentShowAvatars.value = item
  else studentShowAvatars.value = null
}
const selectAvatar = (item: studentInfo, index: number) => {
  studentSelected.value = item
  studentSelected.value.cnt = index
  student.value = {
    Id: studentSelected.value.Id,
    Name: studentSelected.value.Name,
    Avatar: studentSelected.value.Avatars[studentSelected.value.cnt]
  }
}

// languages
const changeLanguage = async () => {
  const languageList = i18n.global.availableLocales
  const currentLngIdx = languageList.findIndex((ele) => ele === store.language)
  store.language = languageList[(currentLngIdx + 1) % languageList.length]
  i18n.global.locale = store.language as any
  database.value = await getStudents(store.language)
  dataDisplay.value = database.value[dataDisplayIndex.value]
  store.setData()
  deactiveStudent()
}

// theme
const changeTheme = () => {
  if (store.theme !== 'momotalk' && store.theme !== 'yuzutalk') store.theme = 'momotalk'
  var fullScreen = store.fullScreen ? 'full-screen' : 'not-full-screen'
  document.body.className = store.theme + ' ' + fullScreen
}
changeTheme()

// shortcuts
document.onkeyup = (e) => {
  // 在输入框中不激活快捷键
  if (e.key === '/' && document.activeElement?.id !== 'textarea') {
    var box = document.getElementById('searchBox') as HTMLInputElement
    box.focus()
  }
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault()
    talkHistory.undo()
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
    e.preventDefault()
    talkHistory.redo()
  }
}
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
      <div
        class="student-list__button"
        @click="switchStudentList"
        title="Switch Student List"
      >
        <ListIcon class="icon list" />
      </div>
    </div>

    <div id="listbody">
      <div
        class="list-item"
        v-for="(item, index) in dataDisplay"
        :key="index"
        :class="{ active: item === studentSelected }"
        @click="selectStudent(item)"
      >
        <div class="list-item__avatar" @click.stop="" @click="showAvatars(item)">
          <img v-lazy="item.Avatars[item.cnt]" />
          <button :class="true ? 'minus' : 'add'" v-if="item.Avatars.length > 2"></button>
        </div>
        <span class="list-item__name">{{ item.Name }}</span>
        <span class="list-item__bio">{{ item.Bio }}</span>
        <div
          class="list-item__mark"
          v-if="item.School"
          @click.stop=""
          @click="searchSchool = searchSchool === item.School ? '' : item.School"
        >
          <img v-lazy="getSchaleSchoolIcon(item.School)" />
        </div>
        <div
          class="list-item__avatars"
          @click.stop=""
          v-show="item === studentShowAvatars"
        >
          <img
            v-for="(avatar, index) in item.Avatars"
            :key="index"
            v-lazy="avatar"
            @click="selectAvatar(item, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './user-view.scss';
</style>
