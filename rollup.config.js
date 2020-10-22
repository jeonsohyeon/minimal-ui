import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// babel-preset-react-app를 사용한다면 BABEL_ENV를 필수로 설정
process.env.BABEL_ENV = 'production';

export default {
  input: './src/index.ts',
  output: [
    {
      file: package.module,
      format: 'es',
    },
  ],
  plugins: [
    postcss({
      modules: true,
    }),
    url(),
    babel({
      extensions,
      include: ['src/**/*'],
      runtimeHelpers: true,
      presets: [['react-app', { flow: false, typescript: true }]],

      exclude: 'node_modules/**',
    }),
    resolve({ extensions }),
    postcss({
      extract: true,
      modules: true,
    }),
    terser(),
    url(),

    commonjs({
      dynamicRequireTargets: [
        // include using a glob pattern (either a string or an array of strings)
        'node_modules/logform/*.js',
        // exclude files that are known to not be required dynamically, this allows for better optimizations
        '!node_modules/logform/index.js',
        '!node_modules/logform/format.js',
        '!node_modules/logform/levels.js',
        '!node_modules/logform/browser.js',
      ],
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        react: Object.keys(require('react')),
        'react-is': Object.keys(require('react-is')),
      },
    }),
  ],
  external: ['lodash'],
};
