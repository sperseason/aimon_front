import request from '@/utils/request'
export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}
export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
export const registerUser = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}
/**
 * 修改用户信息
 * @returns
 */
export const putProfile = (data) => {
  return request({
    url: '/user/profile',
    method: 'PUT',
    data
  })
}
export const getSts = (data) => {
  return request({
    url: '/user/sts',
    data
  })
}
/**
 * 微信登录前置数据获取
 */
export const getWXLoginData = () => {
  return request({
    url: '/sys/wxlogin/data'
  })
}

/**
 * 获取微信登录的 access_token
 */
export const getWXLoginToken = (appid, secret, code) => {
  return request({
    url: '/sys/wxlogin/access_token',
    params: {
      appid,
      secret,
      code
    }
  })
}

/**
 * 获取微信登录的 用户数据
 */
export const getWXLoginUserInfo = (accessToken, openid) => {
  return request({
    url: '/sys/wxlogin/userinfo',
    params: {
      accessToken,
      openid
    }
  })
}
