import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    lazyImport({
      resolvers: [
        VxeResolver({ libraryName: 'vxe-table' }),
        VxeResolver({ libraryName: 'vxe-pc-ui' })
      ]
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false
    // proxy: {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  json: {
    stringify: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          //配置分块
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        entryFileNames: 'js/[name]-[hash].js', //配置JS入口打包文件路径
        chunkFileNames: 'js/[name]-[hash].js', //配置其余JS打包文件路径
        assetFileNames(chunkInfo) {
          //配置静态文件打包文件路径
          if (chunkInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash].css'
          }
          const fontExtArray = ['eot', 'woff', 'woff2', 'ttf']
          if (fontExtArray.some((ext) => chunkInfo.name.endsWith(ext))) {
            return 'fonts/[name]-[hash].[ext]'
          }
          const imgExtArray = ['png', 'jpg', 'jpeg', 'gif', 'svg']
          if (imgExtArray.some((ext) => chunkInfo.name.endsWith(ext))) {
            return 'img/[name]-[hash].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    }
  }
})
