<template>
  <div v-for="good in goods" @click="$router.push(`/goods/${good._id}`)">
    <img :src="good.images[0]" />
    <TwoLine :text="good.description" />
    <div>{{ good.price }}¥</div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "@vue/runtime-core";
import TwoLine from "../components/TwoLine.vue";
defineProps({
  goods: { type: Array },
});
</script>
<style lang="scss" scoped>
div {
  display: inline-block;
  width: 45.5vw;
  flex-grow: 0;
  flex-shrink: 0;
  > img {
    width: 100%;
    height: 45vw;
    border-radius: 2vw;
  }
}
</style>
