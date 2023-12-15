<template>
  <div
    class="gacha-page"
    :style="{
      '--font':
        count > 1
          ? (gacha.font / (current.join().length / current.length)) * 2
          : gacha.font,
    }"
  >
    <h2>{{ gacha.name }}</h2>
    <h1 v-if="current.length === 0" class="wait">{{ gacha.description }}</h1>
    <div v-else class="results">
      <div class="one" v-for="n in count">
        <h3 v-if="count > 1" class="label">{{ n }}</h3>
        <div class="line" v-for="line in (current[n - 1] ?? '?').split('\n')">
          {{ line }}
        </div>
      </div>
    </div>
    <div class="btns">
      <button @click="stop" v-if="running">停止</button>
      <button @click="start" v-else @wheel.prevent="onWheel">
        开始
        {{ count > 1 ? `(${count} 连)` : "(单抽)" }}
      </button>
      <!-- <select v-model="music">
        <optgroup label="Music">
          <option :value="url" v-for="(url, name) in musics">{{ name }}</option>
        </optgroup>
      </select> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { choice } from "../utils/random";
import { useRoute } from "vue-router";
import gachas from "../utils/gachas";
import musics from "../utils/musics";

const current = ref<string[]>([]);
const running = ref<boolean>(false);
const count = ref<number>(1);
const music = ref<string>(musics["好运来"]);
const route = useRoute();
const gacha = gachas[Number(route.params.gacha)];
const audio = new Audio();
audio.addEventListener("ended", onEnded);
let t: NodeJS.Timeout;

function start() {
  running.value = true;
  audio.src = music.value;
  audio.play();
  t = setInterval(
    () =>
      (current.value = Array<string>(count.value)
        .fill("")
        .map(() => choice(gacha.items))),
    10
  );
}

function stop() {
  clearInterval(t);
  running.value = false;
  audio.pause();
}

function onEnded() {
  audio.currentTime = 0;
  audio.play();
}

function onWheel({ deltaY: delta }: WheelEvent) {
  if (delta > 0) {
    count.value++;
  } else if (delta < 0 && count.value > 1) {
    count.value--;
  }
}
</script>

<style lang="scss" scoped>
.gacha-page {
  --font: 12;
  flex-direction: column;
  justify-content: space-between !important;
  padding: 5% 0;

  h1.wait {
    font-size: 3em;
    color: #aaa;
  }
  h2 {
    font-size: 5em;
    margin: 0;
  }
  .results {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5em;
    width: 60%;
    justify-content: center;

    .one {
      text-align: center;

      .label {
        font-size: calc(var(--font) * 0.8em);
        margin: 0;
      }
      .line {
        font-size: calc(var(--font) * 1em);
        font-weight: bold;
      }
    }
  }
  .btns {
    button,
    select {
      font-size: 1.4em;
      margin: 0.5em;
    }
  }
}
</style>
