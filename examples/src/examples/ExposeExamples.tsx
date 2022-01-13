/*
 * @Author: your name
 * @Date: 2022-01-13 18:53:01
 * @LastEditTime: 2022-01-13 19:34:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/RefExamples.tsx
 */

import { defineComponent, ref, watch } from "vue";

export const ExposeExamples = defineComponent({
  setup() {
    const ipt = ref<HTMLInputElement | null>(null);

    watch(ipt, () => {
      if (ipt.value) {
        ipt.value.value = "hello";
        ipt.value.focus();
      }
    });
    return () => {
      return <input type="text" ref={ipt} />;
    };
  },
});

export const ExposeExamples02 = defineComponent({
  setup() {
    const someRef = ref<any>(null);

    watch(someRef, () => {
      if (someRef.value) {
        someRef.value.test();
        console.log(someRef.value.div);
      }
    });
    return () => {
      return <B ref={someRef} />;
    };
  },
});

const A = () => {
  return <div>A...</div>;
};

const B = defineComponent({
  setup(props, { expose }) {
    const divRef = ref<HTMLDivElement | null>(null);
    expose({
      foo: "bar",
      test() {
        console.log("text");
      },
      div: divRef,
    });
    return () => {
      return <div ref={divRef}>B...</div>;
    };
  },
});
