import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite';
import path from 'path';
import { wrapperEnv } from './build/getEnv';
import { createProxy } from './build/proxy';
import { createVitePlugins } from './build/plugin';
import pxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    plugins: createVitePlugins(),
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.json', '.ts', '.vue']
    },
    css: {
      postcss: {
        plugins: [
          pxToRem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY)
    }
  };
});
