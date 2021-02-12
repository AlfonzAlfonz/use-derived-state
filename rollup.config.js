// @ts-check
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';


export default {
  input: 'src/index.ts',
  external: ["react"],
  plugins: [typescript()],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "default",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true
    }
  ]
};