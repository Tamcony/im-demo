import { useUserStore } from '@/stores/userStore'
import type { App } from 'vue'
import { TUIComponents, TUICore, genTestUserSig } from '@/TUIKit'
import { TUICallKit } from '@tencentcloud/call-uikit-vue'
import { useChatStore } from '@/stores/chatStore'


const SDKAppID = 1400817730 // Your SDKAppID
const secretKey = '7db4d4fbd155c2d2714bfd9979285978201b818b0e3c859d5dbc6c2eb99373be' //Your secretKey

// init TUIKit
const TUIKit = TUICore.init({
  SDKAppID
})


export const loginTUIKit = (userID: string, userSig: string) => {
  TUIKit.login({
    userID: userID,
    userSig: userSig
  })
}

export const setupTUIKit = (app: App) => {
  // TUIKit add TUIComponents
  TUIKit.use(TUIComponents)
  // TUIKit add TUICallKit
  TUIKit.use(TUICallKit)
  if (sessionStorage.getItem('IM_USERID') && sessionStorage.getItem('IM_USERSIG')) {
    loginTUIKit(sessionStorage.getItem('IM_USERID') as string, sessionStorage.getItem('IM_USERSIG') as string)
  }
  const chatStore = useChatStore()
  chatStore.chat = TUIKit
  app.use(TUIKit)
}
