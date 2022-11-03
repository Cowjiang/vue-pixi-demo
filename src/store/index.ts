import {defineStore} from 'pinia'
import Timeline = gsap.core.Timeline;

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    isMobile: false as boolean, //是否为移动设备
    WeixinJSBridgeReady: false as boolean, //微信JSBridgeReady状态
    windowWidth: 0 as number, //窗口宽度
    windowHeight: 0 as number, //窗口高度
    screenOrientation: 'unsupported' as string, //屏幕方向
    scrollPosition: 0 as number, //滚动位置
    timeline: null as Timeline | null, //动画时间线,
    muteStatus: false as boolean, //静音状态
  }),
  getters: {},
  actions: {}
})