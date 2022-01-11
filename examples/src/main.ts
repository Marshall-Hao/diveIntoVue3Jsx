/*
 * @Author: your name
 * @Date: 2022-01-10 20:09:11
 * @LastEditTime: 2022-01-11 02:29:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/main.ts
 */
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type {MyRouteType} from './mytypes'

import App from './App'

// * roll up
const examples = import.meta.glob("./examples/**/*.tsx")

console.log(examples)
const examplePromises = Object.keys(examples)
    .map(x => examples[x])
    .map(f  =>f())

const routes : MyRouteType[] = []

Promise.all(examplePromises)
  .then(list => {
    for(let module of list) {
      for(let key in module) {
        const Component = module[key]
        routes.push({
          path : "/" + key.toLocaleLowerCase(),
          key,
          component : Component
        })
      }
    }

   const router = createRouter({
       history: createWebHashHistory(),
       routes
   })

   const app = createApp(App, {routes})
   app.use(router)
   app.mount('#app')
   
})
    

