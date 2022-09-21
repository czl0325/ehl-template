export interface LoginInfo {
  expiration?: number; // 12000000
  header?: string; // "Authorization"
  prefix?: string; // "Bearer "
  value?: string; //
}

export interface MenuSourceInfo {
  createTime?: string; // "2022-02-08T16:18:04"
  description?: string; // "数据可视化看板"
  icon?: string; // "http://192.168.9.169:8001/tools/icon/nav_ic_Datavisualization_nor.png"
  lastUpdateTime?: string; // "2022-02-08T16:18:04"
  level?: number; // 1
  parentId?: number; // 0
  pid?: number; // 98
  resources?: string; // "bigscreen"
  title?: string; // "数据可视化看板"
  translate?: any; // null
  type?: string; // "menu"
}

export interface MenuInfo {
  address?: string; // null
  children?: MenuInfo[]; // [{id: 112, title: "超限数据查询", address: null, parentId: 111,…},…]
  id?: number|string; // 111
  level?: number; // 3
  parentId?: number; // 0
  source?: MenuSourceInfo;
  title?: string; // "超限数据管理"
}

export interface DepartmentSourceInfo {
  address?: string; // "全市"
  createTime?: string; // "2022-03-30T13:54:07"
  description?: string; // ""
  id?: number; // 40
  lastUpdateTime?: string; // "2022-03-30T13:54:07"
  level?: number; // 1
  name?: string; // "福建易华录信息技术有限公司"
  parentId?: number; // 0
  translate?: any; // null
}

export interface DepartmentInfo {
  address?: string; // "全市"
  children?: DepartmentInfo[]; // [{id: 41, title: "软件开发部", address: "海沧区", parentId: 40,…},…]
  id?: number; // 40
  level?: number; // 1
  parentId?: number; // 0
  source?: DepartmentSourceInfo;
  title?: string; // "福建易华录信息技术有限公司"
}

export interface RoleInfo {
  createTime?: string; // "2018-10-23T12:32:13"
  description?: string; // "超级管理员"
  lastUpdateTime?: string; // "2022-04-01T16:36:37"
  rid?: number; // 1
  roleName?: string; // "ROLE_ROOT"
  translate?: any; // null
  all?: MenuInfo[];
  have?: number[];
  overload?: string[];
  illegal?: string[];
}

export interface SystemLogInfo {
  args?: string; // null
  browser?: string; // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36"
  classPosition?: string; // null
  code?: string; // null
  cost?: string; // null
  createTime?: string; // "2022-04-11T01:41:47.000+0000"
  id?: number; // 296354
  logContent?: string; // "【系统管理】数据查询：分页,获取用户详情"
  logTime?: string; // "2022-04-11 09:41:47"
  logType?: string; // "01_020_1"
  logTypes?: string; // "数据查询"
  method?: string; // null
  msg?: string; // null
  operationDeviceIp?: string; // "192.168.9.231"
  updateTime?: string; // "2022-04-11T01:41:47.000+0000"
  url?: string; // null
  userId?: string; // null
  userName?: string; // "root_admin"
}
