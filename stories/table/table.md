## Table 组件的使用

```jsx
  import { Table } from 'dh-component';

  <Table 
    dataSource={dataSource}
    columns={columns}
    bordered
    fixed
    striped
  />
```

### Table

| props | 说明 | 参数类型 | 默认值  |
| ------| ------ | ------ |-----|
| dataSource | 数据数组 | array | 无  |
| columns | 表格列的配置描述，具体项见下表 | array | 无  |
| onChange | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter) | 无|
| onLoad | 动态加载数据回调,如果传入该参数,当图表滚动至尾部时将会调用该方法 | Function(size) | 无|
| rowSelection | 列表项是否可选择 | object | 无|
| size | 表格尺寸 | string (default, large, small) | default|
| bordered | 是否显示边框 | bool | false|
| striped | 是否显示条纹 | bool | true|
| fixed | 是否固定表头 | bool | false|
| sortIcon | sort icon | string | 'up'|


### columns

| props | 说明 | 参数类型 | 默认值 |
| ------| ------ | ------ |----|
| title | 列头显示文字 | string/ReactNode | 无|
| dataIndex | 列数据在数据项中对应的 key | string | 无|
| sorter | 排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true | Functions/boolean | 无|
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引 | function(text, record, index) | 无|
| frozen | 冻结此列 | bool | false|
| ext | 额外选项, 靠右显示 | element | null|
| className | 需高亮列的类名 | string | 无 |


### rowSelection

| props | 说明 | 参数类型 | 默认值  |
| ------| ------ | ------ |-----|
| onSelect | 用户手动选择/取消选择某列的回调 | function(record, selected, selectedRows) | 无 |
