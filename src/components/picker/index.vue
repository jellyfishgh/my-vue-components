<template lang="pug">
  div(v-if="state === STATE_SHOW")
    .weui-mask.weui-animate-fade-in(@click.stop="hide")
    .weui-picker.weui-animate-slide-up(@click.stop="() => false")
      .weui-picker__hd
        each val, index in ['取消', '确认']
          a.weui-picker__action(href="javascript:;" @click.stop=`onClick(${index})`)= val
      .weui-picker__bd(ref="wheelWrapper")
        .weui-picker__group.wheel(v-for="(items, index) of pickerData" :key="index")
          .weui-picker__content.wheel-scroll
            .weui-picker__item.wheel-item(v-for="{value, text} of items" :key="value") {{text}}
          .weui-picker__mask
          .weui-picker__indicator
</template>

<script>
import BScroll from 'better-scroll'

const STATE_HIDE = 0
const STATE_SHOW = 1

const EVENT_SELECT = 'select'
const EVENT_VALUE_CHANGE = 'valuechange'
const EVENT_CANCEL = 'cancel'
const EVENT_CHANGE = 'change'

export default {
  name: 'picker',
  props: ['data', 'selectedIndex'],
  data() {
    const { data = [[]] } = this
    return {
      state: STATE_HIDE,
      pickerData: data.slice(),
      pickerSelectedIndex: this.selectedIndex,
      pickerSelectedVal: [],
      pickerSelectedText: [],
      STATE_SHOW
    }
  },
  created() {
    const { pickerSelectedIndex } = this
    if (!pickerSelectedIndex || pickerSelectedIndex.length === 0) {
      this.pickerSelectedIndex = []
      for (let i = 0; i < this.pickerData.length; i++) {
        this.pickerSelectedIndex[i] = 0
      }
    }
  },
  methods: {
    confirm() {
      if (!this._canConfirm()) {
        return
      }
      this.hide()

      let changed = false
      for (let i = 0; i < this.pickerData.length; i++) {
        let index = this.wheels[i].getSelectedIndex()
        this.pickerSelectedIndex[i] = index
        let value = null
        if (this.pickerData[i].length) {
          value = this.pickerData[i][index].value
        }
        if (this.pickerSelectedVal[i] !== value) {
          changed = true
        }
        this.pickerSelectedText[i] = this.pickerData[i][index].text
      }

      this.$emit(
        EVENT_SELECT,
        this.pickerSelectedVal,
        this.pickerSelectedIndex,
        this.pickerSelectedText
      )
      if (changed) {
        this.$emit(
          EVENT_VALUE_CHANGE,
          this.pickerSelectedVal,
          this.pickerSelectedIndex,
          this.pickerSelectedText
        )
      }
    },
    cancel() {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },
    onClick(index) {
      if (index) this.confirm()
      else this.cancel()
    },
    show() {
      if (this.state === STATE_SHOW) {
        return
      }
      this.state = STATE_SHOW
      if (!this.wheels || this.dirty) {
        this.$nextTick(() => {
          this.wheels = []
          let wheelWrapper = this.$refs.wheelWrapper
          for (let i = 0; i < this.pickerData.length; i++) {
            this._createWheel(wheelWrapper, i)
          }
          this.dirty = false
        })
      } else {
        for (let i = 0; i < this.pickerData.length; i++) {
          this.wheels[i].enable()
          this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
        }
      }
    },
    hide() {
      this.state = STATE_HIDE
      for (let i = 0; i < this.pickerData.length; i++) {
        this.wheels[i].disable()
      }
    },
    setData(data) {
      this.pickerData = data.slice()
      this.dirty = true
    },
    setSelectedIndex(index) {
      this.pickerSelectedIndex = index
    },
    refill(datas) {
      let ret = []
      if (!datas.length) {
        return ret
      }
      datas.forEach((data, index) => {
        ret[index] = this.refillColumn(index, data)
      })
      return ret
    },
    refillColumn(index, data) {
      if (this.state !== STATE_SHOW) {
        console.error('can not use refillColumn when picker is not show')
        return
      }
      const wheelWrapper = this.$refs.wheelWrapper
      let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
      let wheel = this.wheels[index]
      if (scroll && wheel) {
        let oldData = this.pickerData[index]
        this.$set(this.pickerData, index, data)
        let selectedIndex = wheel.getSelectedIndex()
        let dist = 0
        if (oldData.length) {
          let oldValue = oldData[selectedIndex].value
          for (let i = 0; i < data.length; i++) {
            if (data[i].value === oldValue) {
              dist = i
              break
            }
          }
        }
        this.pickerSelectedIndex[index] = dist
        this.$nextTick(() => {
          // recreate wheel so that the wrapperHeight will be correct.
          wheel = this._createWheel(wheelWrapper, index)
          wheel.wheelTo(dist)
        })
        return dist
      }
    },
    scrollTo(index, dist) {
      const wheel = this.wheels[index]
      this.pickerSelectedIndex[index] = dist
      wheel.wheelTo(dist)
    },
    refresh() {
      setTimeout(() => {
        this.wheels.forEach((wheel, index) => {
          wheel.refresh()
        })
      }, 200)
    },
    _createWheel(wheelWrapper, i) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wheelWrapper.children[i], {
          wheel: {
            selectedIndex: this.pickerSelectedIndex[i],
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item'
          },
          probeType: 3
        })
        this.wheels[i].on('scrollEnd', () => {
          this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
        })
      } else {
        this.wheels[i].refresh()
      }
      return this.wheels[i]
    },
    _canConfirm() {
      return this.wheels.every(wheel => {
        return !wheel.isInTransition
      })
    }
  },
  watch: {
    data(newData) {
      this.setData(newData)
    }
  }
}
</script>

<style lang="less">
@height: 34px;
.weui-picker__item {
  padding: 0;
  height: @height;
  line-height: @height;
}
.wheel {
  overflow: hidden;
  .wheel-scroll {
    padding: 0;
    margin-top: @height*3;
  }
}
</style>
