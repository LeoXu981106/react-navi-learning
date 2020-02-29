# 知识森林导航学习系统（前端）

## 框架

前端框架：[umijs](https://umijs.org/zh/guide/)

状态管理：[dvajs](https://dvajs.com/guide/)

API请求：[axios](https://github.com/axios/axios) 二次封装

## `src`目录结构

- `assets` 存放课程下知识主题间认知关系图（`${domainId}.png`），使用[认知关系可视化模块](https://github.com/wkw307/topic-dependence-visualization)导出。
- `modules` 存放[认知关系可视化模块](https://github.com/wkw307/topic-dependence-visualization/releases)
- `services` 使用`request`封装后端API
- `layouts` `locales` `models` `pages` 全局样式（layout）、前端路由（pages）、状态管理（models）详见[**umijs**](https://umijs.org/zh/guide/app-structure.html)文档

## 开发

1. `yarn install`

2. [认知关系可视化模块](https://github.com/wkw307/topic-dependence-visualization/releases)下载并放入`src/modules/`

3. `yarn start`
