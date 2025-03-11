import { App } from 'vue'
import XEUtils from 'xe-utils'
import { pageSize } from '@/hooks/web/config/pagination'
import {
  VxeUI,
  VxeButton,
  VxeButtonGroup,
  VxeForm,
  VxeFormGroup,
  VxeFormItem,
  VxeIcon,
  VxeLoading,
  VxeModal,
  VxePager,
  VxePrint,
  VxeTooltip
} from 'vxe-pc-ui'
import { VxeTable, VxeColumn, VxeColgroup, VxeGrid, VxeToolbar } from 'vxe-table'
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'
import '@/assets/style/vxe_table.scss'
import VxeUIPluginExportXLSX from '@vxe-ui/plugin-export-xlsx'
import ExcelJS from 'exceljs'
// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VxeUI.setConfig({
  size: 'small',
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
  pager: {
    size: 'small',
    background: true,
    autoHidden: false,
    perfect: false,
    pageSize: pageSize.value,
    pagerCount: 7,
    pageSizes: [10, 15, 30, 50, 100, 300, 500, 1000],
    // prettier-ignore
    layouts: ['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']
  },
  table: {
    size: 'small',
    stripe: true,
    border: true,
    round: true,
    showOverflow: 'tooltip',
    tooltipConfig: {
      showAll: false,
      theme: 'dark'
    },
    rowConfig: {
      isHover: true
    }
  }
})
//调用xlsx导出
VxeUI.use(VxeUIPluginExportXLSX, { ExcelJS })
VxeUI.formats.mixin({
  isNull: {
    tableCellFormatMethod: ({ cellValue }) => {
      if (XEUtils.isNull(cellValue)) {
        return '--'
      } else if (cellValue === 'null') {
        return '--'
      } else if (cellValue === '') {
        return '--'
      }
      return cellValue
    }
  }
})

export function useTable(app: App) {
  // 表格功能
  app.use(VxeButton)
  app.use(VxeButtonGroup)
  app.use(VxeForm)
  app.use(VxeFormGroup)
  app.use(VxeFormItem)
  app.use(VxeIcon)
  app.use(VxeLoading)
  app.use(VxeModal)
  app.use(VxePager)
  app.use(VxePrint)
  app.use(VxeTooltip)
  app.use(VxeTable)
  app.use(VxeColumn)
  app.use(VxeColgroup)
  app.use(VxeGrid)
  app.use(VxeToolbar)

  // 给 vue 实例挂载内部对象，例如：
  // app.config.globalProperties.$XModal = VXETable.modal
  // app.config.globalProperties.$XPrint = VXETable.print
  // app.config.globalProperties.$XSaveFile = VXETable.saveFile
  // app.config.globalProperties.$XReadFile = VXETable.readFile
}
