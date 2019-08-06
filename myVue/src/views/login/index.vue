<template>
  <div class="app-login">
    <input type="password" class="hidden-element" tabindex="-1" placeholder style="display:none;" />
    <div class="al-main">
      <div class="al-bg"></div>
      <div class="alm-form-wrap">
        <div class="title">sea house</div>
        <transition name="zoom">
          <Login v-if="$route.query.isForgot!=='true'" @change="changeForm(true)" />
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
    // 切换登录表单,登录入口、忘记密码入口
    changeForm(flag) {
      this.removeInputEvent();
      this.$router.replace({
        path: "/login",
        query: { isForgot: flag ? "true" : "false" }
      });
      setTimeout(() => this.addInputEvent());
    },
    // 提交前处理
    beforeSubmit() {
      let result = true,
        els = this.$el.querySelectorAll(".almf-input:not(.no-require)") || [];
      for (let i of els) if (!this.checkElEmptyValue(i)) result = false;
      for (let i of els)
        if (!result || !this.checkElPatternValue(i)) {
          result = false;
          break;
        }
      return result;
    },
    // 检查element的空值
    checkElEmptyValue(el) {
      if (el.value) el.parentNode.classList.remove("is-empty");
      else el.parentNode.classList.add("is-empty");
      return !!el.value;
    },
    checkElPatternValue(e) {
      let result = new RegExp(e.dataset.pattern).test(e.value);
      if (!result) this.$message.error(e.dataset.patternMes);
      return result;
    }
  }
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
