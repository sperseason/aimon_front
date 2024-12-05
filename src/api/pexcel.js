import request from '@/utils/request'
export const getPexlesList = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}
export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}
export const getThemes = () => {
  return request({
    url: '/pexels/themes'
  })
}
export const getPexelsFromId = (id) => {
  return request({
    url: `/pexels/${id}`
  })
}
