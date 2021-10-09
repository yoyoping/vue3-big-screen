<template>
  <div
    class="screen-adapter"
    :style="style"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  }
})

const style = reactive({
  width: props.width + 'px',
  height: props.height + 'px',
  transform: 'scale(1) translate(-50%, -50%)'
})

onMounted(() => {
  setScale()
  window.onresize = Debounce(setScale, 1000)
})

const Debounce = (fn: Function, t: number) => {
      const delay = t || 500
      let timer: any
      return function() {
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        // @ts-ignore
        const context = this
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    }

const getScale = () => {
  const w = window.innerWidth / props.width
  const h = window.innerHeight / props.height
  const scale = w < h ? w : h
  return scale
}

const setScale = () => {
  style.transform = 'scale(' + getScale() + ') translate(-50%, -50%)'
}

</script>
<style lang="scss" scoped>
.screen-adapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
}
</style>
