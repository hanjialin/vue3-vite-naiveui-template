import { App } from 'vue'
import { toDegrees } from '@/utils/tools/coordConver'
import XEUtils, { isEmpty } from 'xe-utils'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import { pageSize } from '@/hooks/web/config/pagination'
import {
  // 全局对象
  VXETable,
  // 表格功能
  Icon,
  // Filter,
  // Edit,
  // Menu,
  Export,
  Keyboard,
  // Validator,

  // 可选组件
  Column,
  Colgroup,
  Grid,
  Tooltip,
  Toolbar,
  Pager,
  // Form,
  // FormItem,
  // FormGather,
  Checkbox,
  CheckboxGroup,
  Radio,
  // RadioGroup,
  // RadioButton,
  // Switch,
  Input,
  Select,
  // Optgroup,
  // Option,
  // Textarea,
  Button,
  Modal,
  // List,
  // Pulldown,

  // 表格
  Table
} from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import '@/assets/style/vxe_table.scss'
import { education, formation, fullSsduty, lecturer, profession } from '@/config/data'
// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
  // size: 'small',
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
VXETable.use(VXETablePluginExportXLSX)
VXETable.formats.mixin({
  isNull: ({ cellValue }) => {
    if (XEUtils.isNull(cellValue)) {
      return '--'
    } else if (cellValue == 'null') {
      return '--'
    } else if (cellValue == '') {
      return '--'
    }
    return cellValue
  },
  yesOrNoFormatter: ({ cellValue }) => {
    if (XEUtils.isNull(cellValue)) {
      return '--'
    }
    return cellValue === '1' ? '是' : '否'
  },
  educationFormatter: ({ cellValue }) => {
    if (XEUtils.isNull(cellValue)) {
      return '--'
    }
    const obj = XEUtils.find(education, (item) => item.value === cellValue)
    return XEUtils.isNull(obj) ? '--' : obj.label
  },
  formationFormatter: ({ cellValue }) => {
    if (XEUtils.isNull(cellValue)) {
      return '--'
    }
    const obj = XEUtils.find(formation, (item) => item.value === cellValue)
    return XEUtils.isNull(obj) ? '--' : obj.label
  },
  fullSsdutyFormatter: ({ cellValue }) => {
    console.log(cellValue)
    if (XEUtils.isNull(cellValue)) {
      return '--'
    }
    const obj = XEUtils.find(fullSsduty, (item) => item.value === cellValue)
    return XEUtils.isNull(obj) ? '--' : obj.label
  },
  lecturerFormatter: ({ cellValue }) => {
    if (XEUtils.isNull(cellValue)) {
      return '--'
    }
    const obj = XEUtils.find(lecturer, (item) => item.value === cellValue)
    return XEUtils.isNull(obj) ? '--' : obj.label
  },
  professionFormatter: ({ cellValue }) => {
    if (XEUtils.isNull(cellValue)) {
      return '--'
    }
    const obj = XEUtils.find(profession, (item) => item.value === cellValue)
    return XEUtils.isNull(obj) ? '--' : obj.label
  },
  coverDegrees: ({ cellValue }) => {
    const value = toDegrees(cellValue)
    return value == '' ? '--' : value
  },
  equState: ({ cellValue }) => {
    if (cellValue === '1') {
      return '未领用'
    } else if (cellValue === '0') {
      return '已领用'
    }
    return '--'
  }
})

export function useTable(app: App) {
  // 表格功能
  app
    .use(Icon)
    // .use(Filter)
    // .use(Edit)
    // .use(Menu)
    .use(Export)
    .use(Keyboard)
    // .use(Validator)

    // 可选组件
    .use(Column)
    .use(Colgroup)
    .use(Grid)
    .use(Tooltip)
    .use(Toolbar)
    .use(Pager)
    // .use(Form)
    // .use(FormItem)
    // .use(FormGather)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Radio)
    // .use(RadioGroup)
    // .use(RadioButton)
    // .use(Switch)
    .use(Input)
    .use(Select)
    // .use(Optgroup)
    // .use(Option)
    // .use(Textarea)
    .use(Button)
    .use(Modal)
    // .use(List)
    // .use(Pulldown)

    // 安装表格
    .use(Table)

  // 给 vue 实例挂载内部对象，例如：
  // app.config.globalProperties.$XModal = VXETable.modal
  // app.config.globalProperties.$XPrint = VXETable.print
  // app.config.globalProperties.$XSaveFile = VXETable.saveFile
  // app.config.globalProperties.$XReadFile = VXETable.readFile
}
