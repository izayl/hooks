import { useState } from 'react'

interface SwitchHook {
  /**
   * 当前开关状态的值
   */
  sw: boolean

  /**
   * 将当前开关打开
   */
  on: VoidFunction

  /**
   * 将当前开关关闭
   */
  off: VoidFunction

  /**
   * 将当前开关切换
   */
  toggle: VoidFunction
}

/**
 * 状态切换 Custom Hook
 * @param initial [boolean] 初始状态
 *
 * @returns [SwitchHook]
 */
export const useSwitch = (initial: boolean): SwitchHook => {
  const [sw, setSw] = useState<boolean>(initial)

  const on = () => setSw(true)
  const off = () => setSw(false)
  const toggle = () => setSw(!sw)

  return {
    sw,
    toggle,
    on,
    off,
  }
}
