import {
  defineComponent,
  PropType,
  reactive,
  ref,
  Ref,
  toRefs,
  unref,
  version,
  VNode,
} from "vue";

/*
 * @Author: your name
 * @Date: 2022-01-14 15:57:08
 * @LastEditTime: 2022-01-14 19:20:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/Components.tsx
 */

import classes from "./button.module.scss";
export const Component01 = () => {
  return <Button text={"Hello Button"} />;
};

export const Component02 = () => {
  return (
    <Button2>
      <span style={{ backgroundColor: "red" }}>Hello button</span>
    </Button2>
  );
};

export const Component03 = () => {
  return (
    <Panel header={<span>Title</span>}>
      <span>Hello Content</span>
    </Panel>
  );
};

const Panel = defineComponent({
  props: {
    header: {
      type: Object as PropType<JSX.Element>,
    },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div>
          <header>{props.header}</header>
          {slots.default!()}
        </div>
      );
    };
  },
});

const Button = defineComponent({
  props: {
    text: {
      type: String,
    },
  },
  setup({ text }) {
    // * CSS module
    return () => <button class={classes.btn}>{text}</button>;
  },
});

const Button2 = defineComponent({
  setup(props, { slots }) {
    const Child = slots.default! as any as () => JSX.Element;
    return () => (
      <button>
        <Child />
      </button>
    );
  },
});

export const Component04 = () => {
  return (
    <Flex>
      <div>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </div>
    </Flex>
  );
};

const Flex = defineComponent({
  setup(props, { slots }) {
    return () => {
      // * slots.default will return an array
      const vNode: VNode = slots.default!()[0];
      console.log(vNode);
      if (!vNode.props) {
        vNode.props = {};
      }
      vNode.props!.style = {
        display: "flex",
      };
      return <>{vNode}</>;
    };
  },
});

export const Component05 = defineComponent({
  setup() {
    const form = reactive({
      username: "abc",
    });
    setTimeout(() => {
      form.username = "bcd";
    }, 1000);

    const { username } = toRefs(form);
    return () => {
      return <Input value={username} />;
    };
  },
});

const Input = ({ value }: { value: Ref<string> }) => {
  return (
    <input
      value={value.value}
      onInput={(e) => {
        value.value = (e.target as HTMLInputElement).value;
      }}
    />
  );
};

export const Component06 = defineComponent({
  setup() {
    const { form } = useForm({
      username: "abc",
    });

    setTimeout(() => {
      form.username = "bcd";
    }, 1000);

    return () => {
      return (
        <div>
          <button
            onClick={() => {
              console.log(form.getValues());
            }}
          >
            submit
          </button>
          <Input1
            {...form.getField("username")}
            // value={form.username}
            // onChange={(v) => {
            //   form.username = v;
            // }}
          />
        </div>
      );
    };
  },
});

const Input1 = ({
  value,
  onChange,
}: {
  value: string;
  onChange?: (v: string) => void;
}) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        e.stopImmediatePropagation();
      }}
      onInput={(e) => {
        onChange && onChange((e.target as HTMLInputElement).value);
      }}
    />
  );
};

class Form<T extends Record<string, any>> {
  private data: {
    [key: string]: any;
  };
  constructor(data: T) {
    this.data = reactive(data);
  }

  public getValue(key: string) {
    return this.data[key];
  }

  public setValue(key: string, value: any) {
    this.data[key] = value;
  }

  public getValues() {
    // * use bind or arrow function to make the this for the unref
    return unref(this.data);
  }

  // ! with this, use arrow function
  public getField = (
    key: string
  ): {
    value: any;
    onChange: (v: any) => void;
  } => {
    return {
      value: this.data[key],
      onChange: (v: any) => {
        this.data[key] = v;
      },
    };
  };
}

interface FormOperators<T> {
  getValues(): T;
  getField(key: string): {
    value: any;
    onChange: (v: any) => void;
  };
}

function useForm<T>(data: T) {
  const form = new Form<T>(data);

  //   const ver = ref(0);
  const proxy = new Proxy(form, {
    get(target, key) {
      if (key === "getValues") {
        return form.getValues.bind(target);
      } else if (key === "getField") {
        return form.getField;
      }
      return form.getValue(key as string);
    },
    set(target, key, value) {
      form.setValue(key as string, value);
      //   ver.value++;
      return true;
    },
  });
  return {
    form: proxy as any as T & FormOperators<T>,
  };
}
