<template>
  <Icon @click="$router.back()" name="left" />
  <form class="form-1" @submit.prevent="upload">
    <label>
      描述
      <textarea name="description" required v-model="good.description" />
    </label>
    <br />
    <label>
      价格
      <input
        type="text"
        name="price"
        required
        pattern="\d+(\.\d)?"
        v-model.number="good.price"
      />
    </label>
    <br />
    <img v-for="image in images" :src="image" />
    <form @submit.prevent="uploadImage">
      上传图片
      <input type="file" name="image" accept="image/png, image/jpeg" required />
      <input type="submit" value="上传" />
    </form>
    <input type="submit" />
  </form>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { defineProps } from "@vue/runtime-core";
import http from "../http";

const props = defineProps({
  id: { type: String },
});

const images = ref([]);

const good = ref({
  description: "",
  price: 0,
  images: images.value,
});
const fetch = async () => {
  good.value = (await http.get(`goods/${props.id}`)).data;
  images.value = good.value.images;
};
let upload;
if (props.id) {
  fetch();
  upload = () => {
    http.put(`goods/${props.id}`, good);
  };
} else {
  upload = () => {
    http.post("/goods", good);
  };
}
const uploadImage = async (e) => {
  const form = e.target;
  const formData = new FormData();
  formData.append("image", form.image.files[0]);
  const res = (
    await http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
  if (res.fileUrl) {
    images.value.push("http://localhost:4000/" + res.fileUrl);
  }
};
</script>
<style lang="scss" scoped>
.form-1 {
  > img {
    max-width: 100%;
    display: block;
    margin: 10px auto;
  }
  textarea {
    width: 100%;
    height: 20vh;
  }
}
</style>
