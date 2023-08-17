import { axios } from './axios'
import { handleError } from '@/utils/handlerError'
import dayjs from 'dayjs'
import { generateSign } from '@/utils/handleSign'
import { useUserStore } from '@/stores/userStore'

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
          source: 'h5',
          mobileid: '562d4226cb2a2b4f74b3ef4340828b5d',
          country_code: countryCode
        }
      })
      userStore.user = res.data.info[0]
      console.log(res.data.info[0],userStore.user)
      const token = res.data.info[0].token
      localStorage.setItem('IM_TOKEN', token)
      localStorage.setItem('IM_USERID', res.data.info[0].id)
      localStorage.setItem('IM_USERSIG', res.data.info[0].usersign)
      return res.data
    } catch (error) {
      handleError(error)
    }
  }
  return {
    login
  }
}
