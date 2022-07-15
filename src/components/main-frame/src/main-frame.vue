<template>
  <div ref="canvasContainer" class="w-screen h-screen"></div>
  <transition name="fade">
    <div v-if="loadProgress !== 100" class="fixed top-0 w-screen h-screen bg-white flex justify-center items-center">
    <span class="text-2xl font-weight-bold">
      加载进度：{{ loadProgress }}%
    </span>
    </div>
  </transition>
</template>

<script setup lang="ts">
    //@ts-ignore
    import AlloyTouch from 'alloytouch'
    import {TimelineMax, TweenMax} from 'gsap'
    import * as PIXI from 'pixi.js'
    import {Application, Loader} from 'pixi.js'
    import {useStore} from '@/store'
    import {getAssetsFile} from '@/common/utils'
    import {Scenes, scenesOptions} from '@/common/config/scenes'
    import {Sprites, SpriteOption, spritesOptions} from '@/common/config/sprites'
    import {resources} from '@/common/config/resources'
    import {animations} from '@/common/config/animations'

    const store = useStore()
    const {windowWidth, windowHeight, screenOrientation, scrollPosition, timeline} = storeToRefs(store)
    const canvasContainer = ref<HTMLElement | null>(null)
    const isLoadError = ref(false) //是否加载错误
    const alloyTouch = ref<AlloyTouch>(null)
    const loadProgress = ref(0) //加载进度

    const scenes: Scenes = {}
    const sprites: Sprites = {}

    //初始化
    const init = () => {
        store.timeline = initTimeline()
        loader.onComplete.add(() => {
            if (!isLoadError.value) {
                (canvasContainer.value as HTMLElement).appendChild(app.view)
                console.log('[PIXI] 加载完成')
                initScenes()
                initSprites()
                initAnimation()
                initTouch()
            }
        })
    }

    //初始化PIXI.Application
    const initApp = (): Application => {
        const app = new PIXI.Application({
            width: windowWidth.value,
            height: windowHeight.value,
            // backgroundColor: 0xf4567b
        }) //PIXI实例
        if (windowWidth.value < windowHeight.value) {
            app.stage.rotation = Math.PI / 2
            app.stage.pivot.set(0.5)
            app.stage.x = windowWidth.value
        }
        return app
    }
    const app = initApp()

    //初始化Loader
    const initLoader = (): Loader => {
        const loader = new PIXI.Loader()
        resources.forEach(resource => {
            const resourceHref = getAssetsFile(resource.src)
            loader.add(resource.name, resourceHref)
        })
        loader.load()
        loader.onProgress.add(loader => {
            loadProgress.value = loader.progress
            console.log('[PIXI] 加载进度:', loader.progress, '%')
        })
        loader.onError.add((err: Error) => {
            isLoadError.value = true
            console.error(err)
        })
        return loader
    }
    const loader = initLoader()

    //初始化场景
    const initScenes = (): void => {
        scenesOptions.map(option => {
            scenes[option.name] = new PIXI.Container()
            scenes[option.name].width = option.width
            scenes[option.name].height = option.height
            scenes[option.name].x = option.x
            app.stage.addChild(scenes[option.name])
        })
    }

    //初始化精灵
    const initSprite = (sprite: any, option: SpriteOption, index: number): void => {
        Object.keys(option).forEach(optionKey => {
            sprite[optionKey] = option[optionKey]
        })
        scenes[`scene${index}`].addChild(sprite)
    }

    //初始化精灵设置
    const initSprites = (): void => {
        spritesOptions.forEach((option, index) => {
            Object.keys(option).forEach(optionKey => {
                sprites[optionKey] = PIXI.Sprite.from(optionKey)
                initSprite(sprites[optionKey], option[optionKey], index + 1)
            })
        })
    }

    //初始化AlloyTouch
    const initTouch = (): void => {
        const scrollDistance = app.stage.width - Math.max(windowWidth.value, windowHeight.value) * 2

        alloyTouch.value = new AlloyTouch({
            touch: 'body',
            vertical: screenOrientation.value === 'portrait',
            target: canvasContainer.value,
            sensitivity: 1,
            factor: 0.5,
            min: -scrollDistance,
            max: 0,
            step: 45,
            value: 0,
            maxSpeed: 1,
            initialValue: 0, // 初始值
            change: (value: number) => handleScroll(-value)
        })

        const handleScroll = (value: number): number => {
            if (value < 0) value = 0
            store.$state.scrollPosition = value
            let progress = value / scrollDistance
            progress = progress < 0 ? 0 : progress > 1 ? 1 : progress
            timeline.value?.seek(progress)
            console.info('[滚动距离]', value, '，[时间线进度]', progress)
            return value
        }
    }

    //初始化时间线
    const initTimeline = (): TimelineMax => new TimelineMax({paused: true})

    //初始化动画
    const initAnimation = (): void => {
        Object.keys(animations).forEach(k => {
            animations[k].forEach(v => {
                const {duration, delay, from, to} = v
                const sprite = v.prop ? (sprites[k] as any)[v.prop] : sprites[k]
                let act = null
                if (from && to) {
                    act = TweenMax.fromTo(sprite, duration, from, to)
                } else if (from) {
                    act = TweenMax.from(sprite, duration, from)
                } else if (to) {
                    act = TweenMax.to(sprite, duration, to)
                }
                const tm = new TimelineMax({delay})
                act && tm.add(act, 0)
                tm.play()
                timeline.value?.add(tm, 0)
            })
        })
    }

    watch(
        () => scrollPosition.value,
        (nval: number) => {
            app.stage.position[screenOrientation.value === 'landscape' ? 'x' : 'y'] = -nval
        }
    )

    onMounted(() => {
        init()
    })
</script>

<style scoped lang="scss">
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-leave-from,
  .fade-enter-to {
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s;
  }
</style>