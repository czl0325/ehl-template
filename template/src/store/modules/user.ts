import { ElLoading } from 'element-plus'
import { cloneDeep } from "lodash"
import { UserInfo } from '@/models/user'
import { ActionTree } from 'vuex'
import { getUserInfo } from "@/http/api/user"

const state = {
  user: {},
  routes: []
}

const mutations = {
  SET_USER: (state: { user: UserInfo }, user: UserInfo) => {
    state.user = user
  },
  SET_ROUTES: (state: { routes: any[] }, routes: any[]) => {
    state.routes = routes
  }
}

const actions: ActionTree<any, any> = {
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const loading = ElLoading.service({ text: "加载个人信息...", fullscreen: true })
      getUserInfo().then(res => {
        commit("SET_USER", res)
        resolve(res)
      }).catch(err => {
        reject(err)
      }).finally(() => {
        loading.close()
      })
    })
  },
  logout({ commit }) {
    commit('SET_USER', {})
    commit('SET_ROUTES', [])
    sessionStorage.removeItem('tabs')
  }
}

const filterRoutes = (routes1: any[], routes2: any[]) => {
  const newRoutes: any[] = []
  const _routes2 = cloneDeep(routes2)
  routes1.forEach(route1 => {
    _routes2.forEach(route2 => {
      if (route1.resources === route2.meta.resources) {
        if (route2.children && route2.children.length > 0 && route1.children) {
          route2.children = filterRoutes(route1.children, route2.children)
        }
        route2.meta.title = route1.title
        route2.meta.icon = route1.icon
        newRoutes.push(route2)
        return true
      }
    })
  })
  return newRoutes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
