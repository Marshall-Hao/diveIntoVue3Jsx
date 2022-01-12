import {
  defineComponent,
  EffectScope,
  effectScope,
  onScopeDispose,
  onUnmounted,
  reactive,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";

/*
 * @Author: your name
 * @Date: 2022-01-12 16:37:33
 * @LastEditTime: 2022-01-12 17:00:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/ScopeExamples.tsx
 */
export const ScopeExamples01 = defineComponent({
  setup() {
    const scope = effectScope();
    const c = ref(0);
    scope.run(() => {
      watch(c, () => {
        console.log("watch effect", c.value);
      });
    });
    setInterval(() => {
      c.value++;
    }, 300);

    setTimeout(() => {
      scope.stop();
    }, 2000);

    return () => <div>{c.value}</div>;
  },
});

export const ScopeExamples02 = defineComponent({
  setup() {
    const scope = effectScope();
    const c = ref(0);
    scope.run(() => {
      const subScope = effectScope(true);
      subScope.run(() => {
        watch(c, () => {
          console.log("watch effect", c.value);
        });
      });
    });
    setInterval(() => {
      c.value++;
    }, 300);

    setTimeout(() => {
      scope.stop();
    }, 2000);

    return () => <div>{c.value}</div>;
  },
});

function useMouseMove() {
  const point = reactive({ x: 0, y: 0 });
  function handler(e: MouseEvent) {
    (point.x = e.clientX), (point.y = e.clientY);
  }
  window.addEventListener("mousemove", handler);
  // * open | close corresponds to the scope run / stop
  onScopeDispose(() => {
    window.removeEventListener("mousemove", handler);
  });
  return toRefs(point);
}

function useMouseMove01() {
  const point = reactive({ x: 0, y: 0 });
  const active = ref(false);
  function handler(e: MouseEvent) {
    (point.x = e.clientX), (point.y = e.clientY);
  }

  watch(active, () => {
    if (active.value) {
      window.addEventListener("mousemove", handler);
    } else {
      window.removeEventListener("mousemove", handler);
    }
  });

  return {
    ...toRefs(point),
    active,
  };
}

export const ScopeExamples03 = defineComponent({
  setup() {
    let point: {
      x: Ref<number>;
      y: Ref<number>;
    } | null = null;
    let scope: EffectScope;
    const active = ref(false);

    watch(active, () => {
      if (active.value) {
        scope = effectScope();
        // * ! means canot be null
        point = scope.run(() => useMouseMove())!;
      } else {
        scope?.stop();
        point = null;
      }
    });

    // * since the initial value for point is null,then the render won't
    //*rely on the point, since it cannot build the rely connection with //*
    // * value
    return () => (
      <div>
        {active.value && (
          <span>
            point is : {point?.x.value}, {point?.y.value}
          </span>
        )}
        <button
          onClick={() => {
            active.value = !active.value;
          }}
        >
          toggle
        </button>
      </div>
    );
  },
});

export const ScopeExamples04 = defineComponent({
  setup() {
    const { x, y, active } = useMouseMove01();

    return () => (
      <div>
        {active.value && (
          <span>
            point is : {x.value}, {y.value}
          </span>
        )}
        <button
          onClick={() => {
            active.value = !active.value;
          }}
        >
          toggle
        </button>
      </div>
    );
  },
});
