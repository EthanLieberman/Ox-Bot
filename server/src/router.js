import { createRouter, createWebHistory, onBeforeRouteUpdate } from 'vue-router';
import CharacterBuilder from '@/views/CharacterBuilder.vue';


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: CharacterBuilder,
      // props: (route) => {
      //   return {
      //     params: route.query.params,
      //   }
      // },
    },

    {
      path: '/:catchall(.*)*',
      // component: CharacterBuilder,
      redirect: '/'
    },

    // {
    //   path: '/CharacterSubmit',
    //   component: () => import('@/views/CharacterSubmit.vue'),
    // },
  ],
})
