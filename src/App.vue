<template>
  <div>
    <h2>随机点名</h2>
    <h1 v-if="current === ''" class="wait">准备开始</h1>
    <h1 v-else>
      恭喜
      <span v-if="current.toString().length === 1">0{{ current }}</span>
      <span v-else>{{ current }}</span>
      中奖
    </h1>
    <button @click="stop" v-if="running">停止</button>
    <button @click="start" v-else>开始</button>
    <button @click="exit">退出</button>
    <video
      src="./assets/1.mp3"
      ref="video"
      v-show="running"
      @ended="onEnded"
    ></video>
    <span class="info">v1.0.0 进才北校 2023级20班</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import students from "./students";

const current = ref<string>("");
const running = ref<boolean>(false);
const video = ref<HTMLVideoElement>();
let t: NodeJS.Timeout;

function start() {
  running.value = true;
  video.value?.play();
  t = setInterval(
    () => (current.value = students[Math.floor(Math.random() * 45)]),
    10
  );
}

function stop() {
  clearInterval(t);
  running.value = false;
  video.value?.pause();
}

function onEnded() {
  video.value!.currentTime = 0;
  video.value?.play();
}

function exit() {
  window.close();
}
</script>
