import _axios, { type AxiosResponse } from 'axios'

interface CmdData {
  ret: number
  data: any
  msg: string
}

export interface CmdError {
  isCmdError: true
  ret: number
  data: any
  msg: string
}

const instance = _axios.create({
  baseURL: '/api',
})

instance.interceptors.response.use((response: AxiosResponse<CmdData>) => {
  if (response.data.ret !== 200) {
    return Promise.reject({
      isCmdError: true,
      ...response.data,
    })
  }
  response.data = response.data.data
  return response
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('IM_TOKEN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const axios = instance
