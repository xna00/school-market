<template>
  <div class="px-3">
    <Icon @click="$router.back()" name="left" />
    <div>{{ user?.name }}</div>
    <div>{{ user?.account }}</div>
    <button v-if="chat" class="chat" @click="$router.push(`/chat/${user._id}`)">
      私信
    </button>
    <div class="d-flex jc-between continer">
      <GoodRawContiner :goods="user?.goods" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from "@vue/runtime-core";
import http from "../http";
import GoodRawContiner from "../components/GoodRawContiner.vue";

const props = defineProps({
  id: { type: String },
  chat: { type: Boolean, default: true },
});
const user = ref();
(async () => {
  user.value = (await http.get(`users/${props.id}`)).data;
})();
</script>
<style lang="scss" scoped>
.chat {
  border: none;
  background: orange;
  font-size: 4vw;
  padding: 0.5em 1em;
}
.continer {
  flex-wrap: wrap;
}
</style>
