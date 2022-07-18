import { createStore } from 'vuex'
import getters from './getters'

//@ts-ignore
const modulesFiles = import.meta.globEager('./modules/**/*.(ts|js)')
const modules = {}
for (const key in modulesFiles) {
  //@ts-ignore
  modules[key.replace(/(\.\/modules\/|\.(js|ts))/g, '')] = modulesFiles[key].default
}

Object.keys(modules).forEach(item => {
  //@ts-ignore
  modules[item]['namespaced'] = true
})

export default createStore({
  modules,
  getters
})
