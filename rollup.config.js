import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'bundle',
	output: { file: 'public/bundle.js', format: 'iife', name: 'zip2forecast' },
	plugins: [
		resolve({
			only: ['domdiff']
		}),
		babel({
			presets: [
				['@babel/env']
			]
		}),
		terser(),
		trimIIFE()
	]
}

function trimIIFE() {
	return {
		name: 'trim-content-for-browser',
		renderChunk(code) {
			const updatedCode = code
				.replace(/^var\s+/, '')
				.replace(/;\s*$/, '')
				.replace(/"use strict";/g, '');

			return { code: updatedCode, map: null };
		}
	};
}
