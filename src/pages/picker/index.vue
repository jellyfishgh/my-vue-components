<template lang="pug">
  .page
    .weui-cells__title Picker
    .weui-cells
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm")
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm" isDefault)
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm" value="value3")
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm" :index="2")
      picker(:items="[arr1, arr2]" title="代号" mult @confirm="onMultPickerConfirm")
      picker(:items="[arr1, arr2]" title="代号" mult @confirm="onMultPickerConfirm" isDefault)
      picker(:items="[arr1, arr2]" title="代号" mult @confirm="onMultPickerConfirm" :value="['value0', 'value3']")
      picker(:items="[arr1, arr2]" title="代号" mult @confirm="onMultPickerConfirm" :index="[1, 2]")
      picker(:items="[arr1, arr2]" title="代号" mult @confirm="onMultPickerConfirm" isDefault spliter="-")
      picker(:items="[arr1, arr2]" title="代号" mult @confirm="onMultPickerConfirm" isDefault lastVal)
      area-picker(@confirm="onAreaConfirm" isDefault)
      area-picker(@confirm="onAreaConfirm")
      //- date-picker(@confirm="onDateConfirm")
</template>

<script>
import Picker from '@/components/Picker'
import AreaPicker from '@/components/Picker/AreaPicker'
// import DatePicker from '@/components/DatePicker'
const createArr = arr => arr.map((label, index) => ({ label, value: `value${index}` }))
export default {
  name: 'page-picker',
  components: {
    Picker,
    AreaPicker
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

