import { axios } from './axios'
import { handleError } from '@/utils/handlerError'

export const useFans = () => {
  const getFans = async (id:string, p: number = 1) => {
    try {
      const res = await axios.get('/public/index.php', {
        params: {
          service: 'User.getFansList',
          uid:id,
          touid:id,
          p
        }
      })
      const fansList = res.data.info.map(item => {
        return {
          "userID": item.id,
          "nick": item.user_nickname,
          "gender": item.sex,
          "birthday": item.birthday,
          //FIXME 这里location不知道是啥
          "location": item.area,
          "selfSignature": item.signature,
          //FIXME 这里的allowType不知道是啥
          "allowType": "AllowType_Type_AllowAny",
          //FIXME 这里的language没找到
          "language": 0,
          "avatar": item.avatar,
          //FIXME 以下都没找到
          "messageSettings": 0,
          "adminForbidType": "AdminForbid_Type_None",
          "level": 0,
          "role": 0,
          "lastUpdatedTime": 0,
          "profileCustomField": []
        }
      })
      return fansList
    } catch (err) {
      handleError(err)
    }
  }
  return {
    getFans
  }
}
