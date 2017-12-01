<template lang="pug">
  container(:title="title" :placeholder="holder" @onClick="showPicker")
    pure-picker(ref="picker" :data="data" :selectedIndex="selectedIndex" @select="onConfirm")
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
    'spliter',
    'lastVal',
    'isDefault'
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
    let { items = [], index, value, mult, isDefault } = this
    if (mult) {
      if (value && value instanceof Array && value.length > 0) {
        index = []
        items.map((item, i) => {
          const queryIndex = getIndexBy(item, value[i], 'value')
          if (queryIndex !== -1) index[i] = queryIndex
          else if (isDefault) index[i] = 0
        })
      } else if (!(index && index instanceof Array && index.length > 0)) {
        index = []
        items.map((item, i) => {
          if (isDefault) index[i] = 0
        })
      }
    } else {
      if (value) {
        const queryIndex = getIndexBy(items, value, 'value')
        if (queryIndex !== -1) index = queryIndex
        else if (isDefault) index = 0
      } else if (index === undefined && isDefault) index = 0
      items = [items]
      index = index === undefined ? [] : [index]
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
    onConfirm(confirmedIndexes) {
      this.selectedIndex = confirmedIndexes.slice()
      const { data, mult, selectedIndex } = this
      let result
      if (mult) {
        const selectedItems = data.map((item, i) => item[selectedIndex[i]])
        result = {
          indexes: selectedIndex,
          values: selectedItems.map(({ value }) => value),
          labels: selectedItems.map(({ label }) => label)
        }
      } else {
        const index = selectedIndex[0]
        result = {
          index,
          ...data[0][index]
        }
      }
      this.$emit('confirm', result)
    },
    showPicker() {
      const { selectedIndex, data } = this
      const { picker } = this.$refs
      picker.setData(data)
      picker.setSelectedIndex(selectedIndex)
      picker.show()
    }
  }
}
</script>

