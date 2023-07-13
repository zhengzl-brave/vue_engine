import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

/**
 * @description 创建代理，用于解析.env.development
 * @param list
 * @returns
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const ishttps = httpsRE.test(target);

    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure is false
      ...(ishttps ? { secure: false } : {})
    };
  }
  return ret;
}
