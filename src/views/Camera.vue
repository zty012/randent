<template>
  <div
    class="camera-page"
    @dragstart="$event.dataTransfer?.setDragImage(dragImg, 0, 0)"
    @dragover.prevent="
      videoPosition.x = $event.clientX;
      videoPosition.y = $event.clientY;
    "
    @wheel="zoom -= $event.deltaY / 1000"
  >
    <video
      ref="video"
      :style="{
        left: `${videoPosition.x}px`,
        top: `${videoPosition.y}px`,
        zoom,
      }"
      draggable="true"
    ></video>
    <div class="toolbar">
      <select v-model="camera" @change="init">
        <option v-for="c in cameras" :value="c.deviceId">{{ c.label }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const video = ref<HTMLVideoElement | null>(null);
const cameras = ref<MediaDeviceInfo[]>([]);
const camera = ref<string | null>(null);
const videoPosition = ref({ x: 0, y: 0 });
const zoom = ref(1);

const dragImg = new Image();

function init() {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => devices.filter((device) => device.kind === "videoinput"))
    .then((devices) => {
      cameras.value = devices;
      camera.value = cameras.value[0].deviceId;
    })
    .then(() =>
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: camera.value!,
        },
      })
    )
    .then((stream) => {
      video.value!.srcObject = stream;
      video.value?.play();
    });
}

onMounted(init);
</script>

<style lang="scss" scoped>
.camera-page {
  position: relative;

  video {
    position: absolute;
    zoom: 0.8;
  }

  .toolbar {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
</style>
