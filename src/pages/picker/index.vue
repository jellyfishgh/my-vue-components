<template lang="pug">
  .page
    .weui-btn-area: .button.weui-btn.weui-btn_primary(@click="showPicker") 显示 picker
    picker(ref="picker" @valuechange="confirm")
</template>

<script>
import picker from '@/components/picker'
const createArr = arr => arr.map((text, value) => ({ text, value }))
export default {
  name: 'page-picker',
  components: {
    picker
  },
  data() {
    return {
      data: [
        createArr(['A', 'B', 'C', 'D', 'E']),
        createArr(['甲', '乙', '丙', '丁'])
      ]
    }
  },
  methods: {
    showPicker() {
      const { picker } = this.$refs
      picker.setData(this.data)
      picker.show()
    },
    confirm(value, index, text) {
      console.log(index)
    }
  }
}
</script>

