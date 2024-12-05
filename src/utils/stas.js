import OSS from 'ali-oss'
import { getSts } from '@/api/sys'
export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    region: 'oss-cn-beijing',
    // 'imooc-front'
    accessKeyId: res.Credentials.AccessKeyId,
    accessKeySecret: res.Credentials.AccessKeySecret,
    stsToken: res.Credentials.SecurityToken,
    bucket: 'imooc-front',
    refreshSTSToken: async () => {
      const res = await getSts()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      }
    },
    refreshSTSTokenInterval: 5 * 1000
  })
}
