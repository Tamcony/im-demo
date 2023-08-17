import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', ()=>{
  const TUIKit = ref()
  return {
    TUIKit
  }
})