<template>
  <Icon @click="$router.back()" name="left" />
  <form @submit.prevent="createPost">
    <textarea name="content" autofocus />
    <input type="submit" />
  </form>
</template>
<script lang="ts" setup>
import http from "../http";

const createPost = (e) => {
  const textarea = e.target.content as HTMLTextAreaElement;
  const id = localStorage.id;
  if (!textarea.value || !id) return;
  http.post("posts", {
    author: id,
    content: textarea.value,
  });
};
</script>
<style lang="scss" scoped>
textarea {
  outline: none;
  width: 100%;
  height: 50vh;
  font-size: 5vw;
}
</style>
