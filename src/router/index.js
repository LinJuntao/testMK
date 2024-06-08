import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home/index.vue';
// import User from '../pages/home/user/MyManagement.vue';
import dateSelection from '../pages/dateSelection/index.vue';
import regionSelection from '../pages/regionSelection/index.vue';
import ApplicantInformation from '../pages/applicantInformation/index.vue';
import purchaseResult from '../pages/purchaseResult/index.vue';
import MyPage from '../pages/my/my.vue';
import Filter from '../pages/filter/filter.vue';
import EventDetails from '../pages/eventDetails/eventDetails.vue';
import Location from '../pages/location/location.vue';
import Admin from '../pages/admin/index.vue';
import DetailPage from '../pages/detailPage/index.vue';
import NotFound from '../pages/NotFound/index.vue';

const routerarr = [
  // 其他已定义的路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/GoodsTrans/BackMid',
    name: 'GoodsTrans/BackMid',
    component: () => import('../pages/GoodsTrans/BackMid.vue')
  },
  {
    path: '/GoodsTrans/MidToFactory',
    name: 'GoodsTrans/MidToFactory',
    component: () => import('../pages/GoodsTrans/MidToFactory.vue')
  },
  {
    path: '/GoodsTrans/MidWhOut',
    name: 'GoodsTrans/MidWhOut',
    component: () => import('../pages/GoodsTrans/MidWhOut.vue')
  },
  {
    path: '/GoodsTrans/MidWhReceive',
    name: 'GoodsTrans/MidWhReceive',
    component: () => import('../pages/GoodsTrans/MidWhReceive.vue')
  },
  {
    path: '/GoodsTrans/PreSign',
    name: 'GoodsTrans/PreSign',
    component: () => import('../pages/GoodsTrans/PreSign.vue')
  },
  {
    path: '/GoodsTrans/PreSignList',
    name: 'GoodsTrans/PreSignList',
    component: () => import('../pages/GoodsTrans/PreSignList.vue')
  },
  {
    path: '/GoodsTrans/Sign',
    name: 'GoodsTrans/Sign',
    component: () => import('../pages/GoodsTrans/Sign.vue')
  },
  {
    path: '/GoodsTrans/SignList',
    name: 'GoodsTrans/SignList',
    component: () => import('../pages/GoodsTrans/SignList.vue')
  }
];

const routes = [
  ...routerarr,
  {
    path: '/my',
    name: 'My',
    component: MyPage
  },
  {
    path: '/filter',
    name: 'Filter',
    component: Filter
  },
  {
    path: '/eventDetails',
    name: 'eventDetails',
    component: EventDetails
  },
  {
    path: '/location',
    name: 'location',
    component: Location
  },
  {
    path: '/applicantInformation',
    name: 'applicantInformation',
    component: ApplicantInformation
  },
  {
    path: '/dateSelection',
    name: 'dateSelection',
    component: dateSelection
  },
  {
    path: '/regionSelection',
    name: 'regionSelection',
    component: regionSelection
  },
  {
    path: '/purchaseResult',
    name: 'purchaseResult',
    component: purchaseResult
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/detail_page',
    name: 'detailPage',
    component: DetailPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const whiteList = ['/']; // 白名单

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('userToken'); // 假设 token 存储在 localStorage 中

  if (token) {
    if (to.path === '/') {
      next('/location');
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/');
    }
  }
});

export default router;
