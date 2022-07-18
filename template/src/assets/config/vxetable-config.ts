import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import '@/assets/css/empty.tsx'
import '@/assets/css/vxetable.scss'

VXETable.setup({
  table: {
    border: "inner",
    highlightHoverRow: true,
    emptyRender: {
      name: 'NotData'
    }
  },
  pager: {
    align: 'right',
    border: false,
    autoHidden: false,
    perfect: false,
    pageSizes: [10, 15, 20, 50, 100],
    layouts: ['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']
  }
})

export default VXETable
