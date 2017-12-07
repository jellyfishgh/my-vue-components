<template lang="pug">
  picker(:items="items" :index="index" title="地区" mult @confirm="onConfirm" @onChange="onChange" :isDefault="isDefault" :position="position" :small="small")
</template>

<script>
import Picker from './index'
import { provinceList, cityList, areaList } from './areaData'
import { getIndexBy } from '@/utils/arr'
export default {
  name: 'area-picker',
  components: {
    Picker
  },
  props: ['provinceId', 'cityId', 'areaId', 'isDefault', 'position', 'small'],
  data() {
    return {
      index: []
    }
  },
  created() {
    const { provinceId, cityId, areaId, isDefault } = this
    if (provinceId) {
      const provinceIndex = getIndexBy(provinceList, provinceId)
      if (provinceIndex !== -1 && cityId) {
        const cityIndex = getIndexBy(cityList[provinceId], cityId)
        if (cityIndex !== -1 && areaId) {
          const areaIndex = getIndexBy(areaList[cityId], areaId)
          if (areaIndex !== -1) {
            this.index = [provinceIndex, cityIndex, areaIndex]
          }
        }
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
      const cities = cityList[provinceList[index[0] || 0].value]
      const areas = areaList[cities[index[1] || 0].value]
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
    onConfirm() {
      const { items, index } = this
      const province = items[0][index[0] || 0]
      const city = items[1][index[1] || 0]
      const area = items[2][index[2] || 0]
      this.$emit('confirm', {
        province,
        city,
        area
      })
    }
  }
}
</script>
