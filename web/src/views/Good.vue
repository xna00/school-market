<template>
  <div class="px-6">
    <header class="py-6">
      <Icon name="left" @click="$router.back()"/>
    </header>
    <div>{{ good?.seller.account }}</div>
    <div class="price py-5">¥{{ good?.price }}</div>
    <p>{{ good?.description }}</p>
    <img v-for="image in good?.images" :src="image" alt="">
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from "@vue/runtime-core";
import Icon from "../components/Icon";
import http from "../http";

const props = defineProps({
  id: { type: String },
});
const good = ref();
const fetch = async () => {
  good.value = (await http.get(`/goods/${props.id}`)).data;
};
fetch();
</script>
<style lang="scss" scoped>
img {
    max-width: 100%;
}
.price {
  color: red;
}
</style>
