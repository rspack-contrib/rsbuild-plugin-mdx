# @rsbuild/plugin-mdx

An Rsbuild plugin to provide support for MDX.

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

## Options

### foo

Some description.

- Type: `string`
- Default: `undefined`
- Example:

```js
pluginMdx({
  foo: "bar",
});
```

## License

[MIT](./LICENSE).
