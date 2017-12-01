<template lang="pug">
  .weui-cell.weui-cell_access(@click="onClick")
    .weui-cell__hd: label.weui-label {{title}}
    .weui-cell__bd {{placeholder}}
    .weui-cell__ft
    slot
</template>

<script>
export default {
  name: 'container',
  props: ['title', 'placeholder'],
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  }
}
</script>
