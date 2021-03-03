<template>
  <Layout>
    <div v-if="!id">
      <form @submit.prevent="onSubmit">
        <label>账号<input type="text" name="account" required /></label>
        <span v-if="!register" class="register" @click="register = true"
          >注册账号</span
        >
        <br />
        <label>密码<input type="password" name="password" required /></label>
        <br />
        <label v-if="register">
          确认密码<input type="password" name="confirm" required />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
    <div v-if="id">
      <button @click="logout">注销</button>
      <button @click="$router.push('/upload')">上传</button>
      <User :id="id" :chat="false" />
    </div>
  </Layout>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import http from "../http";
import User from "./User.vue";

const register = ref(false);
const id = ref(localStorage.id);
const login = async (account, password) => {
  const user = (
    await http.post("/auth/login", {
      account,
      password,
    })
  ).data;
  if (user.token) {
    localStorage.token = user.token;
    localStorage.id = user.id;
    id.value = user.id;
  }
};
const logout = () => {
  id.value = "";
  localStorage.id = "";
  localStorage.token = "";
};
const onSubmit = async (e) => {
  const form = e.target as HTMLFormElement;
  const account = form.account.value;
  const password = form.password.value;
  if (register.value) {
    const confirm = form.confirm.value;
    if (password === confirm) {
      await http.post("/auth/register", {
        account,
        password,
      });
      await login(account, password);
    }
  } else {
    login(account, password);
  }
};
</script>
<style lang="scss" scoped>
.register {
  text-decoration: underline;
}
</style>
