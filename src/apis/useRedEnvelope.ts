import { axios } from '@/apis/axios'

export const useRedEnvelope = () => {
  const authRedPacket = async (userId: string, reciveId: string, type: number, num: number, totalmoney: number) => {
    try {
      await axios.get('/public/index.php', {
        params: {
          service: `Hongbao.send`,
          uid: userId,
          token: (sessionStorage.getItem('IM_TOKEN') as string) || '',
          type,
          num,
          totalmoney,
          touid: type == 0 ? 0 : reciveId
        }
      })
    } catch (error) {}
  }
  return {
    authRedPacket
  }
}
