<template>
  <div class="model-box">
    <button @click="auto">切换为自动旋转</button>
    <h4>模型展台 旋转状态：{{ autoPlay ? '自动' : '手动' }} <span>(左右滑动旋转模型)</span></h4>
    <div class="content-box" ref="content">
      <img v-for="(item, i) in modelImgs" v-show="i === activeIndex" :key="i" :src="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

class ModelBooth {
  constructor({ el, event, total }) {
    this.$el = el
    this.$event = event
    this.data = {
      total: total,
      index: 0,
      x: 0,
      y: 0,
    }
    this.change = this.throttle(this.emitChange.bind(this), 50)
  }

  init() {
    this.addListener()
  }

  addListener() {
    this.$el.addEventListener(
      'touchstart',
      (e) => {
        this.$event?.onStop()
        this.data.x = e.touches[0].pageX
        this.data.y = e.touches[0].pageY
      },
      false
    )

    this.$el.addEventListener(
      'touchmove',
      (e) => {
        this.$event?.onStop()
        const endx = e.changedTouches[0].pageX
        const endy = e.changedTouches[0].pageY
        const direction = this.calcDirection(this.data.x, this.data.y, endx, endy)

        switch (direction) {
          case 'left':
            e.preventDefault()
            this.change(false)
            break
          case 'right':
            e.preventDefault()
            this.change(true)
            break
        }
      },
      false
    )
  }

  auto({ index }) {
    this.data.index = index
    this.change(true)
  }

  throttle(fn, time) {
    let t1 = 0
    return function () {
      let t2 = Date.now()
      if (t2 - t1 > time) {
        fn.apply(this, arguments)
        t1 = t2
      }
    }
  }

  emitChange(type) {
    let nowIndex = this.data.index
    if (!type) {
      ++nowIndex
    } else {
      --nowIndex
    }
    const result = ((nowIndex % this.data.total) + this.data.total) % this.data.total
    this.data.index = nowIndex
    this.$event?.onChange(result)
  }

  calcDirection(startX, startY, endX, endY) {
    const angX = endX - startX
    const angY = endY - startY
    let result = ''

    // 消除噪音
    if (Math.abs(angX) < 2 && Math.abs(angY) < 2) {
      return result
    }
    const baseAngle = 45
    const angle = this.calcAngle(angX, angY)
    if (angle >= -(baseAngle * 3) && angle <= -baseAngle) {
      result = 'left'
    } else if (angle > baseAngle && angle < baseAngle * 3) {
      result = 'right'
    } else if (
      (angle >= baseAngle * 3 && angle <= baseAngle * 4) ||
      (angle >= -(baseAngle * 4) && angle < -(baseAngle * 3))
    ) {
      result = 'up'
    } else if (angle >= -baseAngle && angle <= baseAngle) {
      result = 'down'
    }

    return result
  }

  calcAngle(x, y) {
    return (Math.atan2(x, y) * 180) / Math.PI
  }
}
let modelBooth: any
export default defineComponent({
  data() {
    return {
      modelImgs: Array.from({ length: 30 }).map((v, i) => `https://hi-zhang.com/assets/zip/${i}.png`),
      activeIndex: 0,
      autoPlay: false,
      playTn: 0,
      modelBooth: {},
    }
  },
  mounted() {
    modelBooth = new ModelBooth({
      el: this.$refs.content,
      total: this.modelImgs.length,
      event: {
        onChange: (index: number) => {
          this.activeIndex = index
        },
        onStop: () => {
          this.stop()
        },
      },
    })
    modelBooth.init()
  },
  methods: {
    stop() {
      this.autoPlay = false
      clearInterval(this.playTn)
    },
    auto() {
      this.stop()
      this.autoPlay = true
      this.playTn = setInterval(() => {
        modelBooth.auto({
          index: this.activeIndex,
        })
      }, 50)
    },
  },
})
</script>
