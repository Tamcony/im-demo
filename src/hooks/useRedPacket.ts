

const redPacketPrivate = {
  data: {
    amount: 10,
    businessID: 'red_packet',
    count: 1,
    desc: '恭喜发财，大吉大利',
    log: {},
    redpackid: '',
    text: '拼手气红包',
    version: 4
  }
}
const redPacketGroup = {
  data: {
    amount: 20,
    businessID: 'red_packet',
    count: 10,
    desc: '恭喜发财，大吉大利',
    log: {},
    redpackid: '',
    text: '拼手气红包',
    version: 4
  }
}


export const useRedPacket = () => {
  const setRedPacket = (type: number) => {
    switch (type) {
      case 0:
        return redPacketGroup
      case 1:
        return redPacketPrivate
      default:
        return redPacketPrivate
    }
  }
  return {
    setRedPacket
  }
}
