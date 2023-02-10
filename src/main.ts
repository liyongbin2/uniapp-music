import { createSSRApp } from "vue";
import store from "@/store"
import "@/public/css/global.scss"
import "@/public/css/animation.scss"
import "@/static/icons/iconfont.css"
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(store)
  return {
    app,
  };
}
