import { defineConfig } from '@rsbuild/core';
import { pluginMdx } from '../src';

export default defineConfig({
	plugins: [pluginMdx()],
});
