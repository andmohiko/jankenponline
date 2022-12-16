<template>
  <div class="wrapper">
    <div class="sp">
      <GlobalHeader />
      <FlexBox :px="8" :py="8">
        <Nuxt />
      </FlexBox>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GlobalHeader from '~/components/Navigations/GlobalHeader.vue'
export default Vue.extend({
  components: {
    GlobalHeader
  }
})
</script>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
.sp {
  border: 2px solid blue;
  width: 500px;
  max-width: 500px;
}
</style>
