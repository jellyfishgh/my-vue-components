export const getIndexBy = (arr, value, key = 'value') => {
  let index = -1
  for (let i = 0; i < arr.length; i++) {
    let v = typeof arr[i] === 'object' ? arr[i][key] : arr[i]
    if (v === value) return i
  }
  return index
}

export const createArr = (end, start = 0, step = 1) => {
  const arr = []
  for (let i = start; i < end; i += step) {
    arr.push(i)
  }
  return arr
}
