export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}
export const getAllImg = (itemElements) => {
  return getImgElements(itemElements).map((img) => {
    return img.src
  })
}
/**
 * 监听图片数组加载完成
 */
export const onComplateImgs = (imgs) => {
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((reslove, reject) => {
      // 处理img的加载情况
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        reslove({
          img,
          index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}
/**
 * 返回列高对象中最小的高度
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
export const getMinHeightColumn = (columnHeightObj) => {
  const minHegiht = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHegiht
  })
}
