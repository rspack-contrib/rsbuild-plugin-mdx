import { defineConfig } from '@rsbuild/core';
import { pluginMdx } from '@rsbuild/plugin-mdx';
import { pluginReact } from '@rsbuild/plugin-react';
import { getRandomPort } from '../helper';

export default defineConfig({
	plugins: [pluginReact(), pluginMdx()],
	server: {
		port: getRandomPort(),
	},
});
