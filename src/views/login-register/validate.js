export const validateUsername = (val) => {
  if (!val) return '用户名为必填的'
  if (val.length < 3 || val.length > 12) return '用户名长度为3-12位'
  return true
}
export const validatePassword = (val) => {
  if (!val) return '密码为必填的'
  if (val.length < 6 || val.length > 12) return '密码长度为6-12位'
  return true
}
export const validateConfirmPassword = (val, password) => {
  if (val !== password[0]) {
    return '两次密码输入不一致'
  }
  return true
}
