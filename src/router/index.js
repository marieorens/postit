import { createRouter, createWebHistory } from 'vue-router';
import AllPostView from '../views/AllPostView.vue';
import NoteView from '../components/PostDetails.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: AllPostView
  },

  {
    path: '/all',
    name: 'notes',
    component: AllPostView
  },

  {
    path: '/note/:id',
    name: 'NoteView',
    component: NoteView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
