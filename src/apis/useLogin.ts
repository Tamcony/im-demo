import { axios } from './axios'
import { handleError } from '@/utils/handlerError'
import dayjs from 'dayjs'
import { generateSign } from '@/utils/handleSign'
import { useUserStore } from '@/stores/userStore'
import { v4 } from 'uuid'

export const useSendCode = () => {
  const sendCode = async (phone: string, countryCode: string) => {
    try {
      const time = dayjs().unix()
      const res = await axios.get('/public/index.php', {
        params: {
          service: 'Login.getLoginCode',
          mobile: phone,
          country_code: countryCode,
          time,
          sign: generateSign(phone, time)
        }
      })
      return res.data
    } catch (error) {
      handleError(error)
    }
  }
  return {
    sendCode
  }
}

export const useLogin = () => {
  const userStore = useUserStore()
  const login = async (phone: string, countryCode: string, code: string = '123456') => {
    try {
      const res = await axios.get('/public/index.php', {
        params: {
          service: 'Login.userLogin',
          user_login: phone,
          code,
          source: 'webim',
          mobileid: v4(),
          country_code: countryCode
        }
      })
      userStore.user = res.data.info[0]
      console.log(res.data.info[0], userStore.user)
      const token = res.data.info[0]?.token
      sessionStorage.setItem('IM_TOKEN', token)
      sessionStorage.setItem('IM_USERID', res.data.info[0].id)
      sessionStorage.setItem('IM_USERSIG', res.data.info[0].usersign)
      return res.data
    } catch (error) {
      handleError(error)
    }
  }
  return {
    login
  }
}
