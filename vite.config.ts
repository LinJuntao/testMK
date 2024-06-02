import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';

const target = 'http://101.33.196.231:9077';

export default ({ command }) => {
  return {
    server: {
      // port: 5173,
      // host: '0.0.0.0',
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      },
      open: true
    },
    plugins: [
      vue()
      // viteMockServe({
      //   localEnabled: command === 'serve'
      // })
    ],
    define: {
      'process.env': process.env
    }
    // proxy: {
    //   '/api': {
    //     target:'http://101.33.196.231:9077',
    //     changeOrigin:true,  // 允许跨域
    //     rewrite:path => path.replace(/^\/api/,'')
    //   }
    // }
    // 如何在手机上预览或访问vite+vue: https://zhuanlan.zhihu.com/p/600323447
    // server: {
    //   host: '192.168.43.138',
    //   port: 3344
    // }
  };
};
