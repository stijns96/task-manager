
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  input: ['src/js/slider.js', 'src/js/slider-2.js', 'src/js/collapsible.js'],
  output: {
    dir: 'theme/assets',
  },
  plugins: [
    nodeResolve(),
  ],
  treeshake: false,
});