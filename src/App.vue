<template>
  <ScreenAdapter>
    <Swiper
      :initial-slide="0"
      :autoplay="swiper_options.autoplay"
      :loop="swiper_options.loop"
      :speed="swiper_options.speed"
      :modules="[EffectFade]"
      effect="fade"
      :fade-effect="{ crossFade: true }"
      class="swiper-container"
      @slideChange="swiperChange"
    >
      <swiper-slide>
        <Screen1 />
      </swiper-slide>
      <swiper-slide>
        <Screen2 />
      </swiper-slide>
      <swiper-slide>
        <Screen3 />
      </swiper-slide>
      <swiper-slide>
        <Screen4 />
      </swiper-slide>
    </Swiper>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue'
import ScreenAdapter from './components/ScreenAdapter.vue'
// 使用swiper的compositon API
import SwiperCore, { Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Screen1 from './components/Screen1.vue'
import Screen2 from './components/Screen2.vue'
import Screen3 from './components/Screen3.vue'
import Screen4 from './components/Screen4.vue'

SwiperCore.use([Autoplay, EffectFade])

const swiper_options = reactive({
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  loop: true,
  speed: 1000,
  pagination: {
    clickable: true
  }
})

// 当前第几屏
const activeIndex = ref(0)

const swiperChange = (obj: any) => {
  activeIndex.value = obj.activeIndex
  console.log(activeIndex.value)
}

</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
