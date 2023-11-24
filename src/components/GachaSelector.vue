<template>
  <div class="gacha-selector">
    <div class="links">
      <router-link to="/" class="gacha exit" @click="exit">退出</router-link>
      <router-link to="/camera" class="gacha camera">展台</router-link>
      <router-link
        v-for="(gacha, index) in gachas"
        :to="`/gacha/${index}`"
        class="gacha"
      >
        {{ gacha.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gachas from "../utils/gachas";

function exit() {
  window.close();
}
</script>

<style lang="scss" scoped>
.gacha-selector {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #000;
  z-index: 1;

  .links {
    display: flex;
    gap: 10px;
  }

  .gacha {
    padding: 6px 10px;
    font-size: 0.8em;
    background-color: #333;
    border-radius: 9999px;
    color: #fff;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.1);
    }
    &.classic {
      background-color: #222;
      color: #999;
    }
    &.exit {
      background-color: #400;
      color: #fff;
    }
    &.camera {
      background-color: #6868e2;
      color: #fff;
    }
  }
}
</style>
