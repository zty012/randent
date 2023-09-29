<template>
  <div>
    <h2>随机点名</h2>
    <h1>{{ number }}</h1>
    <button @click="start" :disabled="disabled">开始</button>
    <button @click="exit">退出</button>
    <video
      src="./assets/Galaxy_Brain_720P_30FPS.mp4"
      ref="video"
      v-show="disabled"
    ></video>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const number = ref(-1);
const disabled = ref(false);
const video = ref<HTMLVideoElement>();

function start() {
  disabled.value = true;
  video.value?.play();
  const t = setInterval(() => {
    let v = Math.floor(Math.random() * 46) + 1;
    if (v == 41 && Math.random() > 0.5) {
      v = 32;
    }
    number.value = v;
  }, 10);
  setTimeout(() => {
    clearInterval(t);
    disabled.value = false;
    video.value?.pause();
    video.value!.currentTime = 0;
  }, 6000);
}

function exit() {
  window.close();
}
</script>
