import { h, render } from 'vue'
import confirmComponent from './index.vue'
/**
 * 展示confirm弹框
 * @param {*} title 标题（如果用户没有传递内容，那么标题被作为内容)
 * @param {*} content 内容(如果没有title,那么content作为第一个参数传入)
 * @param {*} cancelText 取消按钮的文本
 * @param {*} confirmText 确认按钮的文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      ;(content = title), (title = '')
    }
    /**
     * 关闭的回调
     */
    const close = () => {
      render(null, document.body)
    }
    /**
     * 取消按钮的回调
     */
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }
    /**
     * 确定按钮的回调
     */
    const confirmHandler = () => {
      resolve()
    }
    // 生成vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })
    render(vnode, document.body)
  })
}
