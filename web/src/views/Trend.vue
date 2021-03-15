<template>
  <Layout>
    <div class="wrapper">
      <ul>
        <li v-for="post in posts" @click="$router.push(`/posts/${post._id}`)">
          <main>{{ post.content }}</main>
          <footer>{{ post.author?.account }}</footer>
        </li>
      </ul>
      <div class="add">
        <Icon @click="$router.push('/create-post')" name="plus" />
      </div>
    </div>
  </Layout>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import http from "../http";

const posts = ref<any[]>();
const fetch = async () => {
  posts.value = (await http.get("posts")).data;
};
fetch();
</script>
<style lang="scss" scoped>
.wrapper {
  > .add {
    display: inline-block;
    position: fixed;
    bottom: 14vw;
    right: 4vw;
    background: yellow;
    border-radius: 50%;
    font-size: 8vw;
    line-height: 1.5em;
    width: 1.5em;
    text-align: center;
  }
}
</style>
