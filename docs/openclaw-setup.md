# 🦞 OpenCLAW 配置指南

本文档详细说明 OpenCLAW 接入析芒全迹 CLAW Bridge 的配置方法。

## 什么是 OpenCLAW？

[OpenCLAW](https://github.com/nousresearch/openclaw) 是一个开源协议框架，让 AI 助手（Claude、GPT 等）通过标准化接口调用外部工具和数据源。析芒全迹 CLAW Bridge 实现了 OpenCLAW 协议的服务端，因此 OpenCLAW 用户可以直接通过配置接入。

## 前提条件

- 已安装 [OpenCLAW](https://github.com/nousresearch/openclaw)
- 已获取析芒全迹 [API Key](#获取-api-key)

## 配置步骤

### 1️⃣ 获取 API Key

1. 访问 [析芒全迹官网](https://xmqj.top) 下载 APP
2. 注册登录后，进入「我的 → AI 智能查询」
3. 点击「立即开启」生成 API Key
4. **复制并妥善保存**（仅创建时展示一次）

### 2️⃣ 配置 MCP Server

编辑 OpenCLAW 的 `mcp_servers.json`（通常位于 `~/.openclaw/` 或启动目录）：

```json
{
  "mcpServers": {
    "legal-query": {
      "url": "https://xmqjglht.top/api/claw/v1",
      "headers": {
        "X-API-Key": "xmqj_u1_你的Key"
      },
      "type": "openclaw"
    }
  }
}
```

### 3️⃣ 启动并使用

```bash
openclaw start
```

在对话中输入：

```text
"查某科技有限公司的涉诉记录"
"张三有没有失信记录？"
"某建筑公司的资质信息"
"验证王五的身份证"
```

---

## Hermes Agent 配置

```yaml
# ~/.hermes/config.yaml
tools:
  legal_query:
    type: http
    method: POST
    url: https://xmqjglht.top/api/claw/v1/query
    headers:
      X-API-Key: xmqj_u1_your_api_key_here
    body:
      module_code: "{{module}}"
      params: {{params}}
    description: 析芒全迹 - 查询司法、企业、身份验证等法律数据

  legal_modules:
    type: http
    method: POST
    url: https://xmqjglht.top/api/claw/v1/modules
    headers:
      X-API-Key: xmqj_u1_your_api_key_here
    description: 获取所有可查询模块列表

  legal_quota:
    type: http
    method: POST
    url: https://xmqjglht.top/api/claw/v1/quota
    headers:
      X-API-Key: xmqj_u1_your_api_key_here
    description: 查询剩余查询额度
```

---

## OpenAI Function Calling 配置

```json
[
  {
    "type": "function",
    "function": {
      "name": "legal_query",
      "description": "查询司法、企业、身份验证等法律数据",
      "parameters": {
        "type": "object",
        "properties": {
          "module_code": {
            "type": "string",
            "description": "模块代码，如: enterprise_litigation, dishonest_person, enterprise_litigation_detail_backup"
          },
          "params": {
            "type": "object",
            "description": "查询参数，根据模块不同而异"
          }
        },
        "required": ["module_code", "params"]
      }
    }
  }
]
```

---

## 常见模块代码参考

| 模块名称 | module_code | 必填参数 |
|:---------|:------------|:---------|
| 企业涉诉查询 | `enterprise_litigation` | `company_name` |
| 企业涉诉详版 | `enterprise_litigation_detail_backup` | `company_name` |
| 失信被执行人 | `dishonest_person` | `name`, `id_card` |
| 个人涉诉查询 | `personal_litigation` | `name`, `id_card` |
| 企业工商信息 | `enterprise_fuzzy` | `company_name` |
| 企业资质查询 | `enterprise_qualification` | `company_name` |
| 身份证核验 | `id_card_two_factor` | `name`, `id_card` |
| 婚姻状态匹配 | `dual_marriage_match` | `name1`, `id_card1`, `name2`, `id_card2` |

> 完整模块列表调用 `POST /api/claw/v1/modules` 获取。
