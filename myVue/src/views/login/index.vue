<template>
  <div class="app-login">
    <input type="password" class="hidden-element" tabindex="-1" placeholder style="display:none;" />
    <div class="al-main">
      <div class="al-bg"></div>
      <div class="alm-form-wrap">
        <div class="title">sea house</div>
        <transition name="zoom">
          <Login v-if="$route.query.isForgot!=='true'" @change="changeForm(true)"/>
          <!-- <Forgot/> -->
        </transition>
      </div>
    </div>
    <div class="app-foot">sea house company</div>
  </div>
</template>
<script>
import Login from "./components/login";
import Forgot from "./components/forgot";
import { enCode, deCode, getCodeTime } from "@/utils";

export default {
  name: "login",
  components: {
    Login,
    Forgot
  },
  data() {
    return {};
  },
  methods: {
    changeForm() {}
  }
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
