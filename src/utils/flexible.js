import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
const { width } = useWindowSize()
/**
 * 判断是否是移动端终端
 */
export const isMoblieTerminal = computed(() => {
  // return width.value < PC_DEVICE_WIDTH
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})
/**
 * 动态指定rem基准值，最大为40px
 */
export const useREM = () => {
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
