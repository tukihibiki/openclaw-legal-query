# 🦞 OpenCLAW + Hermes Agent · 析芒全迹
# 中国企业案件信息智能查询

> 让 AI 助手用一句话查询企业涉诉、案件信息、失信记录、背景调查等 31 个数据模块。
> 同时支持 **OpenCLAW** 和 **Hermes Agent** 两种主流 AI 助手接入方案。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![OpenCLAW](https://img.shields.io/badge/Protocol-OpenCLAW-blueviolet)](https://github.com/nousresearch/openclaw)
[![Hermes Agent](https://img.shields.io/badge/AI-Hermes%20Agent-8B5CF6)](https://github.com/nousresearch/hermes-agent)
[![Made by 析芒全迹](https://img.shields.io/badge/Made%20by-析芒全迹-00d2ff)](https://xmqj.top)

---

## 🌟 一句话查案件

配置完成后，对 AI 说一句话就能查到结果：

```text
⚖️ "查某科技有限公司的涉诉案件"
🔍 "张三有没有失信案件记录？"
🏢 "查一下某建筑公司的资质信息"
✅ "验证王五的身份证信息"
🚗 "查车牌粤A12345的车辆信息"
💰 "查看我的剩余查询额度"
```

---

## 🚀 快速开始（60 秒接入）

### 1️⃣ 获取 API Key

1. 下载 **[析芒全迹 APP](https://xmqj.top/download.html)** 并注册登录
2. 在「我的」页面完成 **专业人员证件认证**
3. 进入「我的 → AI 智能查询」— 点击「立即开启」
4. 复制生成的 API Key（格式：`xmqj_u1_xxxxxxxx...`）

> 💡 新用户注册即送免费查询额度，可直接体验。

### 2️⃣ 选择接入方式

<details open>
<summary><strong>🦞 方式一：OpenCLAW 接入</strong></summary>

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
</details>

<details>
<summary><strong>🤖 方式二：Hermes Agent 接入</strong></summary>

在 Hermes Agent 的 `~/.hermes/config.yaml` 中添加自定义 Tool：

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

配置完成后，对 Hermes Agent 说：
> *"帮我查一下张三的失信记录"*
> *"查某科技有限公司有哪些涉诉案件"*
</details>

<details>
<summary><strong>📡 方式三：curl / API 直调</strong></summary>

```bash
# 查询企业涉诉案件
curl -X POST https://xmqjglht.top/api/claw/v1/query \
  -H "X-API-Key: xmqj_u1_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "enterprise_litigation",
    "params": {"company_name": "某科技有限公司"}
  }'
```
</details>

---

## 📡 API 端点

所有端点使用 `POST` 方法，认证方式为请求头 `X-API-Key`。

| 端点 | 说明 |
|:-----|:------|
| `/api/claw/v1/modules` | 获取所有可查询模块列表 |
| `/api/claw/v1/query` | 执行案件信息查询（核心接口） |
| `/api/claw/v1/quota` | 查询剩余查询额度 |

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

## 💻 多语言调用示例

<details>
<summary><strong>🐍 Python 示例（完整可运行）</strong></summary>

```python
import requests

API_BASE = "https://xmqjglht.top/api/claw/v1"
API_KEY = "xmqj_u1_your_api_key_here"
HEADERS = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

# 查询企业涉诉案件
result = requests.post(f"{API_BASE}/query", headers=HEADERS, json={
    "module_code": "enterprise_litigation",
    "params": {"company_name": "某科技有限公司"}
}).json()
print(result)
```
</details>

<details>
<summary><strong>🟢 Node.js 示例</strong></summary>

```javascript
const axios = require('axios');

const result = await axios.post('https://xmqjglht.top/api/claw/v1/query', {
  module_code: 'enterprise_litigation',
  params: { company_name: '某科技有限公司' }
}, {
  headers: { 'X-API-Key': 'xmqj_u1_your_api_key_here' }
});

console.log(result.data);
```
</details>

<details>
<summary><strong>🔷 Go 示例</strong></summary>

```go
package main
import (
    "bytes"     "encoding/json"     "fmt"     "net/http"
)
func main() {
    body, _ := json.Marshal(map[string]interface{}{
        "module_code": "enterprise_litigation",
        "params": map[string]string{"company_name": "某科技有限公司"},
    })
    req, _ := http.NewRequest("POST", "https://xmqjglht.top/api/claw/v1/query",
        bytes.NewBuffer(body))
    req.Header.Set("X-API-Key", "xmqj_u1_your_api_key_here")
    // ... (完整示例见 examples/ 目录)
}
```
</details>

> 完整可运行的示例脚本见 [`examples/`](examples/) 目录。

---

## 📦 全部 31 个查询模块

| 类别 | 模块 |
|:-----|:------|
| ⚖️ **案件查询** | ✅ 企业涉诉查询 · 企业涉诉(详版含判项) · 个人涉诉查询 · 个人涉诉(详版) · 失信被执行人 · 被执行人查询 · 限制高消费 · 终本案件查询 · 裁判文书检索 · 法院案件详情 · 劳动仲裁查询 |
| 🏢 **企业信息查询** | ✅ 企业工商信息 · 企业模糊查询 · 企业资质查询 · 企业工程资质 · 名下关联企业 · 对公账户开户行 |
| ✅ **身份核查** | ✅ 身份证核验 · 银行卡三要素 · 银行卡四要素 · 运营商查询 · 婚姻状态匹配 |
| 💳 **信用信息查询** | ✅ 社保缴纳评估 · 个税收入评估 · 综合不良信息 · 综合多头查询 |
| 🚗 **车辆信息查询** | ✅ 车辆五项信息 · 名下车辆查询 · 人车核验 |
| 🧮 **查询工具** | ✅ 利息计算器 · 迟延履行利息计算 |

> 📌 **最新上线**：双人婚姻状态匹配、名下关联企业查询、企业涉诉详版(含判项详情)

---

## ❓ 常见问题

<details>
<summary>如何获取 API Key？</summary>

下载 **析芒全迹 APP**（[xmqj.top](https://xmqj.top)），注册登录后完成 **专业人员证件认证**，然后进入「我的 → AI 智能查询」即可生成。每个账号可生成多个 Key 用于不同 AI 助手。
</details>

<details>
<summary>支持哪些 AI 助手？</summary>

已兼容 **OpenCLAW**、**Hermes Agent**、**OpenAI Function Calling**、**Claude Tool Use** 等主流方案。也支持 curl、Python requests 等任何 HTTP 客户端直调。
</details>

<details>
<summary>查询如何收费？</summary>

按模块设置按次扣费（`cost_per_query`），每个模块费用公开透明，价格低廉。每个 API Key 每月上限 500 次。新用户注册送免费额度，可直接体验。
</details>

<details>
<summary>数据来源可靠吗？</summary>

数据来源于多个官方权威数据源，确保真实可靠，查询结果与 APP 内一致。
</details>

<details>
<summary>Key 丢了怎么办？</summary>

在 APP 中撤销丢失的 Key，然后创建新 Key。系统不存明文 Key，丢失后无法找回。
</details>

---

## 🔗 相关链接

- 🌐 [析芒全迹官网](https://xmqj.top) — 下载 APP 获取 API Key
- 🤖 [OpenCLAW 协议](https://github.com/nousresearch/openclaw) — 开源 CLAW 接入框架
- 🧠 [Hermes Agent](https://github.com/nousresearch/hermes-agent) — 开源 AI 助手框架
- 🔍 [AI 查询专栏](https://xmqj.top/claw.html) — 在线配置说明
- 📱 [下载 APP](https://xmqj.top/download.html)

---

## 📄 License

MIT
