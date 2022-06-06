import { createRouter, createWebHistory, RouterOptions } from 'vue-router'

export const constantRouterMap = [
  {
    path: '/',
    name: 'Layout',
    redirect: "/dashboard",
    component: () => import("@/views/Layout/index.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/index.vue"),
        meta: {
          title: "工作桌面"
        }
      },
      {
        path: "/position",
        name: "VehiclePosition",
        component: () => import("@/views/VehiclePosition/index.vue"),
        meta: {
          title: "车辆实时定位"
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
})

export default router
