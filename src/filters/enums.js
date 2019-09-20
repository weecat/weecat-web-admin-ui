/**
 * 星翼智慧硬件产品协议总表V1.0.6
 * @type {{unLockTypes: *[], deviceTypes: *[]}}
 */
export const Enums = {
  /**
   * 开门类型 旧版本中卡片类型
   */
  unLockTypes: [
    { key: 0, name: '未知/无用' },
    { key: 1, name: 'M1卡' },
    { key: 2, name: 'ISO14443A卡，重庆通卡，CPU卡' },
    { key: 3, name: 'ISO15693卡，TSL NFC卡' },
    { key: 4, name: '身份证' },
    { key: 5, name: '身份证' },
    { key: 6, name: '身份证' },
    { key: 7, name: '身份证' },
    { key: 16, name: '手机NFC' },
    { key: 32, name: '开门密码' },
    { key: 33, name: '配对密码' },
    { key: 34, name: '单次密码' },
    { key: 35, name: '固定密码' },
    { key: 36, name: '远程一次性密码' },
    { key: 37, name: '远程时间段密码' },
    { key: 38, name: '远程多次密码' },
    { key: 39, name: '动态密码' },
    { key: 48, name: '门内开关' },
    { key: 64, name: '指纹识别' },
    { key: 65, name: '人脸识别' },
    { key: 66, name: '虹膜识别' },
    { key: 80, name: '手机蓝牙开门' },
    { key: 81, name: '蓝牙纽扣开门' },
    { key: 82, name: '远程开门' },
    { key: 160, name: '一次性密码' },
    { key: 161, name: '时间段密码' },
    { key: 162, name: '多次+时间段密码' },
    { key: 163, name: '动态密码' },
    { key: 164, name: '动态密码+多次' },
    { key: 253, name: '系统状态存取' },
    { key: 254, name: '测试' },
    { key: 254, name: '未用' }
  ],
  /**
   * 设备类型描述
   */
  deviceTypes: [
    { type: 'NULL', key: 0, name: '未知设备' },
    { type: 'LOCAL_DEV', key: 1, name: '本地设备' },
    { type: 'PANEL', key: 2, name: '面板' },
    { type: 'MODULE', key: 3, name: '模块' },
    { type: 'SOCKET', key: 16, name: '插座' },
    { type: 'CURTAIN', key: 17, name: '窗帘' },
    { type: 'SWITCH1', key: 18, name: '单开关' },
    { type: 'SWITCH3', key: 19, name: '3开关' },
    { type: 'MJ_LOCK', key: 32, name: '门禁' },
    { type: 'CORE_LOCK', key: 33, name: '锁芯锁' },
    { type: 'DOOR_LOCK', key: 34, name: '门锁' },
    { type: 'HAND_LOCK', key: 35, name: '拉手锁' },
    { type: 'PARKING_LOCK', key: 36, name: '车位锁' },
    { type: 'CABINET_LOCK', key: 37, name: '机柜锁' },
    { type: 'NB', key: 38, name: 'NB设备' },
    { type: 'Strong Box', key: 39, name: '保险柜' },
    { type: 'SENSOR', key: 48, name: '传感器' },
    { type: 'ALARM', key: 49, name: '报警器' },
    { type: 'IR_COUNT', key: 50, name: '人口出入统计器' },
    { type: 'IRIS', key: 51, name: '虹膜' },
    { type: 'REMT', key: 64, name: '遥控器(学习型)' },
    { type: 'CENT_AC', key: 65, name: '中央空调控制器' },
    { type: 'LAMP', key: 80, name: '灯(单色)' },
    { type: 'COLOR_LAMP', key: 81, name: '彩色灯' },
    { type: 'GATEWAY', key: 96, name: '集中器' }
  ]
}
