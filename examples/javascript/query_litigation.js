/**
 * 析芒全迹 CLAW Bridge - Node.js 调用示例
 * 
 * 安装依赖: npm install axios
 * 官网: https://xmqj.top
 */

const axios = require('axios');

const API_BASE = 'https://xmqjglht.top/api/claw/v1';
const API_KEY = 'xmqj_u1_your_api_key_here';  // 替换为你的 Key

const headers = {
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json'
};

/**
 * 获取所有可查询模块
 */
async function getModules() {
  const resp = await axios.post(`${API_BASE}/modules`, {}, { headers });
  const data = resp.data;
  if (data.success) {
    console.log(`\n📦 共有 ${data.data.total} 个模块可用：`);
    data.data.modules.forEach(m => {
      const badge = m.membership_restricted ? '🔒' : '✅';
      console.log(`  ${badge} [${m.category}] ${m.module_name} (${m.module_code})`);
    });
    return data.data.modules;
  } else {
    console.error('❌ 获取模块失败:', data);
    return [];
  }
}

/**
 * 执行查询
 */
async function query(moduleCode, params) {
  const resp = await axios.post(`${API_BASE}/query`, {
    module_code: moduleCode,
    params
  }, { headers });
  return resp.data;
}

/**
 * 查询剩余额度
 */
async function getQuota() {
  const resp = await axios.post(`${API_BASE}/quota`, {}, { headers });
  return resp.data;
}

/**
 * 示例：企业涉诉查询
 */
async function demoEnterpriseLitigation() {
  console.log('\n🔍 查询企业涉诉信息...');
  const result = await query('enterprise_litigation', {
    company_name: '某科技有限公司'
  });
  console.log(JSON.stringify(result, null, 2));
  return result;
}

/**
 * 示例：失信被执行人查询
 */
async function demoDishonestPerson() {
  console.log('\n🔍 查询失信被执行人...');
  const result = await query('dishonest_person', {
    name: '张三',
    id_card: '110101199001011234'
  });
  console.log(JSON.stringify(result, null, 2));
  return result;
}

/**
 * 示例：企业涉诉详版（含判项详情）
 */
async function demoEnterpriseLitigationDetail() {
  console.log('\n🔍 查询企业涉诉详版（自动解析信用代码）...');
  const result = await query('enterprise_litigation_detail_backup', {
    company_name: '某科技有限公司'
  });
  console.log(JSON.stringify(result, null, 2));
  return result;
}

// ============ 运行 ============

(async () => {
  console.log('='.repeat(50));
  console.log('  析芒全迹 CLAW Bridge Demo');
  console.log('  https://xmqj.top');
  console.log('='.repeat(50));

  // 1. 获取模块列表
  await getModules();

  // 2. 查看剩余额度
  const quota = await getQuota();
  if (quota.success) {
    const q = quota.data;
    console.log(`\n💰 剩余额度：免费 ${q.free_quota} 次 | 付费 ${q.paid_quota} 次 | 本月已用 ${q.daily_used} 次`);
  }

  // 3. 执行查询（取消注释运行）
  // await demoEnterpriseLitigation();
  // await demoDishonestPerson();
  // await demoEnterpriseLitigationDetail();
})();
