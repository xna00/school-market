<template>
  {{ id }}
</template>
<script lang="ts" setup>
import { defineProps } from "@vue/runtime-core";
import { io } from "socket.io-client";
const porps = defineProps({
  id: { type: String },
});
const socket = io("http://127.0.0.1:4000");
socket.on("connect", () => console.log("connected"));
console.log(socket.connected);
socket.emit("hi");
</script>
