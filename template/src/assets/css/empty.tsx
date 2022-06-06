import VXETable from 'vxe-table'
// @ts-ignore
import Empty from '../images/ic_empty.png'

// 创建一个空内容渲染
VXETable.renderer.add('NotData', {
  // 空内容模板
  renderEmpty (renderOpts, params) {
    return [
      <span>
        <img src={Empty}/>
        <p>暂无数据</p>
      </span>
    ]
  }
})
