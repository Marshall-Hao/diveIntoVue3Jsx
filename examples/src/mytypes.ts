/*
 * @Author: your name
 * @Date: 2022-01-11 00:56:04
 * @LastEditTime: 2022-01-11 00:57:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/mytypes.tsx
 */
// * only import type
import type {RouteRecordRaw} from 'vue-router'
export type MyRouteType = RouteRecordRaw & {key : string}