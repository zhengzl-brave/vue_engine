import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import eslintPlugin from 'vite-plugin-eslint';

// 组件按需导入
const AutoRegistryComponents = () => {
  return Components({
    resolvers: [
      ElementPlusResolver({
        importStyle: true
      }),
      VantResolver({
        importStyle: false
      })
    ],
    dts: 'src/typings/components.d.ts',
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
  });
};

// 自动导入配置
const AutoImportDeps = () => {
  return AutoImport({
    imports: ['vue', 'pinia', 'vue-router'],
    dts: 'src/typings/auto-imports.d.ts'
  });
};

export const createVitePlugins = (): (PluginOption | PluginOption[])[] => {
  return [vue(), eslintPlugin(), AutoRegistryComponents(), AutoImportDeps()];
};
