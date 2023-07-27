import { http1, PaginationInfo } from "@/http/http"
import { IDictInfo, IDictTreeInfo } from "@/models/system"

export const getDictTree = () => {
  return http1.get<IDictTreeInfo[]>("/data/dict/tree", {})
}

export const operateDictTree = (data: IDictTreeInfo) => {
  if (data.id) {
    return http1.put<IDictInfo>("/data/dict/" + data.id, data)
  } else {
    return http1.post<IDictInfo>("/data/dict", data)
  }
}

export const deleteDictTree = (id: number) => {
  return http1.delete("/data/dict/" + id)
}

export const getDictPage = (dictId: number, pagination: PaginationInfo) => {
  return http1.getList<IDictInfo>("/data/dictData/page", { dictId }, pagination)
}

export const operateDict = (data: IDictInfo) => {
  if (data.id) {
    return http1.put<IDictInfo>("/data/dictData/" + data.id, data)
  } else {
    return http1.post<IDictInfo>("/data/dictData", data)
  }
}

export const deleteDict = (id: number) => {
  return http1.delete("/data/dictData/" + id)
}

export const batchDeleteDict = (ids: (number | undefined)[]) => {
  return http1.delete("/data/dictData/batch/" + ids.join(","), {})
}

export const getDictByName = (name: string) => {
  return http1.get<IDictInfo[]>("/data/dictData/getSystemDictDataByCondition", {
    name
  })
}
