# 📦 查询模块一览

析芒全迹 CLAW Bridge 支持 31 个数据查询模块，覆盖司法、企业、身份验证、信用评估、车辆查询、金融工具六大类别。

## ⚖️ 司法查询

| 模块名称 | module_code | 参数 | 说明 |
|:---------|:------------|:-----|:------|
| 失信被执行人 | `dishonest_person` | `name`, `id_card` | 查询个人是否被列入失信被执行人名单 |
| 个人涉诉查询 | `personal_litigation` | `name`, `id_card` | 查询个人涉及的法律诉讼记录 |
| 个人涉诉(详版) | `personal_litigation_detail` | `name`, `id_card` | 更详细的个人涉诉信息 |
| 企业涉诉查询 | `enterprise_litigation` | `company_name` | 查询企业涉及的法律诉讼记录 |
| 企业涉诉(详版备) | `enterprise_litigation_detail_backup` | `company_name` | 企业涉诉详版，自动补全信用代码，返回含判项详情 |
| 法院案件详情 | `case_detail` | `case_no` | 按案号或当事人姓名查询案件详情 |
| 劳动仲裁查询 | `labor_arbitration` | `name`, `id_card` | 查询劳动仲裁记录 |
| 被执行人查询 | — | `name`, `id_card` | 查询被执行人信息 |
| 限制高消费 | — | `name`, `id_card` | 查询是否被限制高消费 |
| 终本案件查询 | — | `case_no` | 查询终结本次执行程序案件 |
| 裁判文书检索 | — | 关键字 | 检索公开裁判文书 |

## 🏢 企业查询

| 模块名称 | module_code | 参数 | 说明 |
|:---------|:------------|:-----|:------|
| 企业模糊查询 | `enterprise_fuzzy` | `company_name` | 按企业名称关键词模糊搜索工商信息 |
| 企业资质查询 | `enterprise_qualification` | `company_name` | 查询企业资质证书信息 |
| 企业工程资质 | `enterprise_engineering_qualification` | `company_name` | 查询企业工程相关资质 |
| 名下关联企业 | `enterprise_related` | `name`, `id_card` | 查询个人名下担任法人/股东/高管的企业 |
| 对公账户开户行 | `enterprise_bank_account` | `bank_card`, `company_name` | 查询对公账户开户行信息 |
| 企业工商信息 | (通过模糊查询) | `company_name` | 获取企业工商登记信息 |

## ✅ 身份验证

| 模块名称 | module_code | 参数 | 说明 |
|:---------|:------------|:-----|:------|
| 身份证二要素 | `id_card_two_factor` | `name`, `id_card` | 验证姓名与身份证号是否一致 |
| 银行卡三要素 | `bank_card_three_factor` | `name`, `id_card`, `bank_card` | 验证姓名+身份证+银行卡 |
| 银行卡四要素 | `bank_card_four_factor` | `name`, `id_card`, `bank_card`, `phone` | 验证姓名+身份证+银行卡+手机号 |
| 运营商二要素 | `operator_two_factor` | `phone`, `id_card` | 验证手机号与身份证号 |
| 婚姻状态匹配 | `dual_marriage_match` | `name1`, `id_card1`, `name2`, `id_card2` | 查询两人是否存在婚姻关系 |

## 💳 信用评估

| 模块名称 | module_code | 参数 | 说明 |
|:---------|:------------|:-----|:------|
| 社保缴纳评估 | `finance_social_security` | `name`, `id_card` | 评估个人社保缴纳情况 |
| 个税收入评估 | `finance_income_tax` | `name`, `id_card` | 评估个人个税缴纳情况 |
| 综合不良信息 | `bad_info_query` | `name`, `id_card` | 查询综合不良信用信息 |
| 综合多头查询 | `comprehensive_multihead` | `name`, `id_card`, `phone` | 查询多头借贷等信息 |

## 🚗 车辆查询

| 模块名称 | module_code | 参数 | 说明 |
|:---------|:------------|:-----|:------|
| 车辆五项信息 | `car_five_items` | `plate_no` | 按车牌号查询车辆五项信息 |
| 名下车辆查询 | `vehicle_under_name` | `name`, `id_card` | 查询个人名下所有车辆 |
| 人车核验 | `person_car_verify` | `name`, `id_card`, `plate_no` | 验证人与车辆的归属关系 |

## 🧮 金融工具

| 模块名称 | module_code | 参数 | 说明 |
|:---------|:------------|:-----|:------|
| 利息计算器 | `interest_calculator` | `amount`, `rate`, `period` | 按本金、利率、期限计算利息 |
| 迟延履行利息 | `delay_interest` | `amount`, `start_date`, `end_date` | 按本金和期间计算迟延履行利息 |

---

## 如何使用

```
POST /api/claw/v1/query
X-API-Key: xmqj_u1_你的Key
Content-Type: application/json

{
  "module_code": "enterprise_litigation",
  "params": {
    "company_name": "目标企业名称"
  }
}
```

## 获取 API Key

下载 [析芒全迹 APP](https://xmqj.top/download.html)，注册即送免费额度。
