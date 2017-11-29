<template lang="pug">
  container(:title="title" :placeholder="holder" @onClick="showPicker"): purepicker(:ref="ref" :data="data" :selectedIndex="selectedIndex" @select="onConfirm")
</template>

<script>
import PurePicker from './PurePicker'
import Container from './Container'
import { getIndexBy } from '@/utils'
export default {
  name: 'picker',
  props: ['title', 'placeholder', 'items', 'mult', 'index', 'value', 'ref'],
  components: {
    PurePicker,
    Container
  },
  data() {
    return {
      data: [[]],
      selectedIndex: [[]]
    }
  },
  created() {
    let { items = [], index = 0, value = '', mult } = this
    if (mult) {
      items.map((item, i) => {
        if (value && value instanceof Array && value.length > 0) {
          const queryIndex = getIndexBy(item, value[i], 'value')
          if (queryIndex !== -1) index[i] = queryIndex
          else index[i] = 0
        } else {
          index[i] = 0
        }
      })
    } else {
      const queryIndex = getIndexBy(items, value, 'value')
      if (queryIndex !== -1) index = queryIndex
      items = [items]
      index = [index]
      value = [value]
    }
    this.data = [...items]
    this.selectedIndex = [...index]
  },
  computed: {
    holder() {
      const { title, placeholder, data, selectedIndex } = this
      return placeholder || `请选择${title}`
    }
  },
  methods: {
    onConfirm(index) {
      const {items, }
      this.$emti('confirm', {
        index
      })
    },
    showPicker() {

    }
  }
}
</script>

