import * as webpack from 'webpack'
import { getOptions } from 'loader-utils'

export default function (this: webpack.loader.LoaderContext) {
  const options = getOptions(this)
  const method = options.framework === 'vue' ? 'createVueApp' : 'createReactApp'
  const prerender = `
if (typeof PRERENDER !== 'undefined') {
  global._prerender = inst
}`
  return `import { ${method} } from '@tarojs/runtime'
import component from '${this.request.split('!').slice(1).join('!')}'
var inst = App(${method}(component))
${options.prerender ? prerender : ''}
`
}