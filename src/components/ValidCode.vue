<template>
  <div class="img-verify">
    <canvas ref="verify" :width="width" :height="height" @click="handleDraw"></canvas>
  </div>
</template>

<script type="text/ecmascript-6">
import { reactive, onMounted, ref, toRefs } from 'vue'

export default {
  setup() {
    const verify = ref(null)
    const state = reactive({
      pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', // 字符串
      width: 120, // canvas宽
      height: 25, // canvas高
      code: '' // 验证码
    })
    onMounted(() => {
      // 初始化绘制图片验证码
      draw()
    })

    // 点击图片重新绘制
    const handleDraw = () => {
      draw()
    }

    // 随机数
    const randomNum = (min, max) => {
      return parseInt(Math.random() * (max - min) + min)
    }
    // 随机颜色
    const randomColor = (min, max) => {
      const r = randomNum(min, max)
      const g = randomNum(min, max)
      const b = randomNum(min, max)
      return `rgb(${r},${g},${b})`
    }

    // 绘制图片
    const draw = () => {
      const ctx = verify.value.getContext('2d')
      // 填充颜色
      ctx.fillStyle = randomColor(180, 230)
      // 填充的位置
      ctx.fillRect(0, 0, state.width, state.height)
      // 随机产生字符串，并且随机旋转
      state.code = ''
      for (let i = 0; i < 4; i++) {
        // 随机的一个字符
        const text = state.pool[randomNum(0, state.pool.length)]
        // 随机的字体大小
        const fontSize = randomNum(18, 40)
        // 字体随机的旋转角度
        const deg = randomNum(-30, 30)
        ctx.font = fontSize + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = randomColor(80, 150)
        ctx.save()
        ctx.translate(30 * i + 15, 15)
        ctx.rotate((deg * Math.PI) / 180)
        ctx.fillText(text, -15 + 5, -15)
        ctx.restore()
        state.code += text
      }
    }

    // 获取验证码
    const getCode = () => {
      return state.code
    }

    return {
      ...toRefs(state),
      verify,
      handleDraw,
      getCode
    }
  }
}
</script>

<style type="text/css">
.img-verify canvas {
  cursor: pointer;
}
</style>