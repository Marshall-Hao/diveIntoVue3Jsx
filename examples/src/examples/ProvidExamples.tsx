import { defineComponent, inject, provide, reactive } from "vue";

/*
 * @Author: your name
 * @Date: 2022-01-13 16:07:06
 * @LastEditTime: 2022-01-13 17:01:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/ProvidExamples.tsx
 */
type Theme = {
  color: string;
};

export const ProvidExamples = defineComponent({
  setup() {
    const theme = reactive({
      color: "red",
    });
    provide("theme", theme);
    return () => {
      return (
        <div>
          <button
            onClick={() => {
              theme.color = "blue";
            }}
          >
            Change theme to blue
          </button>
          <A />;
        </div>
      );
    };
  },
});

const B = defineComponent({
  setup() {
    const theme = inject("theme") as Theme;
    return () => {
      return <div style={{ backgroundColor: theme.color }}>Hello</div>;
    };
  },
});

const A = defineComponent({
  setup() {
    return () => <B />;
  },
});

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}
async function login() {
  await wait(2000);
  return {
    success: true,
    data: null,
  };
}

type User = {
  userName: string;
  loggedIn: boolean;
};

function useUserContext() {
  const user = reactive<User>({
    userName: "",
    loggedIn: false,
  });
  provide("user", user);

  login().then(() => {
    (user.userName = "Marshall"), (user.loggedIn = true);
  });
}

export const ProvideExample02 = defineComponent({
  setup() {
    useUserContext();
    return () => (
      <div>
        <Header />
        <Content />
      </div>
    );
  },
});

const Header = defineComponent({
  setup() {
    const user = inject("user") as User;

    return () => {
      return (
        <header>
          Marshall's fuck
          <strong>{user.userName}</strong>
        </header>
      );
    };
  },
});

const Content = defineComponent({
  setup() {
    return () => <div>Hello</div>;
  },
});
