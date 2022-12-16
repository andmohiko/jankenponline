<template>
  <div
    class="flexBox"
    :style="{
      gap: `${gap}px`,
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      width,
      height,
      padding: `${pt || py}px ${pr || px}px ${pb || py}px ${pl || px}px`
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FlexBox',
  props: {
    direction: {
      type: String,
      default: 'column'
    },
    justify: {
      type: String,
      default: 'center'
    },
    align: {
      type: String,
      default: 'center'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    gap: {
      type: Number,
      default: 0
    },
    py: {
      type: Number,
      default: 0
    },
    px: {
      type: Number,
      default: 0
    },
    pt: {
      type: Number,
      default: 0
    },
    pr: {
      type: Number,
      default: 0
    },
    pb: {
      type: Number,
      default: 0
    },
    pl: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.flexBox {
  display: flex;
  flex-grow: 0;
}
</style>
