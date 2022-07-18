import { http1 } from "@/http/http"

export interface LabelInfo {
  label: string,
  value: string
}

export const getRedisKeyValueAll = (name: string) => {
  return http1.get<string>("/data/dictDataDetails/getRedisKeyValue", {
    key: name
  }).then(res => {
    return http1.get<LabelInfo[]>("/data/dictDataDetails/getRedisKeyValue", {
      key: res
    })
  })
}
