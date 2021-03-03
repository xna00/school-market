<template>
  <div class="h-100 continer d-flex jc-between" @scroll="onScroll">
    <div v-for="good in goods">
      <img :src="good.images[0]" />
      <TwoLine :text="good.description" />
      <div>{{ good.price }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import http from "../http";
import TwoLine from "../components/TwoLine.vue";
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
      },
    })
  ).data;
  if (!res.length) {
    pageNum = -1;
  }
  goods.value.push(...res);
};
fetch();
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
  > div {
    display: inline-block;
    width: 45.5vw;
    > img {
      width: 100%;
      height: 45vw;
      border-radius: 2vw;
    }
  }
}
</style>
