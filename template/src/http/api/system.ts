import { http1, RequestType } from "@/http/http"
import { DepartmentInfo, DepartmentSourceInfo } from "@/models/system"

// 获取部门树
export function getDepartmentTree () {
  return http1.get<DepartmentInfo[]>('/sys/department/tree')
}

// 操作权限
export function operateDepartment (source: DepartmentSourceInfo, type: RequestType = 'post') {
  source.translate = {
    address: '部门位置',
    description: '部门描述',
    id: '部门ID',
    level: '部门排序',
    name: '部门名称',
    parentId: '父ID'
  }
  switch (type) {
    case 'post':
      return http1.post('/sys/department', source)
    case 'put':
      return http1.put('/sys/department', source)
    case 'delete':
      return http1.delete(`/sys/department/${source.id}`)
    default:
      return http1.get('/sys/department', source)
  }
}
