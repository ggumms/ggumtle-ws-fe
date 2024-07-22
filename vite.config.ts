import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@svgr/rollup'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		mkcert({ certFileName: './localhost.pem', keyFileName: './localhost-key.pem' }),
	],
	server: {
		https: {},
	},
})
