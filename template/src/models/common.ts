export const provinceOptions = [
  {
    value: '',
    label: ''
  },
  {
    value: '1',
    label: '闽'
  },
  {
    value: '2',
    label: '浙'
  },
  {
    value: '3',
    label: '赣'
  },
  {
    value: '4',
    label: '粤'
  },
  {
    value: '5',
    label: '苏'
  },
  {
    value: '6',
    label: '豫'
  },
  {
    value: '7',
    label: '京'
  },
  {
    value: '8',
    label: '津'
  },
  {
    value: '9',
    label: '沪'
  },
  {
    value: '10',
    label: '鲁'
  },
  {
    value: '11',
    label: '渝'
  },
  {
    value: '12',
    label: '澳'
  },
  {
    value: '13',
    label: '港'
  },
  {
    value: '14',
    label: '冀'
  },
  {
    value: '15',
    label: '晋'
  },
  {
    value: '16',
    label: '湘'
  },
  {
    value: '17',
    label: '鄂'
  },
  {
    value: '18',
    label: '吉'
  },
  {
    value: '19',
    label: '黑'
  },
  {
    value: '20',
    label: '辽'
  },
  {
    value: '21',
    label: '皖'
  },
  {
    value: '22',
    label: '桂'
  },
  {
    value: '23',
    label: '川'
  },
  {
    value: '24',
    label: '贵'
  },
  {
    value: '25',
    label: '云'
  },
  {
    value: '26',
    label: '陕'
  },
  {
    value: '27',
    label: '甘'
  },
  {
    value: '28',
    label: '青'
  },
  {
    value: '29',
    label: '宁'
  },
  {
    value: '30',
    label: '新'
  },
  {
    value: '31',
    label: '藏'
  },
  {
    value: '32',
    label: '蒙'
  },
  {
    value: '33',
    label: '琼'
  }
]

export const dimensionOptions = [
  {
    value: 0,
    label: '日'
  }, {
    value: 1,
    label: '周'
  }, {
    value: 2,
    label: '旬'
  }, {
    value: 3,
    label: '月'
  }, {
    value: 4,
    label: '季度'
  }, {
    value: 5,
    label: '半年'
  }, {
    value: 6,
    label: '年'
  }
]

export const TransfiniteCarType = [
  {
    value: 0,
    label: '轴数'
  }, {
    value: 1,
    label: '吨位'
  }, {
    value: 2,
    label: '超限率'
  }
]

export const deviceSelectOption = [
  {
    value: '0',
    label: '全部'
  },
  {
    value: '1',
    label: '治超站点'
  },
  {
    value: '2',
    label: '视频监控'
  }
]

export const menuTypeOptions = [
  {
    type: 'button',
    name: '按钮'
  },
  {
    type: 'menu',
    name: '菜单'
  }
]

export const roleOverloadOptions = [
  {
    value: '数据操作',
    label: '数据操作'
  }, {
    value: '一级审核',
    label: '一级审核'
  }, {
    value: '二级审核',
    label: '二级审核'
  }
]

export const roleIllegalOptions = [
  {
    value: '违法一级审核',
    label: '违法一级审核'
  }, {
    value: '违法二级审核',
    label: '违法二级审核'
  }
]

export const userStatus = [
  {
    value: 0,
    label: '禁用'
  },
  {
    value: 1,
    label: '正常'
  },
  {
    value: 2,
    label: '隐藏'
  }
]

export const userGender = [
  {
    value: 0,
    label: '女'
  },
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '未知'
  }
]

export const xmSite = [
  {
    value: '7',
    label: '全市'
  }, {
    value: '1',
    label: '海沧区'
  }, {
    value: '2',
    label: '翔安区'
  }, {
    value: '3',
    label: '同安区'
  }, {
    value: '4',
    label: '集美区'
  }, {
    value: '5',
    label: '湖里区'
  }, {
    value: '6',
    label: '思明区'
  }
]

export const dataTypeOptions = [
  {
    value: 1,
    label: '超限车辆数据'
  },
  {
    value: 2,
    label: '违法车辆数据'
  },
  {
    value: 3,
    label: '卡口车辆数据'
  }
]

export const boardOptionsList = [
  {
    value: 'plate_number',
    label: '车牌号码'
  }, {
    value: 'vehicle_type',
    label: '车辆类型'
  }, {
    value: 'vehicle_speed',
    label: '车速'
  }, {
    value: 'axis_count',
    label: '轴数'
  }, {
    value: 'vehicle_weight',
    label: '车货总重'
  }, {
    value: 'load_limit',
    label: '限载'
  }, {
    value: 'over_weight',
    label: '超重(t)'
  }, {
    value: 'over_limit_rate',
    label: '超限超载百分比'
  }, {
    value: 'lane_no',
    label: '车道'
  }, {
    value: 'snap_time',
    label: '抓拍时间'
  }]

export const BoardMap = new Map(
  [['车牌号码', '车牌'],
    ['超重(t)', '超重'],
    ['超限超载百分比', '超重率'],
    ['车辆类型', '车辆类型'],
    ['车速', '车速'],
    ['轴数', '轴数'],
    ['车货总重', '车货总重'],
    ['限载', '限载'],
    ['车道', '车道'],
    ['抓拍时间', '抓拍时间']]
)

export const weightOptions = [
  {
    value: 1,
    label: '0-49T'
  }, {
    value: 2,
    label: '49-60T'
  }, {
    value: 3,
    label: '60-100T'
  }, {
    value: 4,
    label: '>100T'
  }
]

export const axisOptions = [
  {
    value: 2,
    label: '2轴'
  }, {
    value: 3,
    label: '3轴'
  }, {
    value: 4,
    label: '4轴'
  }, {
    value: 5,
    label: '5轴'
  }, {
    value: 6,
    label: '6轴'
  }, {
    value: 7,
    label: '7轴'
  }, {
    value: 8,
    label: '8轴'
  }
]

export const nativeOptions = [
  {
    value: '1',
    label: '厦门籍'
  }, {
    value: '2',
    label: '非厦门籍'
  }
]

export const countOptions = [
  {
    value: '1',
    label: '超限三次以上'
  }
]

export const operateNameOptions = [
  {
    value: '颁发',
    label: '颁发'
  },
  {
    value: '注销',
    label: '注销'
  },
  {
    value: '申请',
    label: '申请'
  },
  {
    value: '预登记',
    label: '预登记'
  },
  {
    value: '停业',
    label: '停业'
  }
]
