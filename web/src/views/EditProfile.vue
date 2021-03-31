<template>
  <Icon @click="$router.back()" name="left" />
  <form @submit.prevent="uploadAvatar">
    <label>
      头像
      <br />
      <img :src="user?.avatar" alt="" />
      <br />
      <input type="file" name="image" accept="image/png, image/jpeg" required />
      <br />
      <input type="submit" value="上传" />
    </label>
  </form>
  <form @submit.prevent="submit">
    <br />
    <label>
      姓名
      <input
        type="text"
        name="name"
        autocomplete="false"
        required
        :value="user?.name"
      />
    </label>
    <br />
    <input type="submit" />
  </form>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import http from "../http";

const user = ref();
const fetch = async () => {
  user.value = (await http.get("/users/me")).data;
};
fetch();
const uploadAvatar = async (e) => {
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
    user.value.avatar = "http://localhost:4000/" + res.fileUrl;
  }
};
const submit = async (e) => {
  const name = e.target.name.value;
  user.value.name = name;
  await http.patch("/users/me", user.value);
};
</script>

<style lang="scss" scoped>
img {
  width: 10vw;
}
</style>
