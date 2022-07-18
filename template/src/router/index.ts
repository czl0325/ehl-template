import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'
import store from "@/store"

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import("@/views/Login/index.vue")
  },
  {
    path: '/',
    component: () => import("@/views/Layout/index.vue"),
    hidden: true,
    meta: {
      title: "工作桌面",
      activityPath: '/dashboard'
    },
    children: [
      {
        path: "/",
        redirect: "/dashboard"
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/index.vue"),
        meta: {
          title: "工作桌面"
        }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        setTimeout(() => {
          resolve({
            left: 0,
            top: 0
          })
        }, 0)
      }
    })
  }
} as RouterOptions)

router.beforeEach((to, from, next) => {
  next()
//  if (to.name === "Login") {
//    localStorage.removeItem("Authorization")
//    next()
//  } else {
//    try {
//      if (store.getters.user.uid) {
//        next()
//      } else {
//        store.dispatch("user/getUserInfo").then(res => {
//          next()
//        }).catch(err => {
//          console.log(err)
//          next("/login")
//        })
//      }
//    } catch (err) {
//      next("/login")
//    }
//  }
})

export default router
