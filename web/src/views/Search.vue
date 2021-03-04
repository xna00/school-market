<template>
  <div class="vh-100 px-6 d-flex flex-column">
    <header class="d-flex ai-center py-6 px-5">
      <Icon name="left" @click="$router.back()" />
      <input
        ref="input"
        @keydown.enter="search"
        type="text"
        class="flex-1 mx-6"
      />
      <Icon name="search" @click="search" />
    </header>
    <GoodContiner v-if="keyword" :keyword="keyword" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import Icon from "../components/Icon";
import GoodContiner from "../components/GoodContiner.vue";
import { onMounted } from "@vue/runtime-core";
const keyword = ref();
const input = ref<HTMLInputElement>();
const search = () => {
  if (!input.value.value) return;
  keyword.value = input.value.value;
  console.log(keyword.value);
};
onMounted(()=>{
  input.value?.focus()
})
</script>
<style lang="scss" scoped>
input {
  font-size: 5vw;
  border: none;
  outline: none;
  border: 1px solid grey;
  line-height: 1.5em;
  border-radius: 0.75em;
  padding: 0 3vw;
}
</style>
