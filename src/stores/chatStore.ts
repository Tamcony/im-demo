import { defineStore } from "pinia"

export const useChatStore = defineStore('chatStore',()=>{
  const chat = ref()
  return {
    chat
  }
})