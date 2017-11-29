<template lang="pug">
  .page
    .weui-cells__title Picker
    .weui-cells
      picker(:items="[arr1, arr2]" @confirm="onPickerConfirm" ref="picker")
      picker(:items="arr1" mult @confirm="onMultPickerConfirm" ref="multPicker")
      //- area-picker(@confirm="onDateConfirm" ref="areaPicker")
      //- date-picker(@confirm="onAreaConfirm" ref="datePicker")
</template>

<script>
import Picker from '@/components/Picker'
// import AreaPicker from '@/components/AreaPicker'
// import DatePicker from '@/components/DatePicker'
const createArr = arr => arr.map((text, value) => ({ text, value }))
export default {
  name: 'page-picker',
  components: {
    Picker
    // AreaPicker,
    // DatePicker
  },
  data() {
    return {
      arr1: createArr(['A', 'B', 'C', 'D', 'E']),
      arr2: createArr(['甲', '乙', '丙', '丁'])
    }
  },
  methods: {
    onPickerConfirm({ index, label, value }) {
      console.log(index, label, value)
    },
    onMultPickerConfirm({ indexes, labels, values }) {
      console.log(indexes)
      console.log(labels)
      console.log(values)
    },
    onAreaConfirm({ province, city, area }) {
      console.log(`${province} ${city} ${area}`)
    },
    onDateConfirm({ year, month, date }) {
      console.log(`${year}-${month}=${date}`)
    }
  }
}
</script>

