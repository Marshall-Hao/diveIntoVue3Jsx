/*
 * @Author: your name
 * @Date: 2022-01-13 17:53:48
 * @LastEditTime: 2022-01-13 18:28:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/LifeCycleExamples.tsx
 */
import {
  defineComponent,
  KeepAlive,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";

export const LifeCycleExamples = defineComponent({
  setup() {
    const toggle = ref(true);
    onUpdated(() => {
      console.log("updated");
    });
    onErrorCaptured(() => {
      console.error("error");
      toggle.value = false;
    });
    return () => {
      return (
        <div>
          <button
            onClick={() => {
              toggle.value = !toggle.value;
            }}
          >
            toggle
          </button>
          {toggle.value && <A />}
        </div>
      );
    };
  },
});

const A = defineComponent({
  setup() {
    onBeforeMount(() => {
      console.log("beforeMount");
    });
    onMounted(() => {
      console.log("mounted");
    });
    onBeforeUnmount(() => {
      console.log("beforeunmounted");
    });
    onUnmounted(() => {
      console.log("unmounted");
    });
    return () => <div>A</div>;
  },
});

export const LifeCycleExamples02 = defineComponent({
  setup() {
    onRenderTriggered((x) => {
      console.log("triggered", x);
    });
    onRenderTracked((x) => {
      console.log("track", x);
    });
    const c = ref(0);
    return () => {
      return <div onClick={() => c.value++}>{c.value}</div>;
    };
  },
});

export const LifeCycleExamples03 = defineComponent({
  setup() {
    const toggle = ref(true);

    return () => {
      return (
        <div>
          <button
            onClick={() => {
              toggle.value = !toggle.value;
            }}
          >
            toggle
          </button>
          <KeepAlive>{toggle.value && <B />}</KeepAlive>
        </div>
      );
    };
  },
});

const B = defineComponent({
  setup() {
    onUnmounted(() => {
      console.log("unMounted");
    });
    onActivated(() => {
      console.log("activated");
    });
    onDeactivated(() => {
      console.log("deactivated");
    });
    return () => <div>B</div>;
  },
});
