import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const { resolve } = require('path')

export default defineConfig({
    base: '/originsystem/',
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, './src'),
            },
        ],
    },
    plugins: [vue(), vueJsx()],
})
