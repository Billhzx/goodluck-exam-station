# 好运🪷🪷的备考小站 V2 设计文档

## 概述

将 V1 纯前端 localStorage 单页应用，升级为 FastAPI + React + SQLite 的完整前后端应用。同时重做移动端适配。

## 架构

```
📱 浏览器 (React SPA)
    ↕ REST API (JSON)
🐍 FastAPI 后端
    ↕ SQLAlchemy / sqlite3
🗄️ SQLite (exam_prep.db)
```

- 前后端同仓库：`backend/` + `frontend/`
- 部署时 Vite build 输出到 `backend/static/`，FastAPI 托管静态文件
- 一个 `python main.py` 启动整个应用

## 项目结构

```
lianjie/
├── backend/
│   ├── main.py            # FastAPI 入口 + 静态文件托管
│   ├── database.py        # SQLite 连接 + 表初始化
│   ├── models.py          # Pydantic 模型
│   ├── routers/
│   │   ├── todos.py       # /api/todos
│   │   ├── notes.py       # /api/notes
│   │   └── weather.py     # /api/weather (代理 Open-Meteo)
│   └── requirements.txt
├── frontend/
│   └── (现有的 Vite + React 代码，稍作调整)
└── docs/
```

## API 设计

### 天气
- `GET /api/weather` — 代理 Open-Meteo，返回兰州当前天气

### 待办事项
- `GET /api/todos` — 获取所有待办
- `POST /api/todos` — 新增 `{ "text": "..." }`
- `PATCH /api/todos/:id` — 更新 `{ "completed": true }`
- `DELETE /api/todos/:id` — 删除

### 备考记录
- `GET /api/notes` — 获取所有笔记（支持 `?date=2026-05-19` 筛选）
- `POST /api/notes` — 创建/更新 `{ "date": "2026-05-19", "content": "..." }`
- `DELETE /api/notes/:date` — 删除某天记录

### 倒计时
- `GET /api/countdown` — 返回目标日期和剩余天数

## 数据库

SQLite 单文件 `backend/exam_prep.db`，两张表：

```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE notes (
  date TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);
```

## 前端改造

- 移除 `useLocalStorage`，改为 `fetch()` 调用后端 API
- 移除 `useWeather` 中的 Open-Meteo 直连，改为调 `/api/weather`
- 移动端：全屏卡片流，16px+ 字体，48px+ 触摸按钮，加大卡片间距
- 桌面端保持两列网格布局
- 网络请求加 loading/error 状态处理

## 移动端适配要点

- 卡片 `border-radius` 适应屏幕宽度
- 按钮最小触摸区域 48x48px
- 字体最小 16px（防止 iOS 缩放）
- 卡片间距 16px+
- 待办列表项可滑动删除（可选）

## 部署

目标平台：Railway / Render
- 单服务部署，FastAPI 托管前端静态文件
- SQLite 文件持久化在服务端（Railway 支持 volume）
- 环境变量配置：无需（无第三方 API key）
