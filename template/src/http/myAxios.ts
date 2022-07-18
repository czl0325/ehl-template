import axios, { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

export class MyAxios {
  instance: AxiosInstance;

  constructor (url: string) {
    this.instance = axios.create({
      baseURL: url || '',
      timeout: 10000
    })
    this.init()
  }

  getInterceptors () {
    return this.instance
  }

  // 初始化拦截器
  init () {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      config => {
        if (localStorage.getItem("Authorization")) {
          // @ts-ignore
          config.headers.Authorization = localStorage.getItem("Authorization")
        }
        return config
      },
      err => {
        console.error(err)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        if (response.config.responseType === "blob") {
          return response
        } else {
          if (response.status === 200) {
            return Promise.resolve(response.data)
          } else if (response.status === 403) {
            router.push("/login")
            return Promise.reject(response)
          } else {
            return Promise.reject(response)
          }
        }
      },
      err => {
        const { response } = err
        if (response) {
          if (response.status === 403) {
            router.push("/login")
          } else {
            ElMessage.error(`错误：${response.status}`)
          }
          return Promise.reject(err)
        } else {
          ElMessage.error('网络连接异常,请稍后再试!')
        }
      })
  }
}
