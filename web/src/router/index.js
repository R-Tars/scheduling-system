import { createRouter, createWebHistory } from 'vue-router'
import DataInputView from '../views/DataInput/DataInputView'
//import HomePageView from '../views/HomePage/HomePageView'
import ScheduledView from '../views/Scheduled/ScheduledView'
import TestPageView from '../views/TestPage/TestPageView'


const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/homepage/",
  },
  {
    path: "/data/",
    name: "DataInputIndex",
    component: DataInputView,
  },
  {
    path: "/scheduled/",
    name: "ScheduledIndex",
    component: ScheduledView,
  },
  {
    path: "/test/",
    name: "TestPageIndex",
    component: TestPageView,
  },
  {
    path: "/homepage/",
    name: "HomePageIndex",
    component: TestPageView,
  },
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
