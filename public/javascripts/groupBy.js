module.exports = Array.prototype.groupBy = function (prop) {
  let keyword = []
  return this.reduce(function (groups, item) {
    const val = item[prop].slice(0, 7)
    keyword.push(val)

    // 排除重複值
    keyword = keyword.filter(function (element, index, arr) {
      return arr.indexOf(element) === index
    })

    // 自訂物件
    let result = keyword.map((item) => {
      const dateTemp = {}
      dateTemp.dateGroup = item
      //dateTemp.url = `/condition?date=${item}`
      dateTemp.selectedValue = ''
      return dateTemp
    })

    //console.log('1:', val)    
    //groups[val] = groups[val] || []
    //groups[val].push(item)
    //return groups

    return result
  }, {})
};