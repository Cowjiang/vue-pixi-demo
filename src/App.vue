<template>
  <div class="w-screen h-screen overflow-hidden">
    <MainFrame v-if="isMobile"/>
    <PcFrame v-else/>
  </div>
</template>

<script setup lang="ts">
    //@ts-ignore
    import {useScreenOrientation, useWindowSize, useDebounceFn} from '@vueuse/core'
    import {useStore} from '@/store'
    import MainFrame from '@/components/main-frame'
    import PcFrame from '@/components/pc-frame'

    const store = useStore()
    const {isMobile, screenOrientation} = storeToRefs(store)

    //获取设备类型
    const getDeviceType = (): string => {
        const flag = (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(navigator.userAgent.toLowerCase())
        store.isMobile = flag
        return flag ? 'mobile' : 'pc'
    }

    // 获取屏幕方向
    const getScreenOrientation = (): void => {
        const {isSupported, angle} = useScreenOrientation()
        isSupported && (store.screenOrientation = [-90, 90].includes(angle.value) ? 'landscape' : 'portrait') || (store.screenOrientation = 'unsupported')
        console.log('[screenOrientation]', store.screenOrientation)
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
        location.reload()
    })
    window.addEventListener('resize', handleResize)

    watch(
        () => screenOrientation.value,
        () => {
            location.reload()
        }
    )
</script>

<style>
</style>
