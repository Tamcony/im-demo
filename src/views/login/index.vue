<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div
      class="w-400 min-h-400 flex items-center justify-between flex-col py-32 px-20  border-1 border-solid border-#f8f8f8 rounded-3xl shadow-xl"
    >
      <div class="flex flex-col gap-32 items-center">
        <span class="font-bold">注册登录后体验更多精彩瞬间</span>
        <a-input-group class="w-full flex flex-row">
          <a-select
            v-model:value="areaPrefix"
            class="w-2/5"
          >
            <a-select-option value="+86"></a-select-option>
            <a-select-option value="+00"></a-select-option>
          </a-select>
          <a-input
            placeholder="请输入手机号码"
            v-model.trim="phoneNum"
            class="w-3/5"
          ></a-input>
        </a-input-group>
        <a-input-group class="w-full flex flex-row">
          <a-input
            placeholder="请输入验证码"
            class="w-3/5"
          ></a-input>
          <a-button class="w-2/5" @click="handleSendCode">获取验证码</a-button>
        </a-input-group>
      </div>
      <div class=" flex-col justify-center gap-16">
        <a-button @click="handleLogin">立即登录</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const areaPrefix = ref('+86')
const phoneNum = ref('')

const phoneCheck = () => {
  //TODO 校验手机号
}

const handleSendCode = () => {
  //TODO 发送验证码
  
}

const handleLogin = () => {
  //TODO 登录
}

</script>

<style lang="less" scoped></style>
