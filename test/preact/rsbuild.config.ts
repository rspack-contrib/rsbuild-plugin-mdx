import { defineConfig } from '@rsbuild/core';
import { pluginMdx } from '@rsbuild/plugin-mdx';
import { pluginPreact } from '@rsbuild/plugin-preact';
import { getRandomPort } from '../helper';

export default defineConfig({
	plugins: [
		pluginPreact(),
		pluginMdx({
			mdxLoaderOptions: {
				jsxImportSource: 'preact',
			},
		}),
	],
	server: {
		port: getRandomPort(),
	},
});
