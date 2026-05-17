#!/usr/bin/env python3
"""
析芒全迹 CLAW Bridge - Python 调用示例

安装依赖: pip install requests
官网: https://xmqj.top
"""

import requests
import json
import sys

# ============ 配置 ============
API_BASE = "https://xmqjglht.top/api/claw/v1"
API_KEY = "xmqj_u1_your_api_key_here"  # 替换为你的 Key

HEADERS = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}


def get_modules():
    """获取所有可查询模块"""
    resp = requests.post(f"{API_BASE}/modules", headers=HEADERS)
    data = resp.json()
    if data.get("success"):
        modules = data["data"]["modules"]
        print(f"\n📦 共有 {data['data']['total']} 个模块可用：")
        for m in modules:
            badge = "🔒" if m.get("membership_restricted") else "✅"
            print(f"  {badge} [{m['category']}] {m['module_name']} ({m['module_code']}) - {m.get('cost_per_query', 1)}次/查询")
        return modules
    else:
        print(f"❌ 获取模块失败: {data}")
        return []


def query(module_code: str, params: dict) -> dict:
    """执行查询"""
    resp = requests.post(f"{API_BASE}/query", headers=HEADERS, json={
        "module_code": module_code,
        "params": params
    })
    return resp.json()


def get_quota() -> dict:
    """查询剩余额度"""
    resp = requests.post(f"{API_BASE}/quota", headers=HEADERS)
    return resp.json()


# ============ 示例 ============

def demo_enterprise_litigation():
    """示例：企业涉诉查询"""
    print("\n🔍 查询企业涉诉信息...")
    result = query("enterprise_litigation", {"company_name": "某科技有限公司"})
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result


def demo_dishonest_person():
    """示例：失信被执行人查询"""
    print("\n🔍 查询失信被执行人...")
    result = query("dishonest_person", {
        "name": "张三",
        "id_card": "110101199001011234"
    })
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result


def demo_enterprise_fuzzy():
    """示例：企业模糊查询"""
    print("\n🔍 企业模糊查询...")
    result = query("enterprise_fuzzy", {"company_name": "某科技"})
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return result


def show_quota():
    """查看剩余额度"""
    result = get_quota()
    if result.get("success"):
        q = result["data"]
        print(f"\n💰 剩余额度：免费 {q['free_quota']} 次 | 付费 {q['paid_quota']} 次 | 本月已用 {q['daily_used']} 次")
    else:
        print(f"❌ 获取额度失败: {result}")


if __name__ == "__main__":
    print("=" * 50)
    print("  析芒全迹 CLAW Bridge Demo")
    print("  https://xmqj.top")
    print("=" * 50)

    # 1. 获取模块列表
    get_modules()

    # 2. 查看剩余额度
    show_quota()

    # 3. 执行查询
    # 取消注释即可运行对应示例:
    # demo_enterprise_litigation()
    # demo_dishonest_person()
    # demo_enterprise_fuzzy()
