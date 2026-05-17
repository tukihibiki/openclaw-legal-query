# 🦞 OpenCLAW Legal Query · 中国企业涉诉智能查询

> 让 AI 助手用一句话查询中国企业涉诉信息、失信记录、工商数据、身份验证等 31 个数据模块。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![OpenCLAW](https://img.shields.io/badge/Protocol-OpenCLAW-blueviolet)](https://github.com/nousresearch/openclaw)
[![Made by 析芒全迹](https://img.shields.io/badge/Made%20by-析芒全迹-00d2ff)](https://xmqj.top)

---

## 🌟 快速体验

配置完成后，直接对 AI 说一句话就能查：

```text
⚖️ "查某科技有限公司的涉诉记录"
🔍 "张三有没有失信记录？"
🏢 "某建筑公司有哪些资质证书？"
✅ "验证王五的身份证信息"
🚗 "查车牌粤A12345的车辆信息"
```

---

## 🚀 快速开始（60 秒接入）

### 1️⃣ 获取 API Key

1. 下载 **[析芒全迹 APP](https://xmqj.top/download.html)** 并注册登录
2. 进入「我的 → AI 智能查询」— 点击「立即开启」
3. 复制生成的 API Key（格式：`xmqj_u1_xxxxxxxx...`）

> 💡 新用户注册即送免费查询额度，可直接体验。

### 2️⃣ 配置 OpenCLAW

在 OpenCLAW 的 `mcp_servers.json` 中添加：

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

### 3️⃣ 开始查询

启动 OpenCLAW，输入自然语言即可。AI 会自动识别意图、选择模块、提取参数并调用接口。

---

## 📡 API 端点

所有端点使用 `POST` 方法，认证方式为请求头 `X-API-Key`。

| 端点 | 说明 |
|:-----|:------|
| `/api/claw/v1/modules` | 获取所有可查询模块列表 |
| `/api/claw/v1/query` | 执行数据查询（核心接口） |
| `/api/claw/v1/quota` | 查询剩余额度 |

**请求格式（query）：**

```json
{
  "module_code": "dishonest_person",
  "params": {
    "name": "张三",
    "id_card": "110101199001011234"
  }
}
```

**响应格式：**

```json
{
  "success": true,
  "data": {
    "result": { ... },
    "cost": 1,
    "quota_remaining": { "free": 8, "paid": 5 }
  }
}
```

---

## 💻 代码示例

<details>
<summary><strong>📡 curl 调用</strong></summary>

```bash
# 查询企业涉诉信息
curl -X POST https://xmqjglht.top/api/claw/v1/query \
  -H "X-API-Key: xmqj_u1_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "enterprise_litigation",
    "params": {
      "company_name": "某科技有限公司"
    }
  }'
```
</details>

<details>
<summary><strong>🐍 Python 示例</strong></summary>

```python
import requests

API_BASE = "https://xmqjglht.top/api/claw/v1"
API_KEY = "xmqj_u1_your_api_key_here"
HEADERS = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

# 1. 获取模块列表
modules = requests.post(f"{API_BASE}/modules", headers=HEADERS).json()
print(f"共 {modules['data']['total']} 个模块可用")

# 2. 查询企业涉诉信息
result = requests.post(f"{API_BASE}/query", headers=HEADERS, json={
    "module_code": "enterprise_litigation",
    "params": {"company_name": "某科技有限公司"}
}).json()
print(result)

# 3. 查询失信记录
result = requests.post(f"{API_BASE}/query", headers=HEADERS, json={
    "module_code": "dishonest_person",
    "params": {
        "name": "张三",
        "id_card": "110101199001011234"
    }
}).json()
print(result)
```
</details>

<details>
<summary><strong>🟢 Node.js 示例</strong></summary>

```javascript
const axios = require('axios');

const API = 'https://xmqjglht.top/api/claw/v1';
const headers = {
  'X-API-Key': 'xmqj_u1_your_api_key_here',
  'Content-Type': 'application/json'
};

// 查询企业涉诉信息
const result = await axios.post(`${API}/query`, {
  module_code: 'enterprise_litigation',
  params: { company_name: '某科技有限公司' }
}, { headers });

console.log(result.data);
```
</details>

<details>
<summary><strong>🔷 Go 示例</strong></summary>

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "https://xmqjglht.top/api/claw/v1/query"
    body := map[string]interface{}{
        "module_code": "enterprise_litigation",
        "params": map[string]string{
            "company_name": "某科技有限公司",
        },
    }
    jsonData, _ := json.Marshal(body)
    
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("X-API-Key", "xmqj_u1_your_api_key_here")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)
    fmt.Printf("%+v\n", result)
}
```
</details>

---

## 📦 全部 31 个查询模块

| 类别 | 模块 |
|:-----|:------|
| ⚖️ **司法查询** | 失信被执行人、个人涉诉查询、个人涉诉(详版)、企业涉诉查询、企业涉诉(详版)、法院案件详情、劳动仲裁查询、被执行人查询、限制高消费、终本案件查询、裁判文书检索 |
| 🏢 **企业查询** | 企业工商信息、企业模糊查询、企业资质查询、企业工程资质、名下关联企业、对公账户开户行查询 |
| ✅ **身份验证** | 身份证二要素核验、银行卡三要素核验、银行卡四要素核验、运营商二要素查询、婚姻状态匹配(双人) |
| 💳 **信用评估** | 社保缴纳评估、个税收入评估、综合不良信息查询、综合多头查询 |
| 🚗 **车辆查询** | 车辆五项信息、名下车辆查询、人车核验 |
| 🧮 **金融工具** | 利息计算器、迟延履行利息计算 |

> 📌 **最新上线**：双人婚姻状态匹配、名下关联企业查询、企业涉诉详版(含判项详情)

---

## 🔧 其他 AI 助手接入

### Hermes Agent

在 `~/.hermes/config.yaml` 添加自定义 Tool：

```yaml
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
    description: 析芒全迹法律数据查询
```

### OpenAI Function Calling / Claude Tool Use

将端点注册为 Function/Tool，详见 [docs/openclaw-setup.md](docs/openclaw-setup.md)。

---

## ❓ 常见问题

<details>
<summary>如何获取 API Key？</summary>

下载 **析芒全迹 APP**，登录后进入「我的 → AI 智能查询」即可生成。每个账号可生成多个 Key。
</details>

<details>
<summary>查询如何收费？</summary>

每次成功查询消耗 1 次额度，每个 API Key 每月上限 500 次。新用户注册送免费额度。
</details>

<details>
<summary>数据来源可靠吗？</summary>

数据来源于多个官方权威数据源，确保真实可靠。
</details>

<details>
<summary>我的 Key 丢了怎么办？</summary>

在 APP 中撤销丢失的 Key，然后创建新 Key。系统不存明文 Key，丢失后无法找回。
</details>

---

## 🔗 相关链接

- 🌐 [析芒全迹官网](https://xmqj.top)
- 🤖 [OpenCLAW 协议](https://github.com/nousresearch/openclaw)
- 📱 [下载 APP](https://xmqj.top/download.html)
- 🔍 [AI 查询专栏](https://xmqj.top/claw.html)

---

## 📄 License

MIT
