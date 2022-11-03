<template>
  <transition name="fade">
    <div v-if="props.modelValue">
      <div class="cover-bg w-screen h-screen fixed top-0 left-0"></div>
      <div
        class="wrapper relative" @click.stop="handleEnterBtnClick"
        :class="screenOrientation === 'portrait' ? 'cover__portrait' : 'cover__default'">
        <div class="cover-container" :class="coverAnimation">
          <div class="cover-1"></div>
          <div class="group-1">
            <div class="cover-2"></div>
            <div class="cover-3"></div>
            <div class="cover-4"></div>
            <div class="cover-5"></div>
            <div class="cover-6"></div>
            <div class="cover-7"></div>
          </div>
          <div class="cover-8"></div>
          <div class="cover-9"></div>
          <div class="group-2">
            <div class="cover-10"></div>
            <div class="cover-11"></div>
            <div class="cover-12"></div>
            <div class="cover-13"></div>
            <div class="cover-14"></div>
            <div class="cover-15">
              <div class="cover-15-1"></div>
            </div>
            <div class="cover-16"></div>
            <div class="cover-17"></div>
            <div class="cover-18">
              <div class="cover-18-1"></div>
            </div>
            <div class="cover-19"></div>
            <div class="cover-20"></div>
            <div class="cover-21"></div>
            <div class="cover-22"></div>
            <div class="cover-23"></div>
            <div class="cover-24"></div>
            <div class="cover-25">
              <div class="cover-25-1"></div>
            </div>
            <div class="cover-26"></div>
            <div class="cover-27">
              <div class="cover-27-1">
                <div class="cover-27-2"></div>
              </div>
            </div>
            <div class="cover-28">
              <div class="cover-28-1"></div>
            </div>
          </div>
          <div class="cover-29"></div>
          <div class="group-4" @animationend.once="onFingerAnimationEnd">
            <div class="cover-33"></div>
            <div class="cover-34"></div>
          </div>
          <div class="cover-35"></div>
          <div class="cover-36"></div>
        </div>
      </div>
      <div
        class="mute-btn fixed"
        :class="screenOrientation === 'portrait' ? 'mute-btn__portrait' : 'mute-btn__default'"
        @click="handleMuteBtnClick">
        <div class="confirm absolute"></div>
        <div class="cancel absolute" v-show="!muteStatus"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import {useStore} from '@/store'
  import {CoverAnimation} from '@/components/cover-frame'

  const {screenOrientation, muteStatus} = storeToRefs(useStore())

  interface Props {
    modelValue: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: true
  })

  const emit = defineEmits(['update:modelValue'])

  const coverAnimation = ref<CoverAnimation>(CoverAnimation.PAGE_IN)
  const handleEnterBtnClick = (): void => {
    if (fingerAnimationEnded) {
      coverAnimation.value = CoverAnimation.PAGE_OUT
      setTimeout(() => {
        emit('update:modelValue', false)
      }, 2000)
    }
  }

  // 静音按钮点击事件
  const handleMuteBtnClick = (): void => {
    muteStatus.value = !muteStatus.value
  }

  let fingerAnimationEnded: boolean = false
  const onFingerAnimationEnd = (): void => {
    fingerAnimationEnded = true
  }
</script>

<style scoped lang="scss">
  @import '@/common/style/index';
  @import 'cover-frame';
</style>