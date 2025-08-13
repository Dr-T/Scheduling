# 岗编人效智能体

项目初始化岗编模拟系统，基于AI智能分析的物业管理人员配置优化工具。

## 环境变量配置

### 本地开发

1. 在项目根目录创建 `.env` 文件
2. 添加以下环境变量：
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Vercel部署

1. 在Vercel项目设置中添加环境变量：
   - 变量名：`GEMINI_API_KEY`
   - 变量值：你的Gemini API密钥

2. 或者使用Vercel CLI：
```bash
vercel env add GEMINI_API_KEY
```

## 功能特性

- 项目画像数据采集
- SHEU分析与孪生项目对标
- 基准岗编建议生成
- 岗编优化模拟器
- AI风险评估
- 智能设备建议
- 岗位职责说明书生成

## 技术架构

- 前端：HTML + JavaScript + Tailwind CSS
- 后端API：Vercel Serverless Functions
- AI服务：Google Gemini API
- 部署平台：Vercel

## 安全说明

- API密钥通过环境变量管理，不在代码中硬编码
- 所有API调用通过服务器端代理，保护密钥安全
- 支持重试机制和错误处理