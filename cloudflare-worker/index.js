// Cloudflare Worker：智谱大模型（GLM）代理
// 作用：前端把对话历史 POST 到这里，Worker 带着 Key 转发智谱，返回 { reply }
// 这样 API Key 只存在服务端（secret），前端永远不接触，也绕开了浏览器跨域限制。
//
// 部署三步：
//   1) npm i -g wrangler && wrangler login
//   2) wrangler secret put ZHIPU_API_KEY        （按提示粘贴你的智谱 Key）
//   3) wrangler deploy                          （得到 https://<名称>.<子域>.workers.dev）
// 然后把前端 app.js 里的 CHAT_API 改成  https://<你的地址>/chat

const ZHIPU_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const MODEL = 'glm-4-flash'; // 免费额度模型；需要更强可换 glm-4-plus / glm-4 等
// 只允许你的 GitHub Pages 域访问，避免被白嫖；本地调试可临时改成 '*'
const ALLOW_ORIGIN = 'https://smf0707.github.io';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const cors = {
      'Access-Control-Allow-Origin': ALLOW_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 浏览器跨域预检
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (url.pathname !== '/chat') {
      return new Response('Not Found', { status: 404 });
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors });
    }

    const key = env.ZHIPU_API_KEY;
    if (!key) {
      return new Response(JSON.stringify({ error: '服务器未配置 ZHIPU_API_KEY' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...cors } });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: '请求体不是合法 JSON' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...cors } });
    }

    const messages = Array.isArray(payload.messages) ? payload.messages : [];

    try {
      const upstream = await fetch(ZHIPU_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key,
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          temperature: 0.7,
          stream: false,
        }),
      });

      const data = await upstream.json();
      const reply =
        data?.choices?.[0]?.message?.content ??
        data?.error?.message ??
        '（智谱没有返回内容）';

      return new Response(JSON.stringify({ reply }), {
        headers: { 'Content-Type': 'application/json', ...cors },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: String(e) }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...cors },
      });
    }
  },
};
