<template>
  <div class="wrapper">
    <div ref="firstLineRef">{{ firstLine }}</div>
    <div class="text-ellipsis">{{ secondLine }}</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, ref } from "@vue/runtime-core";

const props = defineProps({
  text: { type: String },
});
const firstLine = ref(props.text);
const secondLine = ref();
let firstLineRef = ref<HTMLDivElement>();
onMounted(() => {
  if (firstLineRef.value && firstLineRef.value.parentElement) {
    const firsrWidth = firstLineRef.value.parentElement.offsetWidth;
    const secondWidth = firstLineRef.value.offsetWidth;
    const length = Math.floor((firsrWidth / secondWidth) * props.text.length);
    firstLine.value = props.text.slice(0, length);
    secondLine.value = props.text.slice(length);
  }
});
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  > div:first-child {
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
