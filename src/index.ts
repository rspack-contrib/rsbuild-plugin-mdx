import { createRequire } from 'node:module';
import type { Options as MdxLoaderOptions } from '@mdx-js/loader';
import type { RsbuildPlugin } from '@rsbuild/core';

export type PluginMdxOptions = {
	/**
	 * Options passed to `@mdx-js/loader`.
	 * @see https://npmjs.com/package/@mdx-js/loader#api
	 */
	mdxLoaderOptions?: MdxLoaderOptions;
	/**
	 * @default ['.mdx', '.md']
	 */
	extensions?: string[];
};

function createRegExp(exts: string[]): RegExp {
	const matcher = exts.map((ext) => ext.slice(1)).join('|');
	return new RegExp(
		exts.length === 1 ? `\\.${matcher}$` : `\\.(?:${matcher})$`,
		'i',
	);
}

export const PLUGIN_MDX_NAME = 'rsbuild:mdx';

export const pluginMdx = (options: PluginMdxOptions = {}): RsbuildPlugin => ({
	name: PLUGIN_MDX_NAME,

	setup(api) {
		api.modifyBundlerChain((chain, { CHAIN_ID }) => {
			const { extensions = ['.mdx', '.md'] } = options;

			for (const ext of extensions) {
				chain.resolve.extensions.add(ext);
			}

			const jsRule = chain.module.rules.get(CHAIN_ID.RULE.JS);
			const mdxRule = chain.module.rule('mdx');

			[CHAIN_ID.USE.SWC, CHAIN_ID.USE.BABEL].some((id) => {
				const use = jsRule.uses.get(id);

				if (use) {
					mdxRule.use(id).loader(use.get('loader')).options(use.get('options'));
					return true;
				}

				return false;
			});

			const MDX_REGEXP = createRegExp(extensions);
			const require = createRequire(import.meta.url);

			mdxRule
				.test(MDX_REGEXP)
				.use('mdx')
				.loader(require.resolve('@mdx-js/loader'))
				.options(options.mdxLoaderOptions ?? {});

			// support for React fast refresh
			const { REACT_FAST_REFRESH } = CHAIN_ID.PLUGIN;
			if (chain.plugins.has(REACT_FAST_REFRESH)) {
				chain.plugins.get(REACT_FAST_REFRESH).tap((options) => {
					const firstOption = options[0] ?? {};
					firstOption.include = [...(firstOption.include || []), MDX_REGEXP];
					options[0] = firstOption;
					return options;
				});
			}
		});
	},
});
