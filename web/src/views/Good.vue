<template>
  <div class="px-6">
    <header class="py-6">
      <Icon name="left" @click="$router.back()" />
    </header>
    <div @click="$router.push(url)">
      {{ good?.seller.name }}
    </div>
    <button v-if="url !== '/me'" @click="$router.push(`/chat/${good?.seller._id}`)">私信</button>
    <div class="price py-5">¥{{ good?.price }}</div>
    <p>{{ good?.description }}</p>
    <img v-for="image in good?.images" :src="image" alt="" />
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
const url = ref();
const fetch = async () => {
  good.value = (await http.get(`/goods/${props.id}`)).data;
  url.value =
    good.value.seller._id === localStorage.id
      ? "/me"
      : `/users/${good.value.seller._id}`;
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
