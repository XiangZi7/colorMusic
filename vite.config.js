import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        // AutoImport({
        //     imports: ["react",'react-router-dom'], // 自动导入vue和vue-router相关函数
        //     dirs: [
        //         'src/utils/**',
        //         'src/stores/**',
        //         'src/hooks/**'
        //     ],
        //     dts: 'src/auto-import/imports.d.ts',
        // }),
    ],
    resolve: {
        alias: {
          // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, './src')
        }
    }
})
