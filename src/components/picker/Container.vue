<template lang="pug">
  .weui-cell.weui-cell_access(@click="onClick")
    .weui-cell__hd: label.weui-label {{title}}
    template(v-if="position==='center'")
      .weui-cell__bd(v-if="!ft && small")
        span(style={'font-size': '90%'}) {{placeholder}}
      .weui-cell__bd(v-else) {{placeholder}}
      .weui-cell__ft(v-if="small")
        span(style={'font-size': '90%'}) {{ft || ''}}
      .weui-cell__ft(v-else) {{ft || ''}}
    template(v-else)
      .weui-cell__bd
      .weui-cell__ft(v-if="small")
        span(style={'font-size': '90%'}) {{placeholder}}
      .weui-cell__ft(v-else) {{placeholder}}
    slot
</template>

<script>
export default {
  name: 'container',
  props: ['title', 'placeholder', 'position', 'small', 'ft'],
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  }
}
</script>
