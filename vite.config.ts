import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite"
// @ts-ignore
import WindiCSS from 'vite-plugin-windicss'
import {resolve} from "path"

export default defineConfig({
    base: '',
    server: {
        open: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    plugins: [
        vue(),
        WindiCSS(),
        AutoImport({
            imports: ["vue", "pinia"],
            dts: "src/auto-import.d.ts"
        })
    ]
})