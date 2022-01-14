import { defineComponent, ref } from "vue";
import _ from "lodash";
/*
 * @Author: your name
 * @Date: 2022-01-14 23:13:15
 * @LastEditTime: 2022-01-15 00:37:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/Drag.tsx
 */
export const DragExample = defineComponent({
  setup() {
    return () => (
      <div
        style={{
          width: "1000px",
          height: "1000px",
        }}
        onDragover={(e) => {
          //   e.preventDefault();
        }}
      >
        <Draggble>
          <div
            style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
          ></div>
        </Draggble>
      </div>
    );
  },
});

function useDrag({ onDragend }: { onDragend: (x: number, y: number) => void }) {
  let startX = 0,
    startY = 0;
  const diffX = ref(0);
  const diffY = ref(0);

  const handlers = {
    onDragstart(e: DragEvent) {
      (startX = e.clientX), (startY = e.clientY);
    },
    onDrag(e: DragEvent) {
      //   diffX.value = e.clientX - startX;
      //   diffY.value = e.clientY - startY;
    },
    onDragend(e: DragEvent) {
      diffX.value = e.clientX - startX;
      diffY.value = e.clientY - startY;
      onDragend(diffX.value, diffY.value);
      (diffX.value = 0), (diffY.value = 0);
    },
  };
  return { handlers, diffX, diffY };
}

const Draggble = defineComponent({
  setup(props, { slots }) {
    const x = ref(0);
    const y = ref(0);
    const { handlers, diffX, diffY } = useDrag({
      onDragend: (diffX, diffY) => {
        x.value = x.value + diffX;
        y.value = x.value + diffY;
      },
    });
    return () => {
      const vNode = slots.default!()[0];
      vNode.props = _.merge(vNode.props, {
        draggable: true,
        ...handlers,
        style: {
          position: "absolute",
          top: y.value + "px",
          left: x.value + "px",
          transform:
            "translate" + "(" + diffX.value + "px," + diffY.value + "px)",
        },
      });
      console.log(vNode.props);
      return <>{vNode}</>;
    };
  },
});
