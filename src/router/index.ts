import { createRouter, createWebHistory } from 'vue-router'
import Info from '@/views/InfoView/InfoView.vue'
import Chat from '@/views/ChatView/ChatView.vue'
import Help from '@/views/HelpView/HelpView.vue'
import User from '@/views/UserView/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/chat',
      name: 'chat-list',
      meta: {
        layout: 'empty'
      },
      component: Chat
    },
    {
      path: '/chat/:useId',
      name: 'chat-room',
      meta: {
        layout: 'default'
      },
      component: Chat
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        layout: 'default'
      },
      component: User
    },
    {
      path: '/info/:id',
      name: 'info',
      meta: {
        layout: 'default'
      },
      component: Info
    },
    {
      path: '/help',
      name: 'help',
      meta: {
        layout: 'default'
      },
      component: Help
    }
  ]
})

export default router
