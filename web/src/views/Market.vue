<template>
  <Layout>
    <template v-slot:header>
      <header class="px-5" @click="$router.push('/search')">
        <Icon name="search" />
      </header>
    </template>
    <GoodContiner />
  </Layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Icon from "../components/Icon";
import GoodContiner from "../components/GoodContiner.vue";
</script>
<style lang="scss" scoped>
header {
  border: 1px solid sandybrown;
  line-height: 8vw;
  border-radius: 4vw;
}
</style>
