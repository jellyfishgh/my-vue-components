export const getIndexBy = (arr, value, key = 'value') => {
  let index = -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) return i
  }
  return index
}
