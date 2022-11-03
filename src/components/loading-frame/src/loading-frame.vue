<template>
  <transition name="fade">
    <div>
      <div class="cover-bg w-screen h-screen fixed top-0 left-0"></div>
      <div
        class="w-screen h-screen fixed top-0 flex justify-center items-center"
        :class="screenOrientation === 'portrait' ? 'loading__portrait' : 'loading__default'">
        <span class="loading-progress text-30px text-white text-center font-weight-bold">
          <slot></slot>
        </span>
      </div>
      <div
        class="wrapper relative !-top-100vh"
        :class="screenOrientation === 'portrait' ? 'loading__portrait cover__portrait' : 'loading__default cover__default'">
        <div class="cover-container" :class="coverAnimation">
          <div class="cover-8"></div>
          <div class="cover-35"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import {useStore} from '@/store'
  import {CoverAnimation} from '@/components/cover-frame'

  const {screenOrientation} = storeToRefs(useStore())
  const coverAnimation = ref<CoverAnimation>(CoverAnimation.PAGE_IN)
</script>

<style scoped lang="scss">
  @import '@/common/style/index';
  @import '@/components/cover-frame/src/cover-frame.scss';

  @mixin loading__portrait() {
    transform: rotate(90deg);
    max-width: 100vh;
  }

  .loading-bg {
    height: inherit;
    max-width: unset;
  }

  .loading__default {
    .loading-bg {
      width: 100vw;
      object-fit: cover;
    }

    .loading-progress {
      width: 35vw;
      margin-bottom: 10vh;
    }
  }

  .loading__portrait {
    img, span {
      @include loading__portrait()
    }

    .loading-bg {
      object-fit: contain;
    }

    .loading-progress {
      width: 35vh;
      margin-left: 10vw;
    }
  }
</style>