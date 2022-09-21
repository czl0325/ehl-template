<template>
  <div class="login-container">
    <span class="top-time">{{ currentTime }}</span>
    <el-form class="login-form">
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
          <el-image style="width: 100px; height: 100%;background-color: white;margin-left: 10px" :src="codeUrl" @click="generateImageCode"></el-image>
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

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex"
import urlJoin from "proper-url-join"
import { formatDate, formatWeekday } from '@/utils/tools'
import { API_URL } from "@/config"
import { loginIn } from "@/http/api/user"

export default defineComponent({
  name: 'Login',
  setup () {
    const router = useRouter()
    const store = useStore()
    const currentTime = ref(`${formatDate(new Date(), 0)} ${formatWeekday(new Date())}`)
    const codeUrl = ref("")
    const loginUser = reactive({
      username: "root_admin",
      password: "ehl@2022",
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
      codeUrl.value = urlJoin(API_URL, "/sys/auth/verify/code", loginUser.codeKey, { query: { r: Math.ceil(Math.random() * 100) } })
    }
    const onLogin = () => {
      if (loading.value) {
        return
      }
      loading.value = true
      loginIn(loginUser).then(res => {
        localStorage.setItem("Authorization", `${res.prefix} ${res.value}`)
        router.push("/")
      }).catch(() => {
        generateImageCode()
      }).finally(() => {
        loading.value = false
      })
    }
    generateImageCode()
    return {
      currentTime,
      codeUrl,
      loginUser,
      loading,
      onLogin,
      generateImageCode
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/login/image_login_bg.jpg") no-repeat left top;
  background-size: 100% 100%;
  position: relative;

  .top-time {
    position: absolute;
    top: 2%;
    right: 2%;
    color: #4091AF;
  }
  .login-form {
    background: url("../../assets/images/login/image_login_form.png") no-repeat;
    background-size: 100% 100%;
    width: 486px;
    height: 715px;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    .login-form-item {
      overflow: hidden;
      width: 70%;
      margin-top: 25px;
      &:nth-child(1) {
        margin-top: 320px;
      }
      .code-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      :deep(.el-form-item__content) {
        height: 46px !important;
      }
      :deep(.el-input) {
        height: 100% !important;
      }
      &:last-child {
        :deep(.el-form-item__content) {
          justify-content: flex-end;
        }
        .el-button {
          height: 46px;
          &:hover,
          &:focus,
          &:checked {
            background: transparent !important;
          }
        }
      }
    }
  }
}
</style>

<style scoped>
.login-form-item {
  margin-bottom: 0;
}
:deep(.login-form-item .el-input__wrapper) {
  background: rgba(79, 226, 255, 0.1) !important;
  border: 1px solid rgba(79, 226, 255, 0.1);
  box-shadow: none;
  color: white !important;
  border-radius: 4px;
  box-sizing: border-box;
}
:deep(.login-form-item .el-input__wrapper:focus,
.login-form-item .el-input__wrapper:hover,
.login-form-item .el-input__wrapper:checked) {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid #079BFF;
  box-sizing: border-box;
  outline: none;
}
:deep(.login-form-item .el-input__prefix-inner) {
  align-items: center;
}
</style>
