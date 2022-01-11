/*
 * @Author: your name
 * @Date: 2022-01-11 01:28:59
 * @LastEditTime: 2022-01-11 02:37:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/RefExample.tsx
 */
import { defineComponent, ref , Ref, PropType} from "vue";

export const RefExample01 = defineComponent({
    setup() {

        const count = ref(0)

        return () => {
            return <div>
                    <button onClick={() => count.value ++}>+</button>
                    {count.value}
                    {/* <Count1 count={count} />
                    <Count1 count={count} /> */}
                </div>
                
        }
    }
})

const Count1 = defineComponent({
    props: {
        count : {
            type : Object as PropType<Ref<number>>,
            require: true
        }
    },
    setup(props) {
        return () => {
            return <div>{props.count.value}</div>
        }
    }
})