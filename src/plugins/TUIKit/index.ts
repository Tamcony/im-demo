import { useUserStore } from '@/stores/userStore'
import type { App } from 'vue'
import { TUIComponents, TUICore, genTestUserSig } from '@/TUIKit'
import { TUICallKit } from '@tencentcloud/call-uikit-vue'

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
  if(localStorage.getItem('IM_USERID')&&localStorage.getItem('IM_USERSIG')){
    loginTUIKit(localStorage.getItem('IM_USERID') as string,localStorage.getItem('IM_USERSIG') as string)
  }
  app.use(TUIKit)
}
