import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/client.ts',
	output: {
		file: 'dist/bundle.js',
		format: 'iife',
		name: 'WebSocketClient'
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript()
	]
};
