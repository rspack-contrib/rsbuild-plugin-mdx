import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginMdx } from '../src';

export default defineConfig({
	plugins: [pluginReact(), pluginMdx()],
});
