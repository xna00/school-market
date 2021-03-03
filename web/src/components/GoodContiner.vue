<template>
  <div class="h-100 continer d-flex jc-between" @scroll="onScroll">
    <GoodRawContiner :goods="goods"/>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import http from "../http";
import TwoLine from "../components/TwoLine.vue";
import GoodRawContiner from './GoodRawContiner.vue'
const props = defineProps({
  keyword: { type: String },
});
const goods = ref([]);
let pageNum = 0;
const fetch = async () => {
  if (pageNum < 0) return;
  pageNum++;
  const res = (
    await http.get("goods", {
      params: {
        pageNum,
        pageSize: 10,
        keyword: props.keyword,
      },
    })
  ).data;
  if (!res.length) {
    pageNum = -1;
  }
  goods.value.push(...res);
};
fetch();
watch(props, () => {
  pageNum = 0;
  goods.value = [];
  fetch();
});
function debounce(fn, delay: number) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
const debouncedFetch = debounce(fetch, 100);
function onScroll(e) {
  const continer: HTMLDivElement = e.currentTarget;
  if (
    continer.scrollHeight - (continer.scrollTop + continer.offsetHeight) <
    100
  ) {
    debouncedFetch();
  }
}
</script>
<style lang="scss" scoped>
.continer {
  overflow: auto;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
