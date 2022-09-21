import dayjs from 'dayjs'

export const formatDate = (timestamp: string | number | Date, type = -1) => {
  switch (type) {
    case 0:
      return dayjs(timestamp).format('YYYY年MM月DD日')
    default:
      return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
}

export const formatWeekday = (timestamp: string | number | Date) => {
  const day = dayjs(timestamp).day()
  switch (day) {
    case 0:
      return "星期天"
    case 1:
      return "星期一"
    case 2:
      return "星期二"
    case 3:
      return "星期三"
    case 4:
      return "星期四"
    case 5:
      return "星期五"
    case 6:
      return "星期六"
  }
}

export const sortBy = function (attr: string, ascending = true) {
  const asc = ascending ? 1 : -1
  return function(a: any, b: any) {
    a = a[attr]
    b = b[attr]
    if (a < b) {
      return asc * -1
    }
    if (a > b) {
      return asc * 1
    }
    return 0
  }
}

export const getWeek = (date: string | Date) => {
  if (typeof date === 'string') {
    date = new Date(Date.parse(date))
  }
  let weekday = 0
  // 如果是周日，则设为7
  if (date.getDay() === 6) {
    weekday = 7
  } else {
    weekday = date.getDay()
  }
  date.setDate(date.getDate() - weekday + 6)
  let firstDay = new Date(date.getFullYear(), 0, 1)
  const dayOfWeek = firstDay.getDay()
  let spendDay = 1
  if (dayOfWeek !== 0) {
    spendDay = 7 - dayOfWeek + 1
  }
  firstDay = new Date(date.getFullYear(), 0, 1 + spendDay)
  const d = Math.ceil((date.valueOf() - firstDay.valueOf()) / 86400000)
  const result = Math.ceil(d / 7)
  return result + 1
}

export const getStartDateInWeek = (date: string | Date) => {
  if (typeof date === 'string') {
    date = new Date(Date.parse(date))
  }
  let day = dayjs(date).day()
  if (day === 0) {
    day = 7
  }
  return dayjs(date).subtract(day - 1, "day").startOf("day").toDate()
}

export const getEndDateInWeek = (date: string | Date) => {
  if (typeof date === 'string') {
    date = new Date(Date.parse(date))
  }
  let day = dayjs(date).day()
  if (day === 0) {
    day = 7
  }
  return dayjs(date).add(7 - day, "day").endOf("day").toDate()
}

export const changeAreaToCode = (val: string) => {
  let id = "01_021"
  if (val.indexOf("海沧区") !== -1) {
    id = id + "_" + 1
  } else if (val.indexOf("翔安区") !== -1) {
    id = id + "_" + 2
  } else if (val.indexOf("集美区") !== -1) {
    id = id + "_" + 3
  } else if (val.indexOf("思明区") !== -1) {
    id = id + "_" + 4
  } else if (val.indexOf("湖里区") !== -1) {
    id = id + "_" + 5
  } else if (val.indexOf("同安区") !== -1) {
    id = id + "_" + 6
  } else {
    id = id + "_" + 7
  }
  return id
}

export const getFileExt = (filePath: string) => {
  const index = filePath.lastIndexOf(".")
  return filePath.substring(index + 1)
}

export const disabledDate = (time: Date, time2 = Date.now()) => {
  return time.getTime() > time2
}

export const isMarkerInBound = (point: AMap.LngLat, map: AMap.Map) => {
  const bounds: AMap.Bounds = map.getBounds()
  return bounds.contains(point)
}

// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
