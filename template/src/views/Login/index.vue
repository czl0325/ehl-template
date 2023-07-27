<template>
  <div class="login-bg">
    <span class="top-time"></span>
    <el-form class="login-item">
      <el-form-item class="login-form-item">
        <el-input v-model="loginUser.username" placeholder="账号">
          <template v-slot:prefix>
            <img src="../../assets/images/login/ic_login_user.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="login-form-item">
        <el-input v-model="loginUser.password" placeholder="密码" type="password">
          <template v-slot:prefix>
            <img src="../../assets/images/login/ic_login_pwd.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="login-form-item">
        <div class="code-container">
          <el-input v-model="loginUser.codeText" placeholder="请输入验证码" @keyup.enter="onLogin"></el-input>
          <el-image style="width: 100px; height: 100%;background-color: white;margin-left: 10px;overflow: hidden" :src="codeUrl" fit="fill" @click="generateImageCode"></el-image>
        </div>
      </el-form-item>
      <el-form-item class="login-form-item">
        <el-button class="w-100" type="primary" size="large" @click="onLogin" :loading="loading">登录</el-button>
      </el-form-item>
      <el-form-item class="login-form-item">
        <el-button text type="primary" size="small">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex"
import urlJoin from "proper-url-join"
import { formatDate, formatWeekday } from '@/utils/tools'
import { loginIn } from "@/http/api/user"
import { http1 } from "@/http/http"

defineOptions({
  name: "Login"
})

const router = useRouter()
const store = useStore()
const currentTime = ref(`${formatDate(new Date(), 0)} ${formatWeekday(new Date())}`)
const codeUrl = ref("")
const loginUser = reactive({
  username: localStorage.getItem("user") || "",
  password: "",
  codeText: "",
  codeKey: ""
})
const loading = ref(false)
onMounted(() => {
  store.commit("cache/DEL_ALL_CACHED_VIEW")
})
const randomCodeKey = () => {
  const s: any[] = []
  const hexDigits = '0123456789abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 24; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  return s.join('')
}
const generateImageCode = () => {
  loginUser.codeKey = randomCodeKey()
  codeUrl.value = urlJoin(http1.baseUrl, "/sys/auth/verify/code", loginUser.codeKey, { query: { r: Math.ceil(Math.random() * 100) } })
}
const onLogin = () => {
  if (loading.value) {
    return
  }
  loading.value = true
  loginIn(loginUser).then(res => {
    localStorage.setItem("user", loginUser.username)
    localStorage.setItem("Authorization", `${res.prefix} ${res.value}`)
    router.push("/")
  }).catch(() => {
    generateImageCode()
  }).finally(() => {
    loading.value = false
  })
}
generateImageCode()

</script>

<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../../assets/images/login/image_login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login-item {
    position: absolute;
    width: 495px;
    height: 698px;
    background: url("../../assets/images/login/image_login_form.png") no-repeat;
    background-size: 100% 100%;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-form-item {
      overflow: hidden;
      width: 70%;
      margin-top: 10px;
      &:nth-child(1) {
        margin-top: 300px;
      }
      img {
        width: 17px;
        height: 19px;
      }
      :deep(.el-form-item__content) {
        height: 46px !important;
      }
      :deep(.el-input) {
        height: 100% !important;
      }
      &:last-child {
        margin-top: 5px;
        :deep(.el-form-item__content) {
          justify-content: flex-end;
        }
        .el-button:hover {
          background-color: transparent;
        }
      }

      :deep(.el-input__wrapper) {
        background: rgba(79, 226, 255, 0.1) !important;
        border: 1px solid rgba(79, 226, 255, 0.1);
        box-shadow: none;
        border-radius: 4px;
        box-sizing: border-box;
        input {
          color: white !important;
        }
      }
      :deep(.el-input__wrapper:focus,
      .el-input__wrapper:hover,
      .el-input__wrapper:checked) {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid #079BFF;
        box-sizing: border-box;
        outline: none;
      }
      :deep(.el-input__prefix-inner) {
        align-items: center;
      }
      .code-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
