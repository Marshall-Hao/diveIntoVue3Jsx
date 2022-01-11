/*
 * @Author: your name
 * @Date: 2022-01-10 20:14:46
 * @LastEditTime: 2022-01-11 01:32:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/App.tsx
 */
import { MyRouteType } from "./mytypes"
import { RouterLink, RouterView } from 'vue-router'
import './layout.css'
export default (props: {
    routes : MyRouteType[]
}) => {
    return <>
        <header>
            <h2>Vue3 hard examples</h2>
        </header>
        <div>
            <ul class="menu">
                {props.routes.map(x => {
                    return (
                        <li key={x.key}>
                            <RouterLink to={x.path}>{x.key}</RouterLink>
                        </li>
                    )
                })}
            </ul>
            <div class="content">
                <RouterView />
            </div>
        </div>
    </>
}