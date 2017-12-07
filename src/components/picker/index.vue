<template lang="pug">
  container(:title="title" :placeholder="holder" @onClick="showPicker" :position="position === 'right' ? 'right' : 'center'" :small="small" :ft="ft")
    pure-picker(ref="picker" :data="data" :selectedIndex="selectedIndex" @select="onConfirm" @change="onChange" @cancel="onCancel")
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
    'position',
    'small',
    'ft',
    'items',
    'mult',
    'index',
    'value',
    'spliter',
    'lastVal',
    'isDefault',
    'changedIndex'
  ],
  components: {
    PurePicker,
    Container
  },
  data() {
    return {
      data: [[]],
      selectedIndex: []
    }
  },
  created() {
    this.init()
  },
  watch: {
    items(value) {
      this.init()
      const { picker } = this.$refs
      for (let i = this.changedIndex + 1; i < value.length; i++) {
        picker.scrollTo(i, 0)
      }
      picker.state === picker.STATE_SHOW && picker.refill(value)
    }
  },
  computed: {
    holder() {
      const {
        title,
        placeholder,
        ft,
        data,
        selectedIndex,
        spliter = ' ',
        lastVal
      } = this
      let label = ''
      if (data.length > 0 && selectedIndex.length > 0) {
        if (lastVal) {
          label =
            data[data.length - 1][selectedIndex[selectedIndex.length - 1] || 0]
              .label
        } else {
          label = data
            .map((item, index) => {
              return item[selectedIndex[index] || 0].label
            })
            .join(spliter)
        }
      }
      return label || placeholder || (ft ? '' : `请选择${title}`)
    }
  },
  methods: {
    init() {
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
    onChange(i, newIndex) {
      this.$emit('onChange', { i, newIndex })
    },
    onCancel() {
      this.$emit('cancel')
    },
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
      if (data && data[0] && data[0].length > 0) {
        const { picker } = this.$refs
        picker.setData(data)
        picker.setSelectedIndex(selectedIndex)
        picker.show()
      } else {
        this.$emit('empty')
      }
    }
  }
}
</script>
