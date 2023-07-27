import { http1, PaginationInfo, RequestType } from "@/http/http"
import { IDepartmentInfo, IDepartmentSourceInfo, IDictInfo, IMenuInfo, IMenuSourceInfo, IRoleInfo, ISystemLogInfo } from "@/models/system"
import { UserInfo } from "@/models/user"

// 获取部门树
export function getDepartmentTree () {
  return http1.get<IDepartmentInfo[]>('/sys/department/tree')
}

// 操作权限
export function operateDepartment (source: IDepartmentSourceInfo, type: RequestType = 'post') {
  source.translate = {
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

/**** 系统日志 *****/
// 分页
export function getSystemLogPage(form: any, pagination: PaginationInfo) {
  return http1.getList<ISystemLogInfo>("/data/log/page", form, pagination, "POST")
}

export function getAllParam() {
  return http1.get<any>("/process/param/getAllParam")
}

export function updateParamList(paramList: any[]) {
  return http1.post("/process/param/updateParamList", paramList)
}

export function nowDelete() {
  return http1.post("/data/systemConfig/nowDelete")
}

/**** 权限操作 *****/
// 获取权限树
export function getPermissionTree (filter: boolean) {
  return http1.get<IMenuInfo[]>('/sys/permission/tree', { filter })
}

// 操作权限
export function operatePermission (source: IMenuSourceInfo, type: RequestType = 'post') {
  source.translate = {
    description: '菜单描述',
    icon: '图标',
    level: '菜单排序',
    parentId: '父菜单ID',
    pid: '菜单ID',
    resources: '标识',
    title: '标题',
    type: '类型'
  }
  if (!source.level) {
    source.level = 1
  }
  switch (type) {
    case 'post':
      return http1.post('/sys/permission', source)
    case 'put':
      return http1.put('/sys/permission', source)
    case 'delete':
      return http1.delete(`/sys/permission/${source.pid}`)
    default:
      return http1.get('/sys/permission', source)
  }
}

/**** 角色模块 *****/
// 获取角色列表
export function getRoleList (form: any, pagination: PaginationInfo) {
  return http1.getList<IRoleInfo>("/sys/role/page", form, pagination, "GET")
}

// 根据ID 查询单个角色信息
export function getRoleById(rid?: number) {
  return http1.get<any>(`/sys/role/info/${rid}`)
}

// 更新角色的权限
export function updateRolePermission(checks: number[], rid: number, addNewArr: number[]|undefined, reduceNewArr?: number[]|undefined) {
  return http1.post("/sys/role/update/permissions", {
    permissions: checks,
    rid: rid,
    translate: {
      addNewArr: addNewArr,
      permissions: "权限列表",
      reduceNewArr: reduceNewArr,
      rid: "角色ID"
    }
  }, true)
}

// 查询角色的编辑
export function getRoleByModule(rid?: number) {
  return http1.get<any>("/process/activiti/moduleRole", { rid })
}

export function operateRoleByModule(role: IRoleInfo, type: RequestType = 'post') {
  const data = {
    ...role,
    translate: {
      createTime: "创建时间",
      description: "描述",
      illegal: "设置违法模块权限",
      lastUpdateTime: "更新时间",
      overload: "设置超限模块权限",
      rid: "角色ID",
      roleName: "角色名称"
    }
  }
  switch (type) {
    case "put": return http1.put("/sys/role", data, true)
    case "delete": return http1.delete(`/sys/role/${role.rid}`)
    default: return http1.post("/sys/role", data, true)
  }
}

/**** 用户模块 *****/
// 获取用户列表
export function getUserList(form: any, pagination: PaginationInfo) {
  return http1.getList<UserInfo>("/sys/user/info/page", form, pagination, "GET")
}

export function getUserAll() {
  return http1.get<UserInfo[]>("/sys/user/all")
}

// 获取用户所有角色
export function getUserRoleAll() {
  return http1.get<IRoleInfo[]>('/sys/role/all')
}

// 更新用户角色
export function updateUserRole(user: UserInfo, roles: number[]) {
  return http1.post("/sys/user/update/roles", {
    uid: user.uid,
    roles,
    translate: {
      avatar: "头像",
      birthday: "生日",
      deptId: "部门ID",
      email: "邮箱",
      gender: "性别",
      nickname: "昵称",
      password: "密码",
      roles: "角色列表",
      status: "状态",
      uid: "用户ID",
      username: "登录账户"
    }
  })
}

// 操作用户
export function operateUser(user: UserInfo, type: RequestType = 'post') {
  const data = {
    ...user,
    translate: {
      uid: '用户ID',
      avatar: '头像',
      username: '登录账户',
      email: '邮箱',
      nickname: '昵称',
      password: '密码',
      gender: '性别',
      birthday: '生日',
      status: '状态',
      deptId: '部门ID',
      roles: '角色列表'
    }
  }
  switch (type) {
    case "put": return http1.put("/sys/user", data, true)
    case "delete": return http1.delete(`/sys/user/${user.uid}`)
    default: return http1.post("/sys/user", data, true)
  }
}

export const getDeviceSettingAll = () => {
  return http1.get<any>("/data/param/getAllParam", {})
}

export const updateDeviceSettingAll = (data: any) => {
  return http1.post("/data/param/updateParamList", data)
}
