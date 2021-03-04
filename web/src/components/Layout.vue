<template>
  <div class="d-flex flex-column vh-100 px-6">
    <header class="py-4"><slot name="header" /></header>
    <main class="flex-1"><slot /></main>
    <nav class="d-flex">
      <router-link to="/market">
        <Icon name="market" />
        <div>集市</div>
      </router-link>
      <router-link to="/trend">
        <Icon name="trend" />
        <div>动态</div>
      </router-link>
      <router-link to="/message" class="message" :count="messageCount">
        <Icon name="message" />
        <div>消息</div>
      </router-link>
      <router-link to="/me">
        <Icon name="me" />
        <div>我的</div>
      </router-link>
    </nav>
  </div>
</template>
<script lang="ts" setup>
import Icon from "./Icon";
import { sessions } from "../lib/message";
import { computed } from "@vue/runtime-core";
const messageCount = computed(() =>
  sessions.value.reduce<number>(
    (total, current) => total + current.msgs.length,
    0
  )
);
</script>
<style lang="scss" scoped>
main {
  overflow: auto;
}
nav {
  a {
    color: black;
    text-align: center;
    width: 25%;
    div {
      font-size: 2vw;
    }
    &.router-link-active {
      color: sandybrown;
    }
    &.message {
      position: relative;
      &::after {
        content: attr(count);
        position: absolute;
        background: red;
        border-radius: 50%;
        font-size: 1.8vw;
        top: 0;
        left: 54%;
        width: 2.4em;
        line-height: 2.4em;
      }
    }
  }
}
</style>
