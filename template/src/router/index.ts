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
    path: "/system",
    name: "System",
    component: () => import("@/views/Layout/index.vue"),
    redirect: "/system/menu",
    meta: {
      resources: "pre",
      title: "系统管理"
    },
    children: [
      {
        path: "/system/menu",
        name: "SystemMenu",
        component: () => import("@/views/system/menu/index.vue"),
        meta: {
          resources: "pre_perm",
          title: "菜单管理"
        }
      },
      {
        path: "/system/user",
        name: "SystemUser",
        component: () => import("@/views/system/user/index.vue"),
        meta: {
          resources: "pre_user",
          title: "用户管理"
        }
      },
      {
        path: "/system/dept",
        name: "SystemDept",
        component: () => import("@/views/system/dept/index.vue"),
        meta: {
          resources: "pre_dept",
          title: "部门管理"
        }
      },
      {
        path: "/system/role",
        name: "SystemRole",
        component: () => import("@/views/system/role/index.vue"),
        meta: {
          resources: "pre_role",
          title: "角色管理"
        }
      },
      {
        path: "/system/logs",
        name: "SystemLogs",
        component: () => import("@/views/system/logs/index.vue"),
        meta: {
          resources: "pre_logs",
          title: "系统日志"
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
  if (to.name === "Login") {
    localStorage.removeItem("Authorization")
    next()
  } else {
    try {
      if (store.getters.user.uid) {
        next()
      } else {
        store.dispatch("user/getUserInfo").then(res => {
          next()
        }).catch(err => {
          next("/login")
        })
      }
    } catch (err) {
      next("/login")
    }
  }
})

export default router
