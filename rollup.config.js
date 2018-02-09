const path = require("path");
const typescript = require("rollup-plugin-typescript2");
const vue = require("rollup-plugin-vue");
const uglify = require("rollup-plugin-uglify");
const { minify } = require("uglify-js");

const isProduction = process.env.NODE_ENV === `production`;

const name = "vue-transmit";
const nameVar = "VueTransmit";

module.exports = {
  input: path.resolve(__dirname, "index.ts"),
  external: ["vue"],
  plugins: [
    typescript(),
    vue({
      css: path.join(__dirname, `dist/${name}.css`),
    }),
    uglify(),
  ],
  output: [
    {
      format: "es",
      file: `./dist/${name}.esm.js`,
      sourcemap: true,
    },
    {
      format: "umd",
      name: nameVar,
      file: `./dist/${name}.js`,
      sourcemap: true,
      globals: {
        vue: "Vue",
      },
    },
  ],
};