import { RoleInfo } from "@/models/system"

export interface LoginInfo {
  expiration?: number; // 12000000
  header?: string; // "Authorization"
  prefix?: string; // "Bearer "
  value?: string; //
}

export interface ButtonInfo {
  pid?: number; // 28
  resources?: string; // "pre_dept:view"
  title?: string; // "查看部门"
}

export interface MenuInfo {
  children?: any; // null
  icon?: string; // "bigscreen"
  level?: number; // 1
  parentId?: number; // 0
  pid?: number; // 98
  resources?: string; // "bigscreen"
  title?: string; // "数据可视化看板"
}

export interface UserInfo {
  avatar?: string; // "https://lzy-file.oss-cn-shenzhen.aliyuncs.com/2018/11/18/19/18/84922afda435453caffc12c7739c6bad.jpg"
  birthday?: string; // "2013-01-01"
  buttons?: ButtonInfo[];
  departmentName?: string; // null
  email?: string; // "root_admin@163.com"
  gender?: number; // 1
  menus?: MenuInfo[];
  nickname?: string; // "超级管理员"
  roles?: RoleInfo[]; // ["超级管理员"]
  uid?: number; // 3
  username?: string; // "root_admin"
  password?: string;
  deptId?: number;
  status?: number;
}

export interface TaskInfo {
  assignee?: string; // null
  id?: number; // 350914
  taskId?: string; // "1101055"
  taskName?: string; // "数据操作"
  processInstanceId?: number;
}
