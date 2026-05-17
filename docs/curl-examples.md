# 📡 curl 调用示例

## 基础设置

```bash
API="https://xmqjglht.top/api/claw/v1"
KEY="xmqj_u1_your_api_key_here"
```

## 获取模块列表

```bash
curl -X POST $API/modules \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json"
```

## 查询企业涉诉信息

```bash
curl -X POST $API/query \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "enterprise_litigation",
    "params": {
      "company_name": "某科技有限公司"
    }
  }'
```

## 查询企业涉诉（详版，含判项详情）

自动解析信用代码，返回更完整的案件信息：

```bash
curl -X POST $API/query \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "enterprise_litigation_detail_backup",
    "params": {
      "company_name": "某科技有限公司"
    }
  }'
```

## 查询失信被执行人

```bash
curl -X POST $API/query \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "dishonest_person",
    "params": {
      "name": "张三",
      "id_card": "110101199001011234"
    }
  }'
```

## 查询个人涉诉信息

```bash
curl -X POST $API/query \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "personal_litigation",
    "params": {
      "name": "张三",
      "id_card": "110101199001011234"
    }
  }'
```

## 核验身份证

```bash
curl -X POST $API/query \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "id_card_two_factor",
    "params": {
      "name": "张三",
      "id_card": "110101199001011234"
    }
  }'
```

## 银行卡四要素核验

```bash
curl -X POST $API/query \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "module_code": "bank_card_four_factor",
    "params": {
      "name": "张三",
      "id_card": "110101199001011234",
      "bank_card": "6228480012345678",
      "phone": "13800138000"
    }
  }'
```

## 查询剩余额度

```bash
curl -X POST $API/quota \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json"
```

## 查询结果 JSON 美化

在结果后面加上 `| jq` 可以让 JSON 更可读：

```bash
curl -s -X POST $API/query \
  -H "X-API-Key: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"module_code":"dishonest_person","params":{"name":"张三","id_card":"110101199001011234"}}' | jq
```
