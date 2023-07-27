<template>
  <div class="navbar">
    <div class="top-view">
      <fold-btn class="me-2" :is-active="!isFold" :toggle-click="onFoldMenu"/>
      <span class="navbar_title_style">智能机箱综合管理平台</span>
      <div ref="newBtnRef" class="avatar-wrapper">
        <img :src="getAssetsFile('other/ic_news.png')" alt="">
        <span>消息</span>
      </div>
      <el-popover ref="newPopoverRef" :virtual-ref="newBtnRef" trigger="click" virtual-triggering :width="250">

      </el-popover>
      <router-link to="/help" class="avatar-wrapper">
        <img :src="getAssetsFile('other/ic_help.png')" alt="">
        <span>帮助</span>
      </router-link>
      <el-popover :width="280" placement="bottom" trigger="click" class="popup-user-container">
        <div class="popup-user">
          <div class="top-view">
            <img class="avatar" :src="getAssetsFile('other/img_avatar_man.png')" alt="">
            <div class="tmv">
              <div class="tmtv">
                <span></span>
                <span class="role"></span>
              </div>
              <span class="department">部门：</span>
            </div>
          </div>
          <div class="item" @click="showChangePassword=true">
            <img :src="getAssetsFile('other/ic_password.png')" alt="">
            <span>修改密码</span>
          </div>
          <div class="item2">
            <div class="item" style="height: unset;border-bottom: none">
              <img :src="getAssetsFile('other/ic_version.png')" alt="">
              <span>版本信息</span>
            </div>
            <span style="color: #999;font-size: 12px;margin-left: 40px">当前版本: v1.0.0</span>
          </div>
          <div class="item" @click="onLogout">
            <img :src="getAssetsFile('other/ic_logout.png')" alt="">
            <span>退出登录</span>
          </div>
        </div>
        <template #reference>
          <div class="avatar-wrapper">
            <img style="width: 30px;height: 30px" :src="getAssetsFile('other/img_avatar_man.png')" alt="">
            <span></span>
            <el-icon color="#fff" class="ms-1" size="12"><CaretBottom /></el-icon>
          </div>
        </template>
      </el-popover>
    </div>
    <tab-pane />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import { CaretBottom } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { DialogElement } from "ehl-ui"
import FoldBtn from "@/views/Layout/components/FoldBtn.vue"
import TabPane from '@/views/Layout/components/TabPane.vue'
import { UserInfo } from '@/models/user'
import { getAssetsFile } from "@/utils/tools"

export default defineComponent({
  name: 'Navbar',
  components: {
    FoldBtn,
    TabPane,
    CaretBottom
  },
  props: {
    isFold: {
      type: Boolean,
      default: false
    }
  },
  emits: ["onFold"],
  setup(props, context) {
    const store = useStore()
    const router = useRouter()
    const user = computed<UserInfo>(() => store.getters.user)
    const newBtnRef = ref()
    const newPopoverRef = ref()
    const showChangePassword = ref(false)
    const xDialog = ref({} as DialogElement)
    const onFoldMenu = () => {
      context.emit("onFold")
    }
    const onClickNewsOutside = () => {
      unref(newPopoverRef).popperRef?.delayHide?.()
    }
    const onConfirmPassword = () => {
      xDialog.value.confirm().then(res => {
        showChangePassword.value = false
        ElMessage.success("更新密码成功")
      })
    }
    const onLogout = () => {
      ElMessageBox.confirm("确定要退出登录？", "提示", {
        callback: (result: string) => {
          if (result === 'confirm') {
            store.dispatch("user/logout")
            router.replace("/login")
          }
        }
      })
    }
    return {
      user,
      newBtnRef,
      newPopoverRef,
      showChangePassword,
      xDialog,
      onFoldMenu,
      onClickNewsOutside,
      onConfirmPassword,
      onLogout,
      getAssetsFile
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 100px;
  width: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  background: #242832 url("../../../assets/images/image_top.png") no-repeat;
  background-size: 100% 100%;
  opacity: 0.9;
  display: flex;
  padding: 0;
  flex-direction: column !important;
  overflow: hidden;

  .top-view {
    height: 60px;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: white;
    .navbar_title_style {
      flex: 1;
      color: white;
      font-size: 20px;
      font-weight: bolder;
      text-align: left;
    }

    .avatar-wrapper {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      margin-left: 30px;

      img {
        width: 20px;
        height: 20px;
      }

      span {
        font-size: 16px;
        font-weight: normal;
        color: #FFFFFF;
        margin-left: 10px;
      }

      .el-icon-caret-bottom {
        color: white;
        margin-left: 5px;
      }

      .loginUser_image {
        width: 30px;
        height: 30px;
        background: #FFFFFF;
        border-radius: 50%;
      }

      .loginUser_name {
        font-size: 16px;
        color: #FFFFFF;
      }

      .user-dropdown {
        width: 200px;
        height: auto;
      }
    }
  }
}

.popup-user {
  display: flex;
  flex-direction: column;
  width: 100%;
  .top-view {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #E6E6E6;
    align-items: center;
    padding: 20px 15px;
    box-sizing: border-box;
    .avatar {
      width: 40px;
      height: 40px;
      background: #DEDEDE;
      border-radius: 50%;
    }
    .tmv {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 40px;
      .tmtv {
        display: flex;
        align-items: center;
        .role {
          height: 16px;
          line-height: 16px;
          background: linear-gradient(0deg, #1890FF 0%, #3AA2FF 100%);
          border-radius: 8px 2px 8px 2px;
          margin-left: 6px;
          color: white;
          display: inline-block;
          padding: 0 8px;
          box-sizing: border-box;
          font-size: 10px;
        }
      }
      .department {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .item {
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    height: 64px;
    border-bottom: 1px solid #e6e6e6;
    cursor: default;
    span {
      margin-left: 10px;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  .item2 {
    display: flex;
    height: 64px;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    cursor: default;
  }
}
</style>
