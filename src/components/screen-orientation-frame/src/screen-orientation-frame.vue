<template>
  <transition name="fade">
    <div v-if="props.modelValue">
      <div
        class="w-screen h-screen fixed top-0 flex justify-center items-center"
        :class="screenOrientation === 'portrait' ? 'cover__portrait' : 'cover__default'">
        <img class="cover-bg" src="@/assets/images/cover/cover-0.png" alt="">
      </div>
      <div
        class="w-screen h-screen fixed top-0 flex justify-center items-center"
        :class="screenOrientation === 'portrait' ? 'cover__portrait' : 'cover__default'">
        <img class="cover-btn" src="@/assets/images/orientation/orientation-text.png" alt="">
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import {useStore} from '@/store'

  const {screenOrientation} = storeToRefs(useStore())

  interface Props {
    modelValue: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: true
  })
</script>

<style scoped lang="scss">
  @import '@/common/style/index';

  @mixin cover__portrait() {
    transform: rotate(90deg);
    max-width: 100vh;
  }

  .cover-bg {
    height: inherit;
    max-width: unset;
  }

  .cover__default {
    .cover-bg {
      width: 100vw;
      object-fit: cover;
    }

    .cover-btn {
      width: 50vw;
      margin-top: 5vh;
      animation: btn-animation__default 1s infinite;
    }
  }

  .cover__portrait {
    img {
      @include cover__portrait()
    }

    .cover-bg {
      object-fit: contain;
    }

    .cover-btn {
      width: 50vh;
      margin-right: 5vw;
      animation: btn-animation__portrait 1s infinite;
    }
  }

  @keyframes btn-animation__default {
    0% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.95);
    }
  }

  @keyframes btn-animation__portrait {
    0% {
      transform: rotate(90deg) scale(0.95);
    }
    50% {
      transform: rotate(90deg) scale(1);
    }
    100% {
      transform: rotate(90deg) scale(0.95);
    }
  }
</style>