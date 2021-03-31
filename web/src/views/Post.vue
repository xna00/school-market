<style lang="scss" scoped>
img {
  width: 10vw;
  border-radius: 5vw;
}
.wrapper {
  > .post {
    overflow: auto;
    > main,
    .r1,
    .r2 {
      display: flex;
      align-items: flex-start;
    }
  }
}
</style>
<template>
  <div class="wrapper d-flex flex-column vh-100">
    <Icon name="left" @click="$router.back()" />
    <div v-if="post" class="post flex-1">
      <main @click="onClick(post._id, post.author._id)">
        <img :src="post.author.avatar" />
        <div>
          <strong>
            {{ post.author.name }}
          </strong>
          <br />
          <span>{{ post.createdAt }}&nbsp;</span>
          <p>
            {{ post.content }}
          </p>
        </div>
      </main>
      <div class="replies">
        <div
          v-for="reply1 in post.replies"
          class="r1"
          @click="onClick(reply1._id, reply1.author?._id)"
        >
          <img :src="reply1.author?.avatar" />
          <div>
            <strong>
              {{ reply1.author?.name }}
            </strong>
            <br />
            <span>{{ reply1.createdAt }}&nbsp;</span>
            <p>
              {{ reply1.content }}
            </p>
            <div
              v-for="reply2 in reply1.replies"
              class="r2"
              @click="onClick(reply1._id, reply2.author?._id)"
            >
              <img :src="reply2.author?.avatar" />
              <div>
                <strong>
                  {{ reply2.author?.name }} -> {{ reply2.replyTo?.name }}
                </strong>
                <br />
                <span>{{ reply2.createdAt }}&nbsp;</span>
                <p>
                  {{ reply2.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="reply">
      <label>
        <textarea ref="input" name="reply" />
      </label>
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
  parent.value = post.value._id;
  replyTo.value = post.value.author._id;
};
fetch();
const parent = ref();
const replyTo = ref();
const input = ref<HTMLTextAreaElement>();
const onClick = (parent1, replyTo1) => {
  console.log(parent1, replyTo1);
  parent.value = parent1;
  replyTo.value = replyTo1;
  input.value?.focus();
};
const reply = async (e) => {
  const id = localStorage.id;
  if (!id) return;
  const post = {
    author: id,
    content: input.value.value,
    replyTo: replyTo.value,
    parent: parent.value,
  };
  await http.post("posts", post);
  fetch();
};
</script>
