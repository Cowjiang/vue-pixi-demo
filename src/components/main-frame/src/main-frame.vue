<template>
  <div class="main-wrapper w-screen h-screen" v-show="!showCover">
    <div ref="canvasContainer" class="w-screen h-screen"></div>
  </div>
<!--  <transition name="fade">-->
    <div v-if="!loadComplete">
      <LoadingFrame>
        {{ loadProgress.toFixed() }}%
      </LoadingFrame>
    </div>
<!--  </transition>-->
  <CoverFrame v-model="showCover"/>
</template>

<script setup lang="ts">
  import CoverFrame from '@/components/cover-frame'
  import LoadingFrame from '@/components/loading-frame'
  import PhyTouch from 'phy-touch'
  import {TimelineMax, TweenMax, gsap} from 'gsap'
  import * as PIXI from 'pixi.js'
  import {sound} from '@pixi/sound'
  import {Application, Loader} from 'pixi.js'
  import {AnimatedGIFLoader} from '@pixi/gif'
  import {AnimatedGIF} from '@pixi/gif'
  import {useStore} from '@/store'
  import {getAssetsFile, imagePreloader} from '@/common/utils'
  import {Scenes, scenesOptions} from '@/common/config/scenes'
  import {Sprites, SpriteOption, spritesOptions} from '@/common/config/sprites'
  import {resources} from '@/common/config/resources'
  import {animations} from '@/common/config/animations'
  import {audiosOptions} from '@/common/config/audios'

  Loader.registerPlugin(AnimatedGIFLoader)

  const store = useStore()
  const {
    windowWidth,
    windowHeight,
    WeixinJSBridgeReady,
    screenOrientation,
    scrollPosition,
    timeline,
    muteStatus
  } = storeToRefs(store)

  const canvasContainer = ref<HTMLElement | null>(null)

  const isLoadError = ref(false) //是否加载错误
  const loadComplete = ref(false) //是否加载完成
  const phyTouch = ref<InstanceType<typeof PhyTouch>>(null)
  const loadProgress = ref(0) //加载进度
  const bgHeight = 640 //设计稿的高度

  const showCover = ref(false) //是否显示封面
  // const showProducer = ref(false) //是否显示出品

  const minWidth = windowWidth.value < windowHeight.value ? windowWidth.value : windowHeight.value //屏幕最短边长度
  const maxWidth = windowWidth.value > windowHeight.value ? windowWidth.value : windowHeight.value //屏幕最长边长度
  const scale = minWidth / bgHeight  //舞台缩放比例

  const scenes: Scenes = {}
  const sprites: Sprites = {}

  // 初始化
  const init = (): void => {
    loadComplete.value = false
    store.timeline = initTimeline()
    loader.onComplete.add(async () => {
      if (!isLoadError.value) {
        (canvasContainer.value as HTMLElement).appendChild(app.view)
        console.log('[PIXI] 加载资源完成')
        initScenes()
        initSprites()
        initAnimation()
        initTouch()
        await imagePreloader(Array.from(Array(10), (_,x) => getAssetsFile(`images/cover/cover-${x}.png`)))
        loadComplete.value = true
      }
    })
  }

  // 初始化PIXI.Application
  const initApp = (): Application => {
    console.log('initApp')
    const app = new PIXI.Application({
      width: windowWidth.value,
      height: windowHeight.value,
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio ?? 2,
      autoDensity: true
      // backgroundColor: 0xf4567b
    }) //PIXI实例
    app.stage.scale.set(scale, scale)  // 根据屏幕实际宽高放大舞台
    if (windowWidth.value < windowHeight.value) {
      app.stage.rotation = Math.PI / 2
      app.stage.pivot.set(0.5)
      app.stage.x = windowWidth.value
    }
    return app
  }
  const app = initApp()
  defineExpose({initApp})

  // 初始化Loader
  const initLoader = (): Loader => {
    const loader = new PIXI.Loader()
    resources.forEach(resource => {
      const resourceHref = getAssetsFile(resource.src)
      loader.add(resource.name, resourceHref)
    })
    loader.load()
    loader.onProgress.add(loader => {
      loadProgress.value = Number(loader.progress.toFixed() === '100' ? 99 : loader.progress.toFixed())
      // console.log('[PIXI] 加载进度:', loader.progress, '%')
    })
    loader.onError.add((err: Error) => {
      isLoadError.value = true
      console.error(err)
    })
    return loader
  }
  const loader = initLoader()

  // 初始化场景
  const initScenes = (): void => {
    scenesOptions.map(option => {
      scenes[option.name] = new PIXI.Container()
      scenes[option.name].width = option.width
      scenes[option.name].height = option.height
      scenes[option.name].x = option.x
      app.stage.addChild(scenes[option.name])
    })
  }

  // 初始化精灵
  const initSprite = (sprite: any, option: SpriteOption, scene: string): void => {
    Object.keys(option).forEach(optionKey => {
      sprite[optionKey] = option[optionKey]
    })
    scenes[scene].addChild(sprite)
  }

  // 初始化动图GIF
  const initAnimatedGIF = (url: string, options: any, scene: string): void => {
    fetch(getAssetsFile(url))
      .then(res => res.arrayBuffer())
      .then(AnimatedGIF.fromBuffer)
      .then(image => {
        options?.position?.x && (image.x = options.position.x)
        options?.position?.y && (image.y = options.position.y)
        options?.width && (image.width = options.width)
        options?.height && (image.height = options.height)
        options?.animationSpeed && (image.animationSpeed = options.animationSpeed)
        scenes[scene].addChild(image)
      })
  }

  // 初始化精灵设置
  const initSprites = (): void => {
    spritesOptions.forEach((option, index) => {
      Object.keys(option).forEach(optionKey => {
        sprites[optionKey] = PIXI.Sprite.from(optionKey)
        if (option[optionKey]?.interactive) {
          sprites[optionKey].interactive = true
          sprites[optionKey].buttonMode = true
          // sprites[optionKey].on('tap', (): void => {
          //   const spritesOption = option[optionKey]
          // })
        }
        if (option[optionKey]?.type === 'gif') {
          const url = resources.find(resource => resource.name === optionKey)?.src ?? ''
          initAnimatedGIF(url, option[optionKey], `scene${index + 1}`)
        } else {
          initSprite(sprites[optionKey], option[optionKey], `scene${index + 1}`)
        }
      })
    })
  }

  // 初始化AlloyTouch
  const initTouch = (): void => {
    const scrollDistance = -app.stage.width + maxWidth

    phyTouch.value = new PhyTouch({
      touch: '.main-wrapper',
      vertical: screenOrientation.value === 'portrait',
      target: canvasContainer.value,
      sensitivity: 1,
      factor: 0.5,
      min: scrollDistance,
      max: 0,
      value: 0,
      maxSpeed: 1,
      initialValue: 0, // 初始值
      change: (value: number) => handleScroll(-value)
    })

    const handleScroll = (value: number): number => {
      if (value < 0) value = 0
      store.$state.scrollPosition = value
      let progress = -value / scrollDistance
      progress = progress < 0 ? 0 : progress > 1 ? 1 : progress
      timeline.value?.seek(progress)
      if (isNaN(Number(value.toFixed(2)))) {
        location.reload()
      }
      console.log(
        '[滚动距离]', Number(value.toFixed(2)), '，',
        '[时间线进度]', Number((progress * 100).toFixed(2)), '%，',
        '[原始位置]', Number((app.stage.width / scale * (-value / scrollDistance)).toFixed(2))
      )
      const rawPosition = Number((app.stage.width / scale * (-value / scrollDistance)).toFixed(2))
      audiosOptions.find(audio => {
        if (audio.startAt && rawPosition >= audio.startAt) {
          !loader.resources[audio.name].sound?.isPlaying && !audio.played && loader.resources[audio.name].sound?.play()
          audio.played = true
        } else if (!!audio.endAt) {
          sound.stop(audio.name)
        }
      })
      return value
    }
  }

  // 初始化时间线
  const initTimeline = (): TimelineMax => new TimelineMax({paused: true})

  // 初始化动画
  const initAnimation = (): void => {
    const stageRawWidth = app.stage.width / scale
    Object.keys(animations).forEach(k => {
      animations[k].forEach(v => {
        let {startAt, endAt, duration, delay, from, to, autoPlay} = v
        const sprite = v.prop ? (sprites[k] as any)[v.prop] : sprites[k]
        if (!!startAt && !!endAt) {
          delay = startAt / stageRawWidth
          duration = (endAt - startAt) / stageRawWidth
        }
        if (typeof duration !== 'number') return
        let act = null
        if (from && to) {
          act = TweenMax.fromTo(sprite, duration, from, to)
        } else if (from) {
          act = TweenMax.from(sprite, duration, from)
        } else if (to) {
          act = TweenMax.to(sprite, duration, to)
        }
        if (autoPlay) {
          act?.play()
          return
        }
        const tm = new TimelineMax({delay})
        act && tm.add(act, 0)
        tm.play()
        timeline.value?.add(tm, 0)
      })
    })
  }

  let bgMusicTimer: NodeJS.Timer
  // 播放背景音乐
  const playBackgroundMusic = (): void => {
    if (!!bgMusicTimer) return
    bgMusicTimer = setInterval(() => {
      if (loader.resources['audioBg'].sound) {
        loader.resources['audioBg'].sound.loop = true
        // loader.resources['audioBg'].sound.volume = 0.2
        loader.resources['audioBg'].sound.play()
        clearInterval(bgMusicTimer)
      }
    }, 500)
  }

  watch(
    () => muteStatus.value,
    nval => {
      if (loader.resources['audioBg'].sound) {
        loader.resources['audioBg'].sound.volume = nval ? 0 : 1
      }
    }
  )

  watch(
    () => screenOrientation.value,
    () => {
      phyTouch.value.stop()
    }
  )

  watch(
    () => scrollPosition.value,
    (nval: number) => {
      app.stage.position[screenOrientation.value === 'landscape' ? 'x' : 'y'] = -nval
    }
  )

  watch(
    () => loadComplete.value,
    (nval: boolean) => {
      if (nval) {
        showCover.value = true
        setTimeout(() => {
          playBackgroundMusic()
        }, 1000)
      }
    }
  )

  watch(
    () => WeixinJSBridgeReady.value,
    (nval: boolean) => {
      if (nval) {
        playBackgroundMusic()
      }
    }
  )

  onMounted(() => init())
</script>

<style scoped lang="scss">
  @import '@/common/style/index';
</style>