<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <keep-alive :include="virualTaskStack">
        <component
          :is="Component"
          :class="{ 'fixed left-0 top-0 w-screen z-50': isAnimation }"
          :key="$route.fullPath"
        ></component>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script>
const NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'
const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK]
</script>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const props = defineProps({
  //路由的跳转类型，进入组件、离开组件
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const res = ROUTER_TYPE_ENUM.includes(val)
      if (!res) {
        throw new Error(
          `routerType 参数错误，请传入 ${ROUTER_TYPE_ENUM.join('、')} 中的值`
        )
      }
      return res
    }
  },
  // 首页组件名称
  mainComponentName: {
    type: String,
    required: true
  }
})
const transitionName = ref('')
router.beforeEach((to, from) => {
  transitionName.value = props.routerType
  if (props.routerType === ROUTER_TYPE_PUSH) {
    virualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    virualTaskStack.value.pop()
  }
  if (to.name === props.mainComponentName) {
    clearTask()
  }
})
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}
const virualTaskStack = ref([props.mainComponentName])
const clearTask = () => {
  virualTaskStack.value = [props.mainComponentName]
}
</script>
<style lang="scss" scoped>
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.5s;
}
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.5s;
}
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.5s;
}
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.5s;
}
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
