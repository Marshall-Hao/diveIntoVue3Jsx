/*
 * @Author: your name
 * @Date: 2022-01-10 20:33:34
 * @LastEditTime: 2022-01-10 21:27:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/demo/proxyExample.tsx
 */


// * T 泛型
function createRef<T>(val: T) {
    const obj = {
        get value() {
            return val
        },
        set value(v: T) {
            console.log("trigger")
            val = val
        }
    }
    return obj
}

function reactive<T extends object>(obj : T) {
    const proxy = new Proxy(obj, {
        get(target, key) {
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            Reflect.set(target,key,value)
            return true
        }
    })
    return proxy
}

const count = createRef(0)
count.value = 1

