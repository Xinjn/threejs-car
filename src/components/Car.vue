<template>
  <div>
  </div>
</template>

<script>
// 渲染结果
import {
  renderer
} from '../threejs/RenderLoop'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Car',
  props: {
    msg: String
  },
  mounted: function () {
    // Three.js渲染结果Canvas画布插入到body元素中
    document.body.appendChild(renderer.domElement);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
