<template lang="pug">
  .page
    .weui-cells__title Picker
    .weui-cells
      picker(:items="[]" title="字母" @empty="emptyHandler")
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm")
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm" ft="请选择" small)
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm" position="center" ft="请选择")
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm" placeholder="请选择" position="right")
      picker(:items="arr1" title="字母" @confirm="onPickerConfirm" placeholder="请选择" position="right" small)
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
      area-picker(@confirm="onAreaConfirm" position="center" small)
      area-picker(@confirm="onAreaConfirm" position="right" small isDefault)
      area-picker(@confirm="onAreaConfirm" provinceId="210000" cityId="210200" areaId="210204")
      date-picker(@confirm="onDateConfirm")
      date-picker(@confirm="onDateConfirm" isDefault)
      date-picker(@confirm="onDateConfirm" date="2015-01-20")
      date-picker(@confirm="onDateConfirm" date="2016-11-13" start="1992")
      date-picker(@confirm="onDateConfirm" date="2010-11-13" end="2035")
      date-picker(@confirm="onDateConfirm" date="2019-11-13" start="1992" end="2035")
</template>

<script>
import Picker from '@/components/Picker'
import AreaPicker from '@/components/Picker/AreaPicker'
import DatePicker from '@/components/Picker/DatePicker'
const createArr = arr => arr.map((label, index) => ({ label, value: `value${index}` }))
export default {
  name: 'page-picker',
  components: {
    Picker,
    AreaPicker,
    DatePicker
  },
  data() {
    return {
      arr1: createArr(['A', 'B', 'C', 'D', 'E']),
      arr2: createArr(['甲', '乙', '丙', '丁'])
    }
  },
  methods: {
    emptyHandler() {
      console.log('字母items为空')
    },
    onPickerConfirm({ index, label, value }) {
      console.log(index, label, value)
    },
    onMultPickerConfirm({ indexes, labels, values }) {
      console.log(indexes)
      console.log(labels)
      console.log(values)
    },
    onAreaConfirm({ province, city, area }) {
      console.log(`${province.label} ${city.label} ${area.label}`)
    },
    onDateConfirm(dateStr) {
      console.log(dateStr)
    }
  }
}
</script>

