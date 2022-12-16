<template>
  <header class="header">
    <div></div>
    <h1>
      {{ title }}
    </h1>
    <div></div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GlobalHeader',
  props: {
    title: {
      type: String,
      default: 'じゃんけんポンライン'
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #3b82cd;
  color: #fff;
}
</style>
