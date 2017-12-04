<template lang="pug">
  picker(:items="items" :index="index" title="地区" mult @confirm="onConfirm" @onChange="onChange" :isDefault="isDefault")
</template>

<script>
import Picker from './index'
import { provinceList, cityList, areaList } from './areaData'
export default {
  name: 'area-picker',
  components: {
    Picker
  },
  props: ['provinceId', 'cityId', 'areaId', 'isDefault'],
  data() {
    return {
      index: []
    }
  },
  created() {
    const { provinceId, cityId, areaId, isDefault } = this
    if (provinceId) {
      if (cityId) {
        if (areaId) {
          this.value = [provinceId, cityId, areaId]
        } else {
        }
      } else {
      }
    } else {
      if (isDefault) {
        this.index = [0, 0, 0]
      }
    }
  },
  computed: {
    items() {
      const { index } = this
      if (index.length === 0) return []
      const cities = cityList[provinceList[index[0]].value]
      const areas = areaList[cities[index[1]].value]
      return [provinceList, cities, areas]
    }
  },
  methods: {
    onChange({ i, newIndex }) {
      if (newIndex !== this.index[i]) {
        for (let j = 2; j > i; j--) {
          this.index.splice(j, 1, 0)
        }
        this.index.splice(i, 1, newIndex)
      }
    },
    onConfirm(result) {
      console.log(result)
      const { $emit, items, index } = this
      const province = items[index[0]]
      const city = items[index[1]]
      const area = items[index[2]]
      $emit('confirm', {
        province,
        city,
        area
      })
    }
  }
}
</script>
