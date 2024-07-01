import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { createRsbuild, loadConfig } from '@rsbuild/core';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('should render MDX with Preact correctly', async ({ page }) => {
	const rsbuild = await createRsbuild({
		cwd: __dirname,
		rsbuildConfig: (await loadConfig({ cwd: __dirname })).content,
	});

	await rsbuild.build();
	const { server, urls } = await rsbuild.preview();

	await page.goto(urls[0]);

	expect(await page.innerHTML('h1')).toEqual('Hello, world!');
	expect(await page.innerHTML('#test')).toEqual(
		'<p style="padding: 1rem;">Test</p>',
	);

	await server.close();
});
