<template>
  <Icon name="left" @click="$router.back()" />
  <ol>
    <li v-for="(good, index) in user?.goods" class="d-flex">
      <span class="text-ellipsis flex-1">
        {{ good.description }}
      </span>
      <Icon @click="$router.push(`/upload/${good._id}`)" name="pen" />
      <Icon @click="deleteGood(index)" name="close" />
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import http from "../http";

const id = localStorage.id;
const user = ref();
const fetch = async () => {
  user.value = (await http.get(`users/${id}`)).data;
};
fetch();
const deleteGood = async (index: number) => {
  console.log(index);
  const id = user.value.goods[index]._id;
  console.log(id);
  await http.delete(`goods/${id}`);
  await fetch();
};
</script>
<style lang="scss" scoped>
li {
  font-size: 1.2em;
  line-height: 2em;
  align-items: center;
  padding: 0 .2em;
}
</style>
