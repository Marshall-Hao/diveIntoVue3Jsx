import { computed, defineComponent, ref } from "vue";

/*
 * @Author: your name
 * @Date: 2022-01-12 14:52:03
 * @LastEditTime: 2022-01-12 16:11:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/ComputedExamples.tsx
 */

function reverse(str: string) {
  return [...str].reverse().join("");
}

export const ComputedExamples01 = defineComponent({
  setup() {
    const c = ref("hello");

    return () => {
      return (
        <div>
          {reverse(c.value)}
          <input
            value={c.value}
            onInput={(e) => {
              c.value = (e.target as HTMLInputElement).value;
            }}
          />
        </div>
      );
    };
  },
});

export const ComputedExamples02 = defineComponent({
  setup() {
    const c = ref("hello");
    const s = computed(() => {
      return reverse(c.value);
    });
    return () => {
      return (
        <div>
          {s.value}
          <input
            value={c.value}
            onInput={(e) => {
              c.value = (e.target as HTMLInputElement).value;
            }}
          />
        </div>
      );
    };
  },
});

export const ComputedExamples03 = defineComponent({
  setup() {
    const c = ref("hello");
    const s = computed({
      get() {
        return reverse(c.value);
      },
      set(str: string) {
        c.value = str + "@";
      },
    });
    return () => {
      return (
        <div>
          {s.value}
          <input
            value={s.value}
            onInput={(e) => {
              s.value = (e.target as HTMLInputElement).value;
            }}
          />
        </div>
      );
    };
  },
});

let fib = function (n: number): number {
  if (n === 1 || n === 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

fib = cache(fib);

function cache(f: Function) {
  const m: {
    [key: string]: any;
  } = {};

  function hash(...args: any[]) {
    return args.map((x) => x.toString()).join("");
  }

  return (...args: any[]) => {
    const h = hash(...args);
    console.log(h);
    if (h in m) {
      return m[h];
    }
    const r = f(...args);
    m[h] = r;
    console.log(m);
    return r;
  };
}
export const ComputedExamples04 = defineComponent({
  setup() {
    const n = ref(1);

    return () => (
      <div>
        <span>Fibor value : {fib(n.value)}</span>
        <button
          onClick={() => {
            n.value++;
          }}
        >
          +
        </button>
      </div>
    );
  },
});

function fibValue(n: number): number {
  if (n === 1 || n === 2) {
    return n;
  }
  return fibValue(n - 1) + fibValue(n - 2);
}

export const ComputedExamples05 = defineComponent({
  setup() {
    const n = ref(1);
    const c = ref(0);
    const fib = computed(() => fibValue(n.value));

    setInterval(() => {
      c.value++;
    }, 1000);
    return () => (
      <div>
        <span>Fibor value : {fib.value}</span>
        <button
          onClick={() => {
            n.value++;
          }}
        >
          +
        </button>
        <span>{c.value}</span>
      </div>
    );
  },
});
