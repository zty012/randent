<template>
  <div class="gacha-selector">
    <router-link
      v-for="(gacha, index) in gachas"
      :to="`/${index}`"
      class="gacha"
    >
      {{ gacha.name }}
    </router-link>
    <router-link to="/" class="gacha exit" @click="exit">退出</router-link>
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
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #000;

  .gacha {
    width: 8em;
    height: 3em;
    background-color: #333;
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  }
}
</style>
