<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      class="h-3 w-3 p-0.5 m-1 ml-auto"
      v-if="isMoblieTerminal"
      name="close"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      @click="onConfirm"
      :loading="loading"
      >确定</m-button
    >
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { putProfile } from '@/api/sys.js'
const store = useStore()
const pcOption = {
  aspectRatio: 1
}
const mobileOption = {
  viewMode: 1,
  dragMode: 'move',
  aspectRatio: 1,
  cropBoxMovable: false,
  cropBoxResizable: false
}
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { ref, onMounted } from 'vue'
import { isMoblieTerminal } from '@/utils/flexible.js'
import { getOSSClient } from '@/utils/stas.js'
import { message } from '@/libs/index.js'
defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMoblieTerminal ? mobileOption : pcOption
  )
})
const loading = ref(false)
const onConfirm = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob((blob) => {
    // console.log(URL.createObjectURL(blob))
    putObjectToOss(blob)
  })
}
/**
 * 进行oss上传
 */
let ossClient = null
const putObjectToOss = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    const fileArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileArr[fileArr.length - 1]
    }`
    const res = await ossClient.put(`images/${fileName}`, file)
    onChanageAvatar(res.url)
  } catch (e) {
    message('error', e)
  }
}
const onChanageAvatar = async (avatar) => {
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar: avatar
  })
  await putProfile(store.getters.userInfo)
  message('success', '头像修改成功')
  loading.value = false
  close()
}
</script>
<style lang="scss" scoped></style>
