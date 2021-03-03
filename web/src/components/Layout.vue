<template>
  <div class="d-flex flex-column vh-100">
    <header><slot name="header" /></header>
    <main class="flex-1"><slot /></main>
    <nav class="d-flex jc-around">
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
nav {
  box-shadow: 1px -1px 3px -2px rgba(0, 0, 0, 0.5);
}
a {
  color: black;
  text-align: center;
  div {
    font-size: 8px;
  }
  &.router-link-active {
    color: sandybrown;
  }
}
</style>
