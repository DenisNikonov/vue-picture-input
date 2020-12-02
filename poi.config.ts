import { Config } from 'poi'

const config: Config = {
  entry: './PictureInput.vue',
  output: {
    dir: 'umd',
    fileNames: {
      js: 'vue-picture-input.js'
    },
    moduleName: 'PictureInput',
    format: 'umd',
    sourceMap: false,
    html: false,
  }
  // filename: {
  //   js: 'vue-picture-input.js'
  // },
  // moduleName: 'PictureInput',
  // extractCSS: false,
  // dist: 'umd',
  // sourceMap: false,
  // html: false,
  // format: 'umd'
}

export default config