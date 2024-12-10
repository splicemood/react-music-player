import { BuildConfig } from 'bun';

const config: BuildConfig = {
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  packages: 'external',
};

await Bun.build({
  ...config,
  format: 'esm',
  naming: 'esm/[name].mjs',
});

await Bun.build({
  ...config,
  format: 'cjs',
  naming: 'cjs/[name].cjs',
});
