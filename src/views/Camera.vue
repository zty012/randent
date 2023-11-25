<template>
  <div class="camera-page">
    <div class="layer" v-drag v-scale>
      <video ref="video"></video>
      <canvas
        ref="canvas"
        @touchmove.passive="
          ctx?.fillRect(
            $event.touches[0].clientX - (canvas?.offsetLeft ?? 0) - 5,
            $event.touches[0].clientY + (canvas?.offsetTop ?? 0) - 5,
            10,
            10
          )
        "
      ></canvas>
    </div>
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
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;

function init() {
  ctx = canvas.value?.getContext("2d") as CanvasRenderingContext2D | null;
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
      canvas.value!.width = stream.getVideoTracks()[0].getSettings().width ?? 0;
      canvas.value!.height =
        stream.getVideoTracks()[0].getSettings().height ?? 0;
    });
}

onMounted(init);
</script>

<style lang="scss" scoped>
.camera-page {
  position: relative;
  overflow: hidden;

  .layer {
    position: absolute;
    transition: transform 0.2s;

    canvas {
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .toolbar {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
</style>
