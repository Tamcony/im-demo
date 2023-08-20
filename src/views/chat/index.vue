<template>
  <div :class="!data.env?.isH5
    ? 'home-TUIKit-main' : 'home-TUIKit-main-mobile'">
    <div class="TUIKit-container" :style="!data.env?.isH5
    ? 'border-radius: 16px;' : ''">
      <div
        :class="data.env?.isH5 ? 'conversation-h5' : 'conversation'"
        v-show="!data.env?.isH5 || data.currentModel === 'conversation'"
      >
        <TUISearch class="search" />
        <TUIConversation @current="handleCurrentConversation" />
      </div>
      <div
        class="chat"
        v-show="!data.env?.isH5 || data.currentModel === 'message'"
      >
        <TUIChat>
          <h1>欢迎使用腾讯云即时通信IM</h1>
        </TUIChat>
      </div>
      <!-- TUICallKit 组件：通话 UI 组件主体 -->
      <TUICallKit
        :class="!data.showCallMini ? 'callkit-drag-container' : 'callkit-drag-container-mini'
          "
        :allowedMinimized="true"
        :allowedFullScreen="false"
        :beforeCalling="beforeCalling"
        :afterCalling="afterCalling"
        :onMinimized="onMinimized"
        :onMessageSentByMe="onMessageSentByMe"
      />
      <!-- <TUICallKit
        :allowedMinimized="true"
        :allowedFullScreen="true"
        :beforeCalling="beforeCalling"
        :afterCalling="afterCalling"
        :onMinimized="onMinimized"
      /> -->

    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { TUIEnv } from "@/TUIKit/TUIPlugin"
import { handleErrorPrompts } from "@/TUIKit/TUIComponents/container/utils"
import { useUserStore } from "@/stores/userStore"
import { loginTUIKit } from "@/plugins/TUIKit"


const userStore = useUserStore()

const data = reactive({
  env: TUIEnv(),
  currentModel: "conversation",
  showCall: false,
  showCallMini: false,
})


const TUIServer = (window as any)?.TUIKitTUICore?.TUIServer
const handleCurrentConversation = (value: string) => {
  data.currentModel = value ? "message" : "conversation"
}
// beforeCalling：在拨打电话前与收到通话邀请前执行
const beforeCalling = (type: string, error: any) => {
  if (error) {
    handleErrorPrompts(error, type)
    return
  }
  data.showCall = true
}
// afterCalling：结束通话后执行
const afterCalling = () => {
  data.showCall = false
  data.showCallMini = false
}
// onMinimized：组件切换最小化状态时执行
const onMinimized = (oldMinimizedStatus: boolean, newMinimizedStatus: boolean) => {
  data.showCall = !newMinimizedStatus
  data.showCallMini = newMinimizedStatus
}
// onMessageSentByMe：在整个通话过程内发送消息时执行
const onMessageSentByMe = async (message: any) => {
  TUIServer?.TUIChat?.handleMessageSentByMeToView(message)
  return
}

watch(() => userStore.user, (user) => {
  console.log(user)
  if (user) {
    console.log(user)
    loginTUIKit(user?.id, user?.usersign)
  }
}, {
  deep: true,
  immediate: true,
})



watch(() => TUIServer?.TUIConversation, () => {
  // console.log(TUIServer?.getConversationProfile())

  console.log(TUIServer?.TUIConversation)
}, {
  deep: true,
  immediate: true
})
onMounted(() => {
  // document.addEventListener('keydown', (event) => {
  //   //发送自定义信息
  //   TUIServer?.TUIChat?.sendCustomMessage(customMsg)
  // })

})
</script>

<style scoped>
.home-TUIKit-main {
  display: flex;
  height: 100vh;
  padding: 50px 100px;
  box-sizing: border-box;
  overflow: hidden;
}

.home-TUIKit-main-mobile{
  display: flex;
  height: 100vh;
}

.search {
  padding: 12px;
}

.conversation {
  min-width: 285px;
  flex: 0 0 24%;
  border-right: 1px solid #f4f5f9;
}

.conversation-h5 {
  flex: 1;
  border-right: 1px solid #f4f5f9;
}

.TUIKit-container {
  display: flex;
  flex: 1;
  height: 100%;
  position: relative;
  border: 1px solid #cccccc;
  
  box-shadow: 16px 16px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat {
  flex: 1;
  height: 100%;
  position: relative;
}

.callkit-drag-container {
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 300px);
  width: 400px;
  height: 600px;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border: 1px solid #000;
}

.callkit-drag-container-mini {
  position: fixed;
  width: 168px;
  height: 56px;
  right: 120px;
  top: 70px;
}

.callkit-dialog {
  height: 600px;
  width: 400px;
}
</style>
