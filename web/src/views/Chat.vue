<template>
  <div class="px-5 pt-6 vh-100 d-flex flex-column wrapper">
    <header>
      <Icon @click="$router.back()" name="left" />
      {{ user?.account }}
    </header>
    <main class="flex-1" ref="mainRef">
      <li v-for="msg in messages" :class="{ reverse: msg.from === myId }">
        <img
          src="http://localhost:4000/uploads/1aff941a3418f0ac2d64b15e7f5fbd09"
          @click="$router.push(`/users/${id}`)"
        />
        <span>
          {{ msg.content }}
        </span>
      </li>
    </main>
    <footer>
      <form @submit.prevent="sendMessage">
        <textarea name="message" required autocomplete="off" />
        <input type="submit" />
      </form>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import Icon from "../components/Icon";
import {
  computed,
  defineProps,
  onBeforeUnmount,
  onUpdated,
  ref,
} from "@vue/runtime-core";
import { sessions, socket } from "../lib/message";
import http from "../http";
const props = defineProps({
  id: { type: String },
});
const myId = localStorage.id;
const user = ref();
(async () => {
  user.value = (await http.get(`/users/${props.id}`)).data;
})();
const messages = computed(
  () => sessions.value.find((s) => s.id === props.id)?.msgs
);
// socket.emit("read", props.id);
const sendMessage = (e) => {
  const messageElement = e.target.message as HTMLInputElement;
  socket.send({
    to: props.id,
    content: messageElement.value,
  });
  messageElement.value = "";
};
const mainRef = ref();
onUpdated(() => {
  mainRef.value.scrollTo(0, 999999);
});
onBeforeUnmount(() => {
  socket.disconnect();
});
</script>
<style lang="scss" scoped>
.wrapper {
  background: rgba(0, 0, 0, 0.1);
}
main {
  overflow: auto;
}
li {
  list-style: none;
  display: flex;
  align-items: flex-start;
  padding-bottom: 3vw;
  > img {
    width: 10vw;
    height: 10vw;
    object-fit: cover;
    border-radius: 1vw;
  }
  > span {
    white-space: pre-wrap;
    background: white;
    display: inline-block;
    font-size: 5vw;
    line-height: 2em;
    word-break: break-all;
    max-width: 76vw;
    padding: 0 2vw;
    margin: 0 2vw;
    border-radius: 1vw;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background: white;
      top: 4vw;
      left: -0.8vw;
      width: 2vw;
      height: 2vw;
      //   z-index: -1;
      transform: rotateZ(45deg);
    }
  }
  &.reverse {
    flex-direction: row-reverse;
    > span {
      background: chartreuse;
      margin: 0 2vw;
      &::after {
        left: unset;
        right: -0.8vw;
        background: chartreuse;
      }
    }
  }
}
form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vw 0;
  > textarea {
    border: none;
    outline: none;
    height: 10vw;
    font-size: 5vw;
    margin-left: 6vw;
    margin-right: 3vw;
    flex: 1;
  }
  input {
    border: none;
    outline: none;
    font-size: 5vw;
    &[type="submit"] {
      background: chartreuse;
      padding: 0 0.4em;
      margin-right: 3vw;
    }
  }
}
</style>
