<style lang="scss" scoped>
.wrapper {
  > .post {
    > main {
      border: 1px solid red;
    }
    > .replies {
      > .r1 {
        border: 1px solid blue;
        > .r2 {
          border: 1px solid green;
        }
      }
    }
  }
}
</style>
<template>
  <div class="wrapper d-flex flex-column vh-100">
    <Icon name="left" />
    <div v-if="post" class="post flex-1">
      <main>{{ post.content }}</main>
      <div class="replies">
        <div
          v-for="reply1 in post.replies"
          class="r1"
          @click="onClick(reply1._id, reply1.author)"
        >
          {{ reply1.content }}
          <div
            v-for="reply2 in reply1.replies"
            class="r2"
            @click="onClick(reply1._id, reply2.author)"
          >
            {{ reply2.content }}
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="">
      <textarea ref="input" name="reply" />
      <input type="submit" />
    </form>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from "@vue/runtime-core";
import http from "../http";

const props = defineProps({
  id: { type: String },
});
const post = ref();
const fetch = async () => {
  post.value = (await http.get(`posts/${props.id}`)).data;
};
fetch();
const parent = ref();
const replyTo = ref();
const input = ref<HTMLTextAreaElement>();
const onClick = (parent1, replyTo1) => {
  parent.value = parent1;
  replyTo.value = replyTo1;
  input.value?.focus()
};
const reply = (e) => {};
</script>
