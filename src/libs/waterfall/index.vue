<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px'
    }"
  >
    <!-- 数据渲染 -->
    <template v-if="colunmWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: colunmWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="colunmWidth" :index="index"></slot>
      </div>
    </template>
    <template v-else>加载中</template>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'
import {
  getImgElements,
  getAllImg,
  onComplateImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './util.js'
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 列数
  colunm: {
    type: Number,
    default: 2
  },
  // 列间距
  colunmSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})
const containerHeight = ref(0)
// 记录每列容器的高度
const colunmHeightObj = ref({})
const useColumnHeightObj = () => {
  colunmHeightObj.value = {}
  for (let i = 0; i < props.colunm; i++) {
    colunmHeightObj.value[i] = 0
  }
}
const containerTarget = ref(null)
const containerWidth = ref(0)
const containerLeft = ref(0)
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  containerLeft.value = parseFloat(paddingLeft)
  // 容器的宽度
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingRight) -
    parseFloat(paddingLeft)
}
// 计算列宽
const colunmWidth = ref(0)
// 列间距的合计
const colunmSpacingSum = computed(() => {
  return (props.colunm - 1) * props.colunmSpacing
})
const useColunmWidth = () => {
  useContainerWidth()
  colunmWidth.value =
    (containerWidth.value - colunmSpacingSum.value) / props.colunm
}
onMounted(() => {
  useColunmWidth()
})
// item 高度集合
let itemHeights = []
/**
 * 监听图片加载(需要图片预加载)
 */
const waitImgComplate = () => {
  itemHeights = []
  // 拿到所有的元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取到元素的img
  const imgElements = getImgElements(itemElements)
  const allImgs = getAllImg(imgElements)
  onComplateImgs(allImgs).then(() => {
    itemElements.forEach((item, index) => {
      itemHeights.push(item.offsetHeight)
    })
    // 渲染位置
    useItemLoaction()
  })
}
const useItemLoaction = () => {
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    increasingHeight(index)
  })
  containerHeight.value = getMaxHeight(colunmHeightObj.value)
}
/**
 * 返回下一个item的left
 */
const getItemLeft = () => {
  const colunm = getMinHeightColumn(colunmHeightObj.value)
  return (
    colunm * (colunmWidth.value + props.colunmSpacing) + containerLeft.value
  )
}
const getItemTop = () => {
  return getMinHeight(colunmHeightObj.value)
}
const increasingHeight = (index) => {
  const minHeight = getMinHeightColumn(colunmHeightObj.value)
  colunmHeightObj.value[minHeight] += itemHeights[index] + props.rowSpacing
}
/**
 * 不需要图片预加载
 */
const useItemHeight = () => {
  itemHeights = []
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  itemElements.forEach((item, index) => {
    itemHeights.push(item.offsetHeight)
  })
  useItemLoaction()
}
watch(
  () => props.data,
  (newValue, oldValue) => {
    nextTick(() => {
      const resetColumnHeight = newValue.every((item) => !item._style)
      if (resetColumnHeight) {
        useColumnHeightObj()
      }
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
/**
 * 重新构建瀑布流
 */
const reset = () => {
  setTimeout(() => {
    useColunmWidth()
    props.data.forEach((item) => {
      item._style = null
    })
  }, 200)
}
watch(
  () => props.colunm,
  (newValue, oldValue) => {
    if (props.picturePreReading) {
      colunmWidth.value = 0
      reset()
    } else {
      reset()
    }
  }
)
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
</script>
<style lang="scss" scoped></style>
