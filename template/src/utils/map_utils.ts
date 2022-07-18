import { IPositionInfo } from "@/models/position"

let lng_r, lat_r, tran_lng, tran_lat
let dlat, dlng, radlat, magic, sqrtmagic
let mglat, mglng

const ee = 0.00669342162296594323
const a = 6378245

export const WGToGCJ = (lng: number, lat: number) => {
  lng_r = lng - 105.0
  lat_r = lat - 35.0
  //经度转换
  tran_lng = 300.0 + lng_r + 2.0 * lat_r + 0.1 * lng_r * lng_r + 0.1 * lng_r * lat_r + 0.1 * Math.sqrt(Math.abs(lng_r))
  tran_lng = tran_lng + (20.0 * Math.sin(6.0 * lng_r * Math.PI) + 20.0 * Math.sin(2.0 * lng_r * Math.PI)) * 2.0 / 3.0
  tran_lng = tran_lng + (20.0 * Math.sin(lng_r * Math.PI) + 40.0 * Math.sin(lng_r / 3.0 * Math.PI)) * 2.0 / 3.0
  tran_lng = tran_lng + (150.0 * Math.sin(lng_r / 12.0 * Math.PI) + 300.0 * Math.sin(lng_r / 30.0 * Math.PI)) * 2.0 / 3.0
  //转换纬度
  tran_lat = -100.0 + 2.0 * lng_r + 3.0 * lat_r + 0.2 * lat_r * lat_r + 0.1 * lng_r * lat_r + 0.2 * Math.sqrt(Math.abs(lng_r))
  tran_lat = tran_lat + (20.0 * Math.sin(6.0 * lng_r * Math.PI) + 20.0 * Math.sin(2.0 * lng_r * Math.PI)) * 2.0 / 3.0
  tran_lat = tran_lat + (20.0 * Math.sin(lat_r * Math.PI) + 40.0 * Math.sin(lat_r / 3.0 * Math.PI)) * 2.0 / 3.0
  tran_lat = tran_lat + (160.0 * Math.sin(lat_r / 12.0 * Math.PI) + 320 * Math.sin(lat_r * Math.PI / 30.0)) * 2.0 / 3.0

  dlat = tran_lat
  dlng = tran_lng

  radlat = lat / 180.0 * Math.PI
  magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * Math.PI)
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * Math.PI)
  mglat = lat + dlat
  mglng = lng + dlng
  return [mglng, mglat]
}

export const convertPos = (pos: number[], _AMap: any = window.AMap) => {
  return new Promise((resolve, reject) => {
    _AMap.convertFrom(pos, 'gps', function (status: any, result: any) {
      if (result.info === 'ok') {
        resolve(result.locations)
      } else {
        reject(status)
      }
    })
  })
}

const covert500Trace = (pos: any[], _AMap: any = window.AMap) => {
  return new Promise((resolve, reject) => {
    const graspRoad = new _AMap.GraspRoad()
    graspRoad.driving(pos, function (error: any, result: any) {
      if (!error) {
        resolve(result.data.points)
      } else {
        reject(error)
      }
    })
  })
}

export const trajectoryCorrection = (pos: any[], _AMap: any = window.AMap) => {
  return new Promise(async (resolve, reject) => {
    if (!_AMap) {
      reject(new Error("未加载高德地图组件"))
    }
    const newPos = []
    for (let i = 0; i < pos.length; i += 500) {
      const end = i + 500 >= pos.length ? pos.length - 1 : i + 500
      if (end >= pos.length) {
        break
      }
      const arr = pos.slice(i, end)
      try {
        const res = await covert500Trace(arr)
        if (Array.isArray(res) && res.length > 0) {
          newPos.push(...res)
        }
      } catch (e) {
        console.log("解析失败", e)
        console.log(JSON.stringify(arr))
        newPos.push(...arr.map((a: any) => ({
          x: a.x,
          y: a.y
        })))
      }
    }
    resolve(newPos)
  })
}
