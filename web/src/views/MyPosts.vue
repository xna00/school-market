<template>
  <Icon name="left" @click="$router.back()" />
  <ol>
    <li v-for="(post, index) in posts" class="d-flex">
      <span class="text-ellipsis flex-1">
        {{ post.content }}
      </span>
      <Icon @click="deletePost(index)" name="close" />
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import http from "../http";

const id = localStorage.id;
const posts = ref();
const fetch = async () => {
  posts.value = (await http.get(`posts?author=${id}`)).data;
};
fetch();
const deletePost = async (index: number) => {
  const id = posts.value[index]._id;
  await http.delete(`posts/${id}`);
  await fetch();
};
</script>
<style lang="scss" scoped>
li {
  font-size: 1.2em;
  line-height: 2em;
  align-items: center;
  padding: 0 0.2em;
}
</style>
