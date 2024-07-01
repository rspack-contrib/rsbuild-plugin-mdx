# @rsbuild/plugin-mdx

An Rsbuild plugin to provide support for [MDX](https://github.com/mdx-js/mdx/).

MDX lets you use JSX in your markdown content. You can import components, such as interactive charts or alerts, and embed them within your content. This makes writing long-form content with components a blast.

<p>
  <a href="https://npmjs.com/package/@rsbuild/plugin-mdx">
   <img src="https://img.shields.io/npm/v/@rsbuild/plugin-mdx?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
</p>

## Usage

Install:

```bash
npm add @rsbuild/plugin-mdx -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginMdx } from "@rsbuild/plugin-mdx";

export default {
  plugins: [pluginMdx()],
};
```

After registering the plugin, you can import `.mdx` or `.md` files as components in your code.

## Options

If you need to customize the compilation behavior of MDX, you can use the following configs.

### mdxLoaderOptions

Options passed to `@mdx-js/loader`, please refer to [@mdx-js/loader documentation](https://www.npmjs.com/package/@mdx-js/loader) for detailed usage.

- **Type:** `MdxLoaderOptions`
- **Default:** `{}`
- **Example:**

```ts
pluginMdx({
  mdxLoaderOptions: {
    // Use Vue JSX
    jsxImportSource: "vue",
  },
});
```

### extensions

Specify the file extensions to be compiled with MDX loader, including .md files and .mdx files by default.

- **Type:** `string[]`
- **Default:** `['.mdx', '.md']`

For example, to only compile .mdx files, you can set it as:

```ts
pluginMdx({
  extensions: [".mdx"],
});
```

## Type Declarations

In a TypeScript project, you need to add type definitions for `*.mdx` files so that TypeScript can recognize them correctly.

Create `env.d.ts` in the `src` directory and add the following content:

```ts title="src/env.d.ts"
declare module "*.md" {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}
declare module "*.mdx" {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}
```

## License

[MIT](./LICENSE).
