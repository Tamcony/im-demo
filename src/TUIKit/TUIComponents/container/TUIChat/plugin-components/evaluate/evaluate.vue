<template>
  <div
    class="evaluate"
    :class="[isH5 && 'evaluate-H5']"
  >
    <i
      class="icon icon-evaluate"
      title="服务评价"
      @click.stop="toggleShow"
    ></i>
    <!-- <main class="evaluate-main" v-if="show && !isMute">
      <div class="evaluate-main-content" ref="dialog">
        <header>
          <aside>
            <h1>{{ $t('Evaluate.请对本次服务进行评价') }}</h1>
            <p v-if="isH5">
              {{ $t('Evaluate.服务评价工具') }}（{{ $t('Evaluate.使用')
              }}<a @click="openLink(Link.customMessage)">{{ $t(`Evaluate.${Link.customMessage.label}`) }}</a
              >{{ $t('Evaluate.搭建') }}）
            </p>
          </aside>
          <span v-if="isH5" class="close" @click.stop="toggleShow">关闭</span>
        </header>
        <div class="evaluate-content">
          <ul class="evaluate-list">
            <li
              class="evaluate-list-item"
              :class="[index < num && 'small-padding', isH5 && 'evaluate-item']"
              v-for="(item, index) in list"
              :key="index"
              @click.stop="select(item, index)"
            >
              <i class="icon icon-star-light" v-if="index < num"></i>
              <i class="icon icon-star" v-else></i>
            </li>
          </ul>
          <textarea v-model="options.data.comment"></textarea>
          <div class="evaluate-main-footer">
            <button class="btn" @click="submit">{{ $t('Evaluate.提交评价') }}</button>
          </div>
        </div>
        <footer v-if="!isH5">
          {{ $t('Evaluate.服务评价工具') }}（{{ $t('Evaluate.使用')
          }}<a @click="openLink(Link.customMessage)">{{ $t(`Evaluate.${Link.customMessage.label}`) }}</a
          >{{ $t('Evaluate.搭建') }}）
        </footer>
      </div>
    </main> -->
    <main
      v-if="show && !isMute"
      class="h-screen w-screen fixed top-0  left-0 flex items-center justify-center cursor-default"
    >
      <div
        @click="$event => $event.stopPropagation()"
        class="h-400 w-300 !p-16 bg-#f2f3f5 rounded-16 flex flex-col items-center gap-20 shadow-xl"
      >
        <div class="w-full h-20 items-center flex justify-center">发红包</div>
        <div>
          <a-radio-group v-model:value="redPacketForm.type">
            <a-radio value="1">单聊红包</a-radio>
            <a-radio value="0">群聊红包</a-radio>
          </a-radio-group>
        </div>
        <div class="w-full flex !px-16 flex-row h-40 text-nowrap bg-#fff p-8 rounded-3xl items-center">
          <span class="text-12">红包个数</span>
          <a-input
            class="border-none !shadow-none text-right"
            v-model:value="redPacketForm.redPacketNum"
            v-if="redPacketForm.type == '0'"
            :maxlength="3"
          ></a-input>
          <span
            class="w-full text-right py-4 px-11 text-13"
            v-else
          >
            1
          </span>
        </div>
        <div class="w-full flex !px-16 flex-row h-40 text-nowrap bg-#fff p-8 rounded-3xl items-center">
          <span class="text-12">总金额(云票)</span>
          <a-input
            class="border-none !shadow-none text-right"
            v-model:value="redPacketForm.redPacketMoney"
            :maxlength="3"
          ></a-input>
        </div>
        <a-input
          class="w-full h-50 border-none !shadow-none"
          placeholder="恭喜发财,大吉大利"
          :maxlength="30"
        ></a-input>
        <div class="w-full h-100 p-16 justify-center items-center flex flex-col gap-8">
          <span class="text-20 font-bold">{{ redPacketForm.redPacketMoney * redPacketForm.redPacketNum || 0 }} 云票</span>
          <div><a-button class="!text-#fff !bg-#fc1944 w-100 !border-none" @click="handleSend">发送</a-button></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { onClickOutside } from '@vueuse/core'
import { defineComponent, reactive, watchEffect, toRefs, ref } from 'vue'
import Link from '../../../../../utils/link'
import constant from '../../../constant'
import { handleOptions } from '../../utils/utils'
import { message } from 'ant-design-vue'

const Evaluate = defineComponent({
  type: 'custom',
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    isMute: {
      type: Boolean,
      default: () => false,
    },
    isH5: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props: any, ctx: any) {
    const data = reactive({
      link: 'https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#createCustomMessage',
      list: 5,
      show: false,
      isMute: false,
      options: {
        data: {
          businessID: constant.typeEvaluate,
          version: 1,
          score: '',
          comment: '',
        },
        description: '对本次的服务评价',
        extension: '对本次的服务评价',
      },
      num: 0,
    })

    const redPacketForm = ref({
      redPacketNum: 1,
      redPacketMoney: 0,
      type: '1',
    })

    const dialog: any = ref()

    onClickOutside(dialog, () => {
      data.show = false
    })

    watchEffect(() => {
      data.show = props.show
      data.isMute = props.isMute
    })

    const toggleShow = () => {
      data.show = !data.show
      if (data.show) {
        data.options = {
          data: {
            ...handleOptions(constant.typeEvaluate, 1, { score: '', comment: '' }),
          },
          description: '对本次的服务评价',
          extension: '对本次的服务评价',
        }
        data.num = 0
      }
    }

    const select = (item: any, index: number) => {
      data.num = index + 1;
      (data.options.data as any).score = `${data.num}`
    }

    const submit = () => {
      Evaluate.TUIServer.sendCustomMessage(data.options)
      toggleShow()
    }
    const openLink = (type: any) => {
      window.open(type.url)
    }
    watchEffect(() => {

    })
    watch(() => redPacketForm.value.type, type => {
      if (type == '1') {
        redPacketForm.value.redPacketNum = 1
      }
    })

    // watchEffect(() => {
    //   if (!redPacketForm.value.redPacketNum) {
    //     redPacketForm.value.redPacketNum = 1
    //   } else if (redPacketForm.value.redPacketNum < 1) {
    //     redPacketForm.value.redPacketNum = 1
    //   } else if (redPacketForm.value.redPacketNum > redPacketForm.value.redPacketMoney) {
    //     redPacketForm.value.redPacketNum = Math.max(redPacketForm.value.redPacketMoney, 1)
    //   }
    // })

    const handleSend = () => {
      if (!redPacketForm.value.redPacketNum || !redPacketForm.value.redPacketMoney) {
        message.error('请输入红包金额和个数')
        return 
      }
      if(redPacketForm.value.redPacketNum > redPacketForm.value.redPacketMoney){
        message.error('红包个数不能大于红包金额')
        return 
      }
    }
    return {
      ...toRefs(data),
      toggleShow,
      select,
      submit,
      dialog,
      Link,
      openLink,
      redPacketForm,
      handleSend
    }
  },
})
export default Evaluate
</script>

<style lang="scss" scoped src="./style/index.scss"></style>
