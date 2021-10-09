import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    chunkSizeWarningLimit:1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  // 本地运行配置，及反向代理配置
  server: {
    host: '0.0.0.0',
    // hmr: { overlay: false },
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: 'http://47.93.57.119:8094/test', //代理接口
        // target: 'http://192.168.1.115:8668',
        // target: 'http://172.16.10.62:8804',//本地开发服务器
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
