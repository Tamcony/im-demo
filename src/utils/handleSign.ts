import md5 from 'js-md5'

export const generateSign = (mobile:string,time:number) => {
  const salt = '562d4226cb2a2b4f74b3ef4340828b5d'

  // 将请求参数按照参数名的字典序排序，并按照 key1=value1&key2=value2 的格式拼接成字符串

  const sortedParams = `mobile=${mobile}&time=${time}&${salt}`

  const signature = md5(sortedParams)

  console.log(signature) // 输出生成的签名
  return signature
}
