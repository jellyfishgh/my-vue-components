<template lang="pug">
  picker(:items="items" :index="index" title="日期" mult @confirm="onConfirm" @onChange="onChange" :isDefault="isDefault" :changedIndex="changedIndex" :spliter="mySpliter")
</template>

<script>
import { createArr, getIndexBy } from '@/utils/arr'
import { getDaysOfMonth } from '@/utils/date'
import { n2s } from '@/utils/num'
import Picker from './index'
const now = new Date()
const createYmd = str => {
  if (str) {
    const data = str.split('-')
    if (data && data.length === 3) {
      const y = parseInt(data[0], 10)
      const m = parseInt(data[1], 10)
      const d = parseInt(data[2], 10)
      return [y, m, d]
    }
  }
}
export default {
  name: 'date-picker',
  components: {
    Picker
  },
  props: ['date', 'start', 'end', 'isDefault', 'spliter'],
  data() {
    return {
      index: [],
      ys: [],
      mySpliter: this.spliter || '-',
      changedIndex: ''
    }
  },
  created() {
    const { date, start, end, isDefault } = this
    const currentYear = now.getFullYear()
    let min = currentYear - 100
    let max = currentYear + 100
    start && (min = parseInt(start, 10))
    end && (max = parseInt(end, 10))
    this.ys = createArr(max + 1, min)
    const ymd = createYmd(date)
    if (ymd) {
      const yearIndex = getIndexBy(this.ys, ymd[0])
      if (yearIndex !== -1) {
        this.index = [yearIndex, ymd[1] - 1, ymd[2] - 1]
      }
    } else if (isDefault) {
      const yearIndex = getIndexBy(this.ys, currentYear)
      if (yearIndex !== -1) {
        this.index = [yearIndex, now.getMonth(), now.getDate() - 1]
      } else {
        this.index = [0, 0, 0]
      }
    }
  },
  computed: {
    items() {
      const { index, ys } = this
      const years = ys.map(value => ({ value, label: value }))
      const months = createArr(12).map(value => ({
        value,
        label: n2s(value + 1)
      }))
      const days = createArr(
        getDaysOfMonth(years[index[0] || 0].value, months[index[1] || 0].value)
      ).map(value => ({ value, label: n2s(value + 1) }))
      return [years, months, days]
    }
  },
  methods: {
    onChange({ i, newIndex }) {
      this.changedIndex = i
      if (newIndex !== this.index[i]) {
        for (let j = 2; j > i; j--) {
          this.index.splice(j, 1, 0)
        }
        this.index.splice(i, 1, newIndex)
      }
    },
    onConfirm() {
      const { items, index, mySpliter } = this
      const year = items[0][index[0] || 0].label
      const month = items[1][index[1] || 0].label
      const date = items[2][index[2] || 0].label
      this.$emit('confirm', `${year}${mySpliter}${month}${mySpliter}${date}`)
    }
  }
}
</script>
