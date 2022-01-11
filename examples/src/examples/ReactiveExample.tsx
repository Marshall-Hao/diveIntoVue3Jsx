import { defineComponent, reactive, toRefs } from "vue";

/*
 * @Author: your name
 * @Date: 2022-01-11 02:37:33
 * @LastEditTime: 2022-01-11 02:44:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/ReactiveExample.tsx
 */

export const ReactiveExample01 = defineComponent({
    setup() {
        const state =  reactive({
            a : "123",
            b : 2
        })
        setTimeout(() => {
            state.a = "456"
        },1000)
        setTimeout(() => {
            state.b = 100
        },2000)
        return () => {
            return <div>
                <div>{state.a}</div>
                <div>{state.b}</div>
            </div>
        }
    }
})

export const ReactiveExample02 = defineComponent({
    setup() {
        const state =  reactive({
            a : "123",
            b : 2
        })

        const {a,b} = toRefs(state)

        setTimeout(() => {
            a.value = "456"
        },1000)
        setTimeout(() => {
            b.value = 100
        },2000)
        return () => {
            return <div>
                <div>{a.value}</div>
                <div>{b.value}</div>
            </div>
        }
    }
})