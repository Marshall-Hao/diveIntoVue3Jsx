import { propsToAttrMap } from "@vue/shared";
import { defineComponent, onUnmounted, ref, watch, watchEffect } from "vue";

/*
 * @Author: your name
 * @Date: 2022-01-11 20:28:27
 * @LastEditTime: 2022-01-12 04:00:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/WatchExamples.tsx
 */
export const WatchExamples01 = defineComponent({
    setup() {
        const count = ref(0)

        watchEffect(() => {
            // console.log("watchEffect running..", count.value)
            document.title = "count" + count.value
            // history.replaceState({}, "", "/count" + count.value)
        })


        return () => {
            return <div>
                <button onClick={() => count.value++ }>+</button>
                {count.value}
            </div>
        }
    }
})

export const WatchExamples02 = defineComponent({
    setup() {
        const count = ref(0)

        watchEffect(() => {
            console.log("watchEffect running..", count.value)
            // document.title = "count" + count.value
            // history.replaceState({}, "", "/count" + count.value)
        }, {
            // * sync ... tick ... pre ... render ... post
            flush: 'sync'
            // * 执行时机
        })


        return () => {
            console.log('render...')
            return <div>
                <button onClick={() => count.value++ }>+</button>
                {count.value}
            </div>
        }
    }
})

export const WatchExamples03 = defineComponent({
    setup() {
        const count = ref(0)

        watchEffect((onInvalidate) => {
            console.log("watchEffect03 running..", count.value)
            let I = setInterval(() => {
                count.value ++
            }, 1000)
            // * 副作用失效
            onInvalidate(() => {
                clearInterval(I)
            })
        })


        return () => {
            console.log('render')
            return <div>
                {count.value}
            </div>
        }
    }
})

export const WatchExamples04 = defineComponent({
    setup() {
        const count = ref(0)

        let I = setInterval(() => {
            count.value ++
        }, 1000)
        
       const stop =  watchEffect(() => {
            console.log("watchEffect03 running..", count.value)
          
        })
        // * 副作用失效

        onUnmounted(() =>{
            clearInterval(I)
        })

        return () => {
            console.log('render')
            return <div>
                {count.value}
            </div>
        }
    }
})

export const WatchExamples05 = defineComponent({
    setup() {
        const count = ref(0)

        watch(count, () => {
            console.log('count', count.value)
        })
        setTimeout(() => {
            count.value ++
        }, 1000)

        return () => <div>
            {count.value}
        </div>

    }
})

export const WatchExamples06 = defineComponent({
    setup() {
        const a = ref(0)
        const b = ref(0)
        watch([a,b], (x,y) => {
            console.log(x, y)
        })

        setInterval(() => {
            a.value += 0.2
        },500)

        setInterval(() => {
            b.value += 0.7
        },500)

        return () => <div>
            {a.value + b.value}
        </div>
        
    }
})

export const WatchExamples07 = defineComponent({
    setup() {
        const greeting = ref('hello')

        setTimeout(() => {
            greeting.value = "world"
        },1000)

        return () => <div>
            <Item text={greeting.value}/>
        </div>
    }
})

const Item = defineComponent({
    props: {
        text : {
            type : String
        }
        
    },

    setup(props) {
        watch(() => props.text, (to,from) => {
            console.log('watched',to,from)
        })

        return () => {
            return <div>{props.text}</div>
        }
    }
})

export const WatchExamples08 = defineComponent({
    setup() {
        const c = ref(0)

        watch(c, () => {
            console.log('oops')
        }, {
            "immediate": true
        })

        return () => <div onClick={() => {
            c.value ++
        }}>
            {c.value}
        </div>
    }
})
