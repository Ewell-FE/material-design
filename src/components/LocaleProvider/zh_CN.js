import CalendarLocale from 'rc-calendar/lib/locale/zh_CN'
import Pagination from 'rc-pagination/lib/locale/zh_CN';

export default {
    locale: 'zh-cn',
    Pagination,
    DatePicker: {
        lang: {
            placeholder: '请选择日期',
            monthPlaceholder: '请选择月份',
            rangePlaceholder: '开始日期 - 结束日期',
            weekPlaceholder: '请选择第几周',
            ...CalendarLocale,
        },
        timePickerLocale: {
            dateInputPlaceholder: '请输入',
            RangeDateInputPlaceholder: ['开始时间', '结束时间'],
            placeholder: '请选择时间',
        },
    },
    TimePicker: {
        placeholder: '请选择时间',
    },
    Modal: {
        okText: '确定',
        cancelText: '取消',
    },
    Popconfirm: {
        okText: '确定',
        cancelText: '取消',
    },
    Transfer: {
        notFoundContent: ['列表为空'],
        searchPlaceholder: ['请输入搜索内容'],
    },
    Select: {
        notFoundContent: '无匹配结果',
        enterAlertContent: '请输入4个字符'
    },
    Upload: {
        uploading: '文件上传中',
        removeFile: '删除文件',
        uploadError: '上传错误',
        previewFile: '预览文件',
    },
    Table: {
        noData: '暂无数据'
    }
};