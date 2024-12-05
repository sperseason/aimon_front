<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon name="qq" class="w-4 cursor-pointer" @click="onQQlogin">
    </m-svg-icon>
  </div>
</template>
<script>
const QQ_LOGIN_URL =
  'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'
</script>
<script setup>
import { onMounted } from 'vue'
import brodacast from './brodacast'
import { oauthLogin } from './oauth'
const onQQlogin = () => {
  openQQWindow()
}
const openQQWindow = () => {
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )
  brodacast.wait().then((oauthObj) => {
    brodacast.clear()
    oauthLogin('QQ', oauthObj)
  })
}
onMounted(() => {
  QC.Login(
    {
      btnId: 'qqLoginBtn'
    },
    (data, opts) => {
      console.log('QQ登录成功')
      // 1. 注销登录，否则在后续登录中会直接触发该回调
      QC.Login.signOut()
      // 2. 获取当前用户唯一标识，作为判断用户是否已注册的依据
      const accessToken = /access_token=((.*))&expires_in/.exec(
        window.location.hash
      )[1]
      // 3. 拼接请求对象
      const oauthObj = {
        nickname: data.nickname,
        figureurl_qq_2: data.figureurl_qq_2,
        accessToken
      }
      brodacast.send(oauthObj)
      oauthLogin('QQ', oauthObj)
      window.close()
    }
  )
})
</script>
<style lang="scss" scoped></style>
