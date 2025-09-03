import { promises } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { createRsbuild, loadConfig } from '@rsbuild/core';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getMdxContent = (title: string) => `${title}

Below is an example of markdown in JSX.

<div id="test">
  <p style={{ padding: '1rem' }}>Test</p>
</div>
`;

test('should render MDX with React correctly', async ({ page }) => {
	const mdxPath = join(__dirname, 'src/test-temp-file.mdx');
	await promises.writeFile(mdxPath, getMdxContent('# Hello, world!'));

	const rsbuild = await createRsbuild({
		cwd: __dirname,
		rsbuildConfig: (await loadConfig({ cwd: __dirname })).content,
	});

	const { server, urls } = await rsbuild.startDevServer();
	await page.goto(urls[0]);
	expect(await page.innerHTML('h1')).toEqual('Hello, world!');
	expect(await page.innerHTML('#test')).toEqual(
		'<p style="padding: 1rem;">Test</p>',
	);

	await promises.writeFile(mdxPath, getMdxContent('## Hello, world 2!'));
	expect(await page.innerHTML('h2')).toEqual('Hello, world 2!');

	await server.close();
});
