<template>
  <div class="alm-form">
    <p class="alm-title">用户登录</p>
    <tip-completion class="almf-input-wrap" v-model="username" ref="username" @selected="selected">
      <i class="iconfont icon-shouji" style="font-size:20px;"></i>
      <input
        placeholder="手机号码"
        autocomplete="off"
        class="almf-input s"
        maxlength="11"
        v-model="username"
        ref="phone"
        @keyup.enter="submit"
      />
      <span class="empty-mes right">手机号码不能为空</span>
    </tip-completion>
    <tip-completion
      v-model="password"
      :is-password="true"
      @content-visibly="contentVisiblyAccount"
      @content-hidden="contentHiddenAccount"
      @selected="selected"
      class="almf-input-wrap"
    >
      <i class="iconfont icon-securityCode-b" style="font-size:23px;"></i>
      <input
        placeholder="密码"
        class="almf-input s"
        type="password"
        autocomplete="new-password"
        v-model="password"
        @keyup.enter="submit"
      />
      <span class="empty-mes right">密码不能为空</span>
    </tip-completion>
    <div class="almf-input-wrap">
      <i class="iconfont icon-securityCode-b" style="font-size:20px"></i>
      <input placeholder="验证码" class="almf-input" v-model="code" @keyup.enter="submit" />
      <img
        :src="checkCodeImg+'?count='+imageCodeCount"
        class="no-transition"
        alt="验证码异常"
        @click="imageCodeCount = ++imageCodeCount"
      />
      <span class="empty-mes code">验证码不能为空</span>
    </div>
    <el-button class="almf-submit" v-waves type="primary" :loading="isLoading" @click="submit">登录</el-button>
    <div class="almf-foot">
      <el-checkbox v-model="isRemember">记住密码</el-checkbox>
      <a href="javascript:void(0);" @click="change()">忘记密码</a>
    </div>
  </div>
</template>
<script>
import loginApi from "@/api/common/login";
import { getUrlDomain } from "@/utils";
import TipCompletion from "./tip-completion";
import { saveAccount, savePassword } from "@/store/account";
import Cookies from "js-cookie";
import { baseUrl } from "@/utils/urls";

export default {
  components: { TipCompletion },
  data() {
    return {
      username: "",
      password: "",
      code: "",
      checkCodeImg: baseUrl + "/auth/captcha", //图形验证码图
      imageCodeCount: 0,
      isRemember: true,
      isLoading: false
    };
  },
  methods: {
    selected(item) {
      if (item.p) {
        this.username = item.a;
        this.$nextTick(() =>
          this.$refs["username"].close({
            target: this.$refs["phone"]
          })
        );
      }
    },
    // 登录提交
    submit() {
      if (!this.isLoading && this.$parent.beforeSubmiy()) {
        this.startLoading();
        // 将axios默认的contenttype变为x-www-form-urlencoded（格式化参数）;
        var formData = new URLSearchParams();
        formData.append("account", this.username);
        // 求字符串加密的代码，就是EncryptString(Source, Key: pchar): pchar;这种
        formData.append("password", encryptedString(bodyRSA(), this.password));
        formData.append("captcha", this.code);
        loginApi
          .login(formData)
          .then(({ data: { data, result, resultDesc } }) => {
            this.endLoading();
            this.submitSuccess(data, result, resultDesc);
          })
          .catch(() => {
            this.endLoading();
            this.imageCodeCount = ++this.imageCodeCount;
          });
      }
    },
    submitSuccess(data, result, resultDesc) {
      let isOk = result === "true";
      this.$message[isOk ? "success" : "error"](resultDesc);
      if (isOk) {
        let redirectUrl = this.$route.query["redirect"],
          origin = window.location.origin,
          password = this.isRemember ? this.password : "",
          domain = getUrlDomain(redirectUrl || origin);
        savePassword(this.username, password, domain);
        saveAccount(this.username);
        if (data) {
          Cookies.set("userInfo", JSON.stringify(data));
          this.$store.dispatch("SetUserInfo");
        }
        window.location.href = redirectUrl ? redirectUrl : origin;
      } else {
        this.imageCodeCount = ++this.imageCodeCount;
      }
    },
    // @content-visibly（子组件通过这个触发父组件）="contentVisiblyAccount"（父组件里面的方法）
    contentVisiblyAccount(d) {
      this.$refs["username"].mouseEnter(null, d);
    },
    contentHiddenAccount() {
      this.$refs["username"].mouseLeave();
    },
    // 加载
    startLoading() {
      this.isLoading = true;
    },
    endLoading() {
      this.isLoading = false;
    },
    // 忘记密码
    chang() {
      this.$emit("change", true);
    }
  }
};
</script>
