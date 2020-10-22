import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';
import url from 'rollup-plugin-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// babel-preset-react-app를 사용한다면 BABEL_ENV를 필수로 설정
process.env.BABEL_ENV = 'production';

export default {
  input: './src/index.ts',
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      extensions,
      include: ['src/**/*'],
      runtimeHelpers: true,
      presets: [['react-app', { flow: false, typescript: true }]],
    }),
    postcss({
      extract: true,
      modules: true,
    }),
    terser(),
    url(),
  ],
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};
