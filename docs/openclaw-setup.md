# 🦞 OpenCLAW + 🤖 Hermes Agent 配置指南

本文档说明如何将析芒全迹案件信息查询 API 接入各类 AI 助手。

## 支持的 AI 助手

| 方案 | 类型 | 配置难度 |
|:-----|:-----|:---------|
| **OpenCLAW** | MCP Server 协议 | ⭐ 简单 |
| **Hermes Agent** | 自定义 Tool | ⭐ 简单 |
| **OpenAI Function Calling** | Function/Tool | ⭐⭐ 中等 |
| **Claude Tool Use** | Tool 定义 | ⭐⭐ 中等 |

## 前提条件

- 已安装 OpenCLAW 或 Hermes Agent
- 已获取析芒全迹 [API Key](#获取-api-key)

## 获取 API Key

1. 访问 [析芒全迹官网](https://xmqj.top) 下载 APP
2. 注册登录后，完成 **专业人员证件认证**
3. 进入「我的 → AI 智能查询」— 点击「立即开启」生成 API Key
4. **复制并妥善保存**（仅创建时展示一次）

---

## 🤖 Hermes Agent 配置

在 `~/.hermes/config.yaml` 中添加：

```yaml
tools:
  case_query:
    type: http
    method: POST
    url: https://xmqjglht.top/api/claw/v1/query
    headers:
      X-API-Key: xmqj_u1_你的Key
    body:
      module_code: "{{module}}"
      params: {{params}}
    description: 析芒全迹 - 查询企业涉诉、案件信息、背景调查数据

  case_modules:
    type: http
    method: POST
    url: https://xmqjglht.top/api/claw/v1/modules
    headers:
      X-API-Key: xmqj_u1_你的Key
    description: 获取所有可查询模块列表

  case_quota:
    type: http
    method: POST
    url: https://xmqjglht.top/api/claw/v1/quota
    headers:
      X-API-Key: xmqj_u1_你的Key
    description: 查询剩余查询额度
```

**使用示例：**
```text
"帮我查一下张三的失信记录"
"查某科技有限公司有哪些涉诉案件"
"某建筑公司的资质信息查一下"
"看看我的剩余查询额度"
```

---

## 🦞 OpenCLAW 配置

在 OpenCLAW 的 `mcp_servers.json` 中添加：

```json
{
  "mcpServers": {
    "case-query": {
      "url": "https://xmqjglht.top/api/claw/v1",
      "headers": {
        "X-API-Key": "xmqj_u1_你的Key"
      },
      "type": "openclaw"
    }
  }
}
```

启动后自然语言查询即可。

---

## 🤖 OpenAI Function Calling 配置

```json
[
  {
    "type": "function",
    "function": {
      "name": "case_query",
      "description": "查询中国企业案件信息，包括涉诉案件、失信记录、企业背景、身份验证等31个数据模块",
      "parameters": {
        "type": "object",
        "properties": {
          "module_code": {
            "type": "string",
            "description": "模块代码，如: enterprise_litigation, dishonest_person, personal_litigation, enterprise_litigation_detail_backup"
          },
          "params": {
            "type": "object",
            "description": "查询参数，根据模块不同而异（企业查询用company_name，个人查询用name+id_card等）"
          }
        },
        "required": ["module_code", "params"]
      }
    }
  }
]
```

---

## 📡 curl 直调

```bash
# 查询企业涉诉案件
curl -X POST https://xmqjglht.top/api/claw/v1/query \
  -H "X-API-Key: xmqj_u1_你的Key" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "enterprise_litigation",
    "params": {"company_name": "某科技有限公司"}
  }'

# 查询失信案件
curl -X POST https://xmqjglht.top/api/claw/v1/query \
  -H "X-API-Key: xmqj_u1_你的Key" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "dishonest_person",
    "params": {
      "name": "张三",
      "id_card": "110101199001011234"
    }
  }'
```

---

## 常用模块代码参考

| 查询类别 | module_code | 必填参数 |
|:---------|:------------|:---------|
| 🏛️ 企业涉诉案件 | `enterprise_litigation` | `company_name` |
| 📄 企业涉诉详版(含判项) | `enterprise_litigation_detail_backup` | `company_name` |
| 👤 个人涉诉案件 | `personal_litigation` | `name`, `id_card` |
| 🔴 失信被执行人 | `dishonest_person` | `name`, `id_card` |
| 🏢 企业信息查询 | `enterprise_fuzzy` | `company_name` |
| 📋 企业资质查询 | `enterprise_qualification` | `company_name` |
| 🪪 身份证核验 | `id_card_two_factor` | `name`, `id_card` |
| 💍 婚姻状态匹配 | `dual_marriage_match` | `name1`, `id_card1`, `name2`, `id_card2` |

> 完整模块列表调用 `POST /api/claw/v1/modules` 获取。
