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
      <router-link to="/message">
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
  }
}
</style>
