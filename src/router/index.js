import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/User'
import Mkprofile from '@/components/Mkprofile'
import Creation from '@/components/Creation'
import Upload from '@/components/Upload'
import Band from '@/components/Band'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/mkprofile',
      name: 'Mkprofile',
      component: Mkprofile,
    },
    {
      path: '/user/:name',
      name: 'User',
      component: User,
      props: true,
    },
    {
      path: '/creation/:num',
      name: 'Creation',
      component: Creation,
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload,
    },
    {
      path: '/:band',
      name: 'Band',
      component: Band,
    },
  ],
});
