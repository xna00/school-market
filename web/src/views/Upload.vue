<template>
  <form class="form-1" @submit.prevent="upload">
    <label>描述<textarea name="description" required /></label>
    <br />
    <label>
      价格
      <input type="text" name="price" required pattern="\d+(\.\d)?" />
    </label>
    <img v-for="image in images" :src="image" />
    <input type="submit" />
  </form>
  <form @submit.prevent="uploadImage">
    上传图片
    <input type="file" name="image" accept="image/png, image/jpeg" required />
    <input type="submit" value="上传" />
  </form>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import http from "../http";

const images = ref([]);
const upload = async (e) => {
  const form = e.target;
  const res = await http.post("/goods", {
    description: form.description.value,
    price: parseFloat(form.price.value),
    images: images.value,
  });
};
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
    max-width: 45vw;
  }
}
</style>
