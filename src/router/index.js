import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../components/BooksList.vue'),
      beforeEnter: (to, from, next) => {
        document.getElementById('content').style.overflowY = "scroll";
        document.getElementById('content').style.visibility = "visible";
        next();
      },
      children: [
        {
          path: '/details/:bookId',
          name: 'details',
          component: () => import('../components/BookDetails.vue'),
        },
        {
          path: '/details/:bookId/edit',
          name: 'edit',
          component: () => import('../components/BookEdit.vue'),
        },
        {
          path: '/add',
          name: 'add',
          component: () => import('../components/BookEdit.vue'),
        },
      ]
    },
    {
      path: '/:bookId/read/:pageNumber',
      name: 'reader',
      component: () => import('../components/TheReader.vue'),
      beforeEnter: (to, from, next) => {
        document.getElementById('content').style.overflowY = "hidden";
        next();
      },
    },
    
  ]
})

export default router
