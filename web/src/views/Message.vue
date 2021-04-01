<template>
  <Layout>
    <template v-slot:header>
      <Icon name="left" @click="$router.back()" />
    </template>
    <li
      v-for="(session, i) in sessions"
      @click="$router.push(`/chat/${session.id}`)"
      class="d-flex"
    >
      <img :src="users[i]?.avatar" class="mr-5" />
      <div class="info">
        {{ users[i]?.name }}
        <br />
        {{ session.msgs[session.msgs.length - 1].content }}
      </div>
      <div class="unread-count">
        {{ session.unReadCount ? session.unReadCount : "" }}
      </div>
    </li>
  </Layout>
</template>
<style lang="scss" scoped>
li {
  align-items: center;
  > img {
    width: 10vw;
    height: 10vw;
  }
  > .info {
    flex-grow: 1;
  }
  > .unread-count {
    background: red;
    font-size: .8em;
    width: 1.2em;
    line-height: 1.2em;
    text-align: center;
    border-radius: 50%;
  }
}
</style>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import http from "../http";
import { sessions } from "../lib/message";
const users = ref();
watch(
  sessions,
  async () => {
    users.value = await Promise.all(
      sessions.value.map(
        async (session) => (await http.get(`users/${session.id}`)).data
      )
    );
  },
  { deep: true }
);
</script>
