import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ElMessage, UploadUserFile } from 'element-plus'
import { MyAxios } from '@/http/myAxios'
import { API_URL } from '@/config'
import router from "@/router"

interface BaseResponseData<T> {
  timestamp: number;
  message: string;
  data: T;
  status: number;
}

export type RequestType = "post" | "get" | "put" | "delete"

export interface PageModel<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export interface PaginationInfo {
  loading: boolean;
  currentPage: number;
  total: number;
  pageSize: number;
}

export const defaultPagination = {
  loading: false,
  currentPage: 1,
  total: 0,
  pageSize: 10
}

export class HttpService {
  myAxios: AxiosInstance

  constructor (url: string) {
    this.myAxios = new MyAxios(url).getInterceptors()
  }

  get<T> (url: string, params: object = {}) {
    return new Promise<T>((resolve, reject) => {
      this.myAxios.get(url, {
        params: params
        //@ts-ignore
      }).then((res: BaseResponseData<T>) => {
        if (res.status === 200) {
          resolve(res.data as T)
        } else {
          if (res.status === 403) {
            router.push("/login")
          } else {
            ElMessage.error(res.message)
          }
          reject(res)
        }
      }).catch((err: { message: any }) => {
        // ElMessage.error(err.message)
        reject(err.message || '请求失败')
      })
    })
  }

  delete<T> (url: string, params: object = {}) {
    return new Promise<T>((resolve, reject) => {
      this.myAxios.delete(url, {
        params: params
        // @ts-ignore
      }).then((res: BaseResponseData<T>) => {
        if (res.status === 200) {
          resolve(res.data as T)
        } else {
          if (res.status === 403) {
            router.push("/login")
          }
          // ElMessage.error(res.message)
          reject(res)
        }
      }).catch((err: { message: any }) => {
        ElMessage.error(err.message)
        reject(err.message || '请求失败')
      })
    })
  }

  postWithConfig<T> (url: string, params: object = {}, config: AxiosRequestConfig, needLoading = false) {
    let loading: any = null
    if (needLoading) {
      loading = ElLoading.service({ text: '请求中...' })
    }
    return new Promise<T>((resolve, reject) => {
      this.myAxios.post(url, params, config)
        // @ts-ignore
        .then((res: BaseResponseData<T>) => {
          if (res.status === 200) {
            resolve(res.data as T)
          } else {
            if (res.status === 403) {
              router.push("/login")
            } else {
              ElMessage.error(res.message)
            }
            reject(res)
          }
        }).catch((err: { message: any }) => {
          ElMessage.error(err.message)
          reject(err.message || '请求失败')
        }).finally(() => {
          if (loading) {
            loading.close()
          }
        })
    })
  }

  post<T> (url: string, params: object = {}, needLoading = false) {
    return this.postWithConfig<T>(url, params, {}, needLoading)
  }

  requestFile(url: string, params: object = {}) {
    return this.myAxios({
      url,
      method: 'post',
      responseType: 'blob',
      data: params
    })
  }

  put<T> (url: string, params: object = {}, needLoading = false) {
    let loading: any = null
    if (needLoading) {
      loading = ElLoading.service({ text: '请求中...' })
    }
    return new Promise<T>((resolve, reject) => {
      this.myAxios.put(url, params)
        // @ts-ignore
        .then((res: BaseResponseData<T>) => {
          if (res.status === 200) {
            resolve(res.data as T)
          } else {
            ElMessage.error(res.message)
            reject(res)
          }
        }).catch((err: { message: any }) => {
          ElMessage.error(err.message)
          reject(err.message || '请求失败')
        }).finally(() => {
          if (loading) {
            loading.close()
          }
        })
    })
  }

  getList<T> (url: string, params: any = {}, pagination = defaultPagination, method = "POST") {
    return new Promise<PageModel<T>>((resolve, reject) => {
      pagination.loading = true
      params.pageNum = pagination.currentPage
      params.pageSize = pagination.pageSize
      if (method === "POST") {
        this.post<PageModel<T>>(url, params).then(res => {
          if (res.pageNum) {
            pagination.currentPage = res.pageNum
          }
          if (res.pageSize) {
            pagination.pageSize = res.pageSize
          }
          pagination.total = res.total
          resolve(res)
        }).catch(err => {
          reject(err)
        }).finally(() => {
          pagination.loading = false
        })
      } else {
        this.get<PageModel<T>>(url, params).then(res => {
          if (res.pageNum) {
            pagination.currentPage = res.pageNum
          }
          if (res.pageSize) {
            pagination.pageSize = res.pageSize
          }
          pagination.total = res.total
          resolve(res)
        }).catch(err => {
          reject(err)
        }).finally(() => {
          pagination.loading = false
        })
      }
    })
  }

  upload (url: string, files: UploadUserFile[], params: object = {}) {
    const formData = new FormData()
    const configs = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    files.forEach(file => {
      formData.append('files', file.raw!)
    })
    Object.keys(params).forEach((key) => {
      // @ts-ignore
      formData.append(key, params[key])
    })
    return new Promise((resolve, reject) => {
      this.myAxios.post(url, formData, configs).then((res: BaseResponseData<any> | any) => {
        if (res.status === 200) {
          resolve(res.info)
        } else {
          ElMessage.error(res.message)
          reject(new Error(res))
        }
      }).catch((err: { message: any; }) => {
        ElMessage.error(err.message)
        reject(err)
      })
    })
  }
}

export const http1 = new HttpService(API_URL)
