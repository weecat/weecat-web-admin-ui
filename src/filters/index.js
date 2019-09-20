import { Enums } from './enums'
/**
 * 根据后端放回的枚举 解析开门方式(卡片类型)
 * @param type
 */
export function parseUnLockType(value) {
  if (typeof value === 'undefined' ||
    value === '' ||
    value === null ||
    value === 'undefined') {
    return '未知/无用'
  } else {
    let cardType = '未知/无用'
    Enums.unLockTypes.forEach(item => {
      if (item.key === value) {
        cardType = item.name
      }
    })
    return cardType
  }
}

/**
 * 解析设备类型描述信息
 * @param value
 * @returns {string}
 */
export function parseDeviceType(value) {
  if (typeof value === 'undefined' ||
    value === '' ||
    value === null ||
    value === 'undefined') {
    return '未知/无用'
  } else {
    let type = '未知/无用'
    Enums.deviceTypes.forEach(item => {
      if (item.key === value) {
        type = item.name
      }
    })
    return type
  }
}
