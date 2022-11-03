<template>
  <div>
    <div
      class="loading__default w-screen h-screen fixed top-0 flex justify-center items-center">
      <img class="loading-bg" src="@/assets/images/cover/cover-0.png" alt="">
    </div>
  </div>
  <div class="w-screen h-screen flex justify-center items-center">
    <span class="loading-progress text-30px text-white text-center font-weight-bold z-2">
      请用手机查看
    </span>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .loading-bg {
    height: inherit;
    max-width: unset;
  }

  .loading__default {
    .loading-bg {
      width: 100vw;
      object-fit: cover;
    }
  }
</style>