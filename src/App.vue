<template>
  <div class="app-inner">
    <main>
      <gacha-selector />
      <router-view v-slot="{ Component, route }" class="view">
        <transition mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <div class="copyright">
      v{{ packagejson.version }} - 进才北校 2022级20班
    </div>
  </div>
</template>

<script lang="ts" setup>
import GachaSelector from "./components/GachaSelector.vue";
import packagejson from "../package.json";
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: 0.3s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.app-inner {
  height: 100%;

  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .view {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .copyright {
    position: fixed;
    right: 1em;
    bottom: 1em;
  }
}
</style>
