import { http1 } from '@/http/http'
import { LoginInfo } from '@/models/user'

export const loginIn = (user: { codeKey: string, codeText: string, password: string, username: string }) => {
  return http1.post<LoginInfo>("/sys/auth/login", user)
}

// 获取用户信息
export const getUserInfo = () => {
  return http1.get("/sys/user/info")
}
