import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .directive("drag", {
    mounted(el: HTMLElement, { value }) {
      if (!value) return;
      let disx = 0;
      let disy = 0;
      function reset() {
        document.removeEventListener("mousemove", mousemove, false);
        document.removeEventListener("touchmove", touchmove, false);
      }
      function mousemove(e: MouseEvent) {
        el.style.left = e.pageX - disx + "px";
        el.style.top = e.pageY - disy + "px";
      }
      function mousedown(e: MouseEvent) {
        disx = e.clientX - el.offsetLeft;
        disy = e.clientY - el.offsetTop;
        document.addEventListener("mousemove", mousemove, false);
      }
      function touchmove(e: TouchEvent) {
        el.style.left = e.touches[0].pageX - disx + "px";
        el.style.top = e.touches[0].pageY - disy + "px";
      }
      function touchstart(e: TouchEvent) {
        disx = e.touches[0].clientX - el.offsetLeft;
        disy = e.touches[0].clientY - el.offsetTop;
        document.addEventListener("touchmove", touchmove, false);
      }
      document.addEventListener("mouseup", reset, false);
      document.addEventListener("touchend", reset, false);
      document.addEventListener("mousedown", mousedown, false);
      document.addEventListener("touchstart", touchstart, false);
    },
  })
  .directive("scale", {
    mounted(el: HTMLElement) {
      let scale = 1;
      let lastDistance = 0;
      function update(s: number) {
        scale = s;
        el.style.transform = `scale(${s})`;
      }
      el.addEventListener("wheel", (e) => {
        update(scale - e.deltaY / 500);
      });
      el.addEventListener(
        "touchmove",
        (e) => {
          if (e.touches.length === 2) {
            const distance = Math.sqrt(
              (e.touches[0].clientX - e.touches[1].clientX) ** 2 +
                (e.touches[0].clientY - e.touches[1].clientY) ** 2
            );
            update(distance / lastDistance);
            lastDistance = distance;
          }
        },
        false
      );
    },
  })
  .mount("#app")
  .$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: "removeLoading" }, "*");

    // Use contextBridge
    window.ipcRenderer.on("main-process-message", (_event, message) => {
      console.log(message);
    });
  });
