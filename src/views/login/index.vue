<template>
  <div class="w-screen h-screen flex items-center justify-center bg-#f5f5f5">
    <div
      class="w-400 min-h-400 flex items-center justify-between flex-col py-32 px-20  border-1 border-solid bg-#fff border-#f8f8f8 rounded-24 shadow-xl"
    >
      <div class="flex flex-col gap-32 items-center">
        <span class="font-bold">注册登录后体验更多精彩瞬间</span>
        <a-input-group class="w-full flex flex-row gap-4">
          <a-select
            v-model:value="areaPrefix"
            class="w-1/5"
            :placement="'bottomLeft'"
            :dropdownMatchSelectWidth="false"
            :labelInValue="false"
            :options="options"
            :optionLabelProp="'value'"
          >

          </a-select>
          <a-input
            placeholder="请输入手机号码"
            v-model:value.trim="phoneNum"
            :maxlength="11"
            class="w-4/5"
          ></a-input>
        </a-input-group>
        <a-input-group class="w-full flex flex-row gap-4">
          <a-input
            placeholder="请输入验证码"
            v-model:value="code"
            class="w-3/5"
          ></a-input>
          <a-button
            class="w-2/5"
            @click="handleSendCode"
          >获取验证码</a-button>
        </a-input-group>
      </div>
      <div class=" flex-col justify-center gap-16">
        <a-button @click="handleLogin">立即登录</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { useSendCode, useLogin } from '@/apis/useLogin'

const { sendCode } = useSendCode()
const { login } = useLogin()
const router = useRouter()

const areaPrefix = ref('86')
const phoneNum = ref('')
const code = ref('')
const options = [
  { value: '86', label: '+86 中国' },
  { value: '1', label: '+1 美国' },
  { value: '44', label: '+44 英国' },
  { value: '33', label: '+33 法国' },
  { value: '81', label: '+81 日本' },
  { value: '82', label: '+82 韩国' },
  { value: '49', label: '+49 德国' },
  { value: '7', label: '+7 俄罗斯' },
  { value: '39', label: '+39 意大利' },
  { value: '52', label: '+52 墨西哥' }
]

const phoneCheck = () => {
  const reg = /^1[3-9]\d{9}$/
  console.log(phoneNum.value)
  if (!reg.test(phoneNum.value)) {
    message.error('请输入正确的手机号码')
    return false
  } else {
    return true
  }
}

const handleSendCode = async () => {
  if (!phoneCheck()) {
    return
  }
  const data = await sendCode(
    phoneNum.value,
    areaPrefix.value
  )
  message.info(data.msg)


}

const handleLogin = async () => {
  if (!phoneCheck()) {
    return
  }
  if (!code.value) {
    message.error('请输入验证码')
    return
  }
  await login(
    phoneNum.value,
    areaPrefix.value
  )
  router.push('/chat')
}

</script>

<style lang="less" scoped></style>
