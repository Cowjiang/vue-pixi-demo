// 获取assets静态资源
export const getAssetsFile = (url: string) => new URL(`../../assets/${url}`, import.meta.url).href

// 图片预加载
export const imagePreloader = (imageList: Array<string>): Promise<void[]> => {
  const preloadPromise = (image: string) => new Promise<void>((resolve, reject) => {
    const imgTemp = new Image()
    imgTemp.src = image
    imgTemp.onload = (): void => resolve()
    imgTemp.onerror = (): void => reject()
  })
  let promiseList: Array<Promise<void>> = []
  imageList.map(img => promiseList.push(preloadPromise(img)))
  return Promise.all(promiseList)
}