import { getCurrentInstance } from "vue";

export default function(selector: string) {
  return new Promise((res, rej) => {
    try {
      const _this = getCurrentInstance();
      const view = uni
        .createSelectorQuery()
        .in(_this)
        .select(selector);
      view
        .fields(
          {
            size: true,
            scrollOffset: true,
            dataset: true,
            rect: true,
            id: true
          },
          data => {
            console.log("里面的节点信息", data);
            res(data);
          }
        )
        .exec();
    } catch (e) {
      rej(e);
    }
  });
}
