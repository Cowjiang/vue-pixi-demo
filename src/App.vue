<template>
  <div class="w-screen h-screen overflow-hidden">
    <MainFrame v-if="isMobile" ref="mainFrame"/>
    <PcFrame v-else/>
    <screenOrientationFrame v-if="showScreenOrientationFrame"/>
  </div>
</template>

<script setup lang="ts">
  import {useWindowSize, useDebounceFn} from '@vueuse/core'
  import {useStore} from '@/store'
  import MainFrame from '@/components/main-frame'
  import PcFrame from '@/components/pc-frame'
  import ScreenOrientationFrame from '@/components/screen-orientation-frame'

  const store = useStore()
  const {isMobile, screenOrientation, WeixinJSBridgeReady} = storeToRefs(store)

  const mainFrame = ref<any>(null)
  let screenOrientationTemp: string = ''
  const showScreenOrientationFrame = ref<boolean>(false)

  //获取设备类型
  const getDeviceType = (): string => {
    const flag = (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(navigator.userAgent.toLowerCase())
    store.isMobile = flag
    return flag ? 'mobile' : 'pc'
  }

  // 获取屏幕方向
  const getScreenOrientation = (): void => {
    const screenOrientation = window.orientation
    const orientation = [-90, 90].includes(screenOrientation) ? 'landscape' : 'portrait'
    store.screenOrientation = orientation
    !screenOrientationTemp && (screenOrientationTemp = orientation)
    // const {isSupported, angle} = useScreenOrientation()
    // isSupported && (store.screenOrientation = [-90, 90].includes(angle.value) ? 'landscape' : 'portrait') || (store.screenOrientation = 'unsupported')
    console.log('[screenOrientation]', store.screenOrientation)
    // !!mainFrame.value && mainFrame.value.initApp()
  }
  getScreenOrientation()
  window.addEventListener('orientationchange', getScreenOrientation)

  // 获取窗口大小
  const getWindowSize = () => {
    const {width, height} = useWindowSize()
    store.windowWidth = width.value
    store.windowHeight = height.value
    getDeviceType()
  }
  getWindowSize()

  //屏幕大小改变
  const handleResize = useDebounceFn(() => {
    // location.reload()
  })
  window.addEventListener('resize', handleResize)

  document.addEventListener('WeixinJSBridgeReady', (): void => {
    WeixinJSBridgeReady.value = true
  }, false)

  watch(
    () => screenOrientation.value,
    () => {
      // location.reload()
      showScreenOrientationFrame.value = screenOrientation.value !== screenOrientationTemp;
    }
  )

  onMounted(() => {
    ((win, doc, dw) => {
      const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        reCalc = () => {
          const {clientWidth, clientHeight} = docEl
          const clientMaxWidth = clientWidth > dw ? clientHeight : clientWidth
          if (!clientMaxWidth) return
          docEl.style.fontSize = `${clientMaxWidth / (dw / 100)}px`
        }
      if (!doc.addEventListener) return
      win.addEventListener(resizeEvt, reCalc, false)
      doc.addEventListener('DOMContentLoaded', reCalc, false)
    })(window, document, 640)
  })
</script>

<style>
  body {
    background-color: #5da9e2;
  }
</style>