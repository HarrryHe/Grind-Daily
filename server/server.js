// 1. 导入依赖
const express = require('express');  // 导入 Express 框架
const app = express();               // 创建 Express 应用实例
const PORT = 5000;                   // 定义服务器运行的端口号

// 2. 配置中间件
app.use(express.json());  // 使用内置的中间件解析 JSON 数据，用于解析请求体中的 JSON 数据

// 3. 定义简单的 API 路由
app.get('/api', (req, res) => {
    // 当访问 /api 路由时，发送一个 JSON 响应
    res.json({ message: 'Hello from Node.js server!' });
});

// 4. 启动服务器并监听指定端口
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
