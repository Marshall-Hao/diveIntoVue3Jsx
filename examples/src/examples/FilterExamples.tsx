/*
 * @Author: your name
 * @Date: 2022-01-15 00:40:12
 * @LastEditTime: 2022-01-15 01:50:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/src/examples/FilterExamples.tsx
 */
import { defineComponent, ref } from "vue";
import classes from "./table.module.scss";

type TableMeta = {
  title: string;
  key: string;
};

function request() {
  return Promise.resolve([
    { name: "marhsll", score: 100 },
    { name: "marhsll", score: 100 },
    { name: "marhsll", score: 100 },
  ]);
}

function useList() {
  const data = ref<any>(null);
  request().then((resp) => {
    data.value = resp;
  });
  return data;
}

export const FilterExample01 = defineComponent({
  setup() {
    const tableMeta: TableMeta[] = [
      {
        title: "Name",
        key: "name",
      },
      {
        title: "Score",
        key: "score",
      },
    ];
    const data = useList();
    return () => {
      return (
        <div class={classes.table}>
          <Table tableMeta={tableMeta} />
          <Tbody tableMeta={tableMeta} data={data.value} />
        </div>
      );
    };
  },
});

type TableProps = {
  tableMeta: TableMeta[];
  data: Record<string, any>[];
};

const Table = ({ tableMeta }: Omit<TableProps, "data">) => {
  return (
    <table>
      <Thead tableMeta={tableMeta} />
    </table>
  );
};

const Thead = ({ tableMeta }: Omit<TableProps, "data">) => {
  return (
    <>
      {tableMeta.map((item) => {
        return <td key={item.key}>{item.title}</td>;
      })}
    </>
  );
};

const Tbody = ({ tableMeta, data }: TableProps) => {
  return (
    <>
      {data &&
        data.map((item, i) => {
          return (
            <tr key={i}>
              {tableMeta.map((meta) => {
                return <td key={meta.key}>{item[meta.key]}</td>;
              })}
            </tr>
          );
        })}
    </>
  );
};
