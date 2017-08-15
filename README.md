## jQuery分页插件

项目需求需要一个分页插件,基于jquery编写，jquery-paging.js必须，jquery-paging.css为分页样式，可直接使用build文件查看

1 使用方法: `$(el).paging(options);`

2 参数说明

- **total:** 总页数（默认10）
  
- **cur:** 当前页 （默认1）

- **max:** 最多显示页数（默认8，最小为5）

- **prev_text:** 前一页的文本 （默认 '<'）

- **next_text:** 后一页的文本 （默认 '>'）
  
- **cb:** 回调函数，传入参数为当前页数
  
- **待完善**
