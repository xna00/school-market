<template>
  <Layout>
    <template v-slot:header>
      <Icon name="left" />
    </template>
    <li
      v-for="session in sessions"
      @click="$router.push(`/chat/${session.id}`)"
    >
      {{ session.id }}
      <br />
      {{ session.msgs[session.msgs.length - 1].content }}
    </li>
  </Layout>
</template>
<script lang="ts" setup>
import { sessions } from "../lib/message";
</script>
