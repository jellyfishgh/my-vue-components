<template lang="pug">
  container(:title="title" :placeholder="holder" @onClick="showPicker"): purepicker(:ref="ref" :data="data" :selectedIndex="selectedIndex" @select="onConfirm")
</template>

<script>
import PurePicker from './PurePicker'
import Container from './Container'
import { getIndexBy } from '@/utils/arr'
export default {
  name: 'picker',
  props: [
    'title',
    'placeholder',
    'items',
    'mult',
    'index',
    'value',
    'ref',
    'spliter',
    'lastVal'
  ],
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
      const {
        title,
        placeholder,
        data,
        selectedIndex,
        spliter = ' ',
        lastVal
      } = this
      let label = ''
      if (data.length > 0 && selectedIndex.length > 0) {
        if (lastVal) {
          label =
            data[data.length - 1][selectedIndex[selectedIndex.length - 1]].label
        } else {
          label = data
            .map((item, index) => {
              return item[selectedIndex[index]].label
            })
            .join(spliter)
        }
      }
      return label || placeholder || `请选择${title}`
    }
  },
  methods: {
    onConfirm(index) {
      const { data, selectedIndex, mult } = this
      let result
      if (mult) {
        const selectedItems = data.map(
          (item, index) => item[selectedIndex[index]]
        )
        result = {
          indexes: selectedIndex,
          values: selectedItems.map(({ value }) => value),
          labels: selectedItems.map(({ label }) => label)
        }
      } else {
        const selectItem = data[selectedIndex[0]]
        result = {
          index: selectedIndex[0],
          ...selectItem
        }
      }
      this.$emti('confirm', result)
    },
    showPicker() {
      const { $refs, ref, selectedIndex, data } = this
      const picker = $refs[ref]
      picker.setData(data)
      picker.setSelectedIndex(selectedIndex)
      picker.show()
    }
  }
}
</script>

