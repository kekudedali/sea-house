<template>
  <div class="app-login-tip-completion">
    <slot></slot>
    <div class="hover-diff" v-html="hoverContentDisplay" v-if="isHoverContentItem"></div>
    <transition name="wai">
      <div class="altc-content" ref="aContent" v-if="openState">
        <div class="altc-title" v-if="isPassword">使用以下项的密码：</div>
        <div
          v-for="(item,index) in dData"
          class="altc-content-item"
          :data-index="index"
          :key="index"
          @click.capture="selected(item)"
        >
          <span>{{item.a}}</span>
          <span class="altc-origin" v-if="isPassword">{{item.o}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { getAccounts, getPasswords } from "@/store/account";
import { deCode, enCode } from "@/utils";
import $ from "jquery";

export default {
  props: {
    value: String,
    isPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let data = [];
    // 1
    try {
      // 是否是密码框是密码框显示用户名 网址 和提供密码（不显示），不是密码框就只获取用户名
      data = this.isPassword
        ? Object.values(getPasswords())
        : Object.values(getAccounts());
        // debugger
    } catch (e) {
      // 捕捉try里面的错误
      console.log("storage error!");
    }
    return {
      data,
      isOpen: false,
      isHoverContentItem: false,
      hoverContentDisplay: ""
    };
  },
  methods: {
    // 6
    close(e) {
      this.isOpen = false;
      // 提示框消失
      this.isHoverContentItem = false;
      // e && this.$nextTick(() => this.$parent.$parent.inputBlur(e));
    },
    // 1
    open() {
      this.isOpen = true;
    },
    // 4
    getContentInfo() {
      // 获取输入框生成提示框
      // 提示框的宽 = 输入框的宽
      // 提示框的顶部位置 = 提示框的高 +提示框的顶边距
      // 提示框的左边 = 输入框的左边距
      let input = this.$el.querySelector("input"),
        width = input.offsetWidth,
        height = input.offsetHeight + 1,
        offset = $(input).offset(),
        top = offset.top + height,
        left = offset.left;
      return { width, top, left };
    },
    // 3
    position() {
      // width = this.getContentInfo().width
      let { width, top, left } = this.getContentInfo();
      // 给aContent设置上边距和左边距和宽度
      $(this.$refs["aContent"])
        .offset({ top, left })
        .css({ width: `${width}px` });
        // debugger
    },
    // 5
    selected(item) {
      this.$emit("input", this.isPassword ? item.p : item.a);
      // 给父组件的selected方法传递选中的值
      this.$emit("selected", item);
      // 选中后关闭提示框
      this.close();
    },
    // 3
    computedContentDisplay(data, isClear) {
      // 非密码框data.a -> netcaradmin
      // 密码框 data.a -> netcaradmin  data.o -> http://taxi.123cx.com:8081 data.p->123456
      let a = data.a + "",
        aSplits = [],
        value = isClear ? "" : this.value;
      // 如果用户名提示框和密码提示框都没有值（split将字符串分割成数组）
      if (!value && !this.isPassword) aSplits = a.split("");
      // 如果户名提示框有值就把用户名放入户名输入框内占位
      else if (value && !this.isPassword) {
        aSplits = a.split(value);
        aSplits.splice(1, 0, `</span>${value}<span class="diff-mark">`);
      // 如果户名密码提示框有值就把密码相关放入密码输入框内占位
      } else if (this.isPassword) {
        let length = data.p.length;
        aSplits = Array.apply(null, Array(length)).map(() => "•");
      }
      this.hoverContentDisplay = `<span class="diff-mark">${aSplits.join("")}</span>`;
      // debugger
      return this.hoverContentDisplay;
    },
    // 2
    mouseEnter(e, d) {
      // e是鼠标经过的元素
      //  e.currentTarget.dataset.index 是 this.dData的第0项
      let data = d || this.dData[e.currentTarget.dataset.index];
      // 触发父组件的content-visibly方法,让密码提示框一出来用户提示框就收回去
      e && this.$emit("content-visibly", data);
      // 下拉框展示或者鼠标移开下拉框就消失
      // data是账户名或者是密码相关信息
      (this.isOpen || !e) && this.computedContentDisplay(data, !e);
      // 打开提示框
      this.isHoverContentItem = true;
    },
    // 6
    mouseLeave(e) {
      // 鼠标离开触发父组件的内容隐藏
      e && this.$emit("content-hidden");
      // 提示框关闭
      this.isHoverContentItem = false;
    },
    // 1
    addEvent() {
      // 获取input框
      let input = this.$el.querySelector("input");
      input.addEventListener("focus", this.focus);
      input.addEventListener("blur", this.blur);
      // 鼠标经过事件
      $(this.$el)
        .on("mouseenter", ".altc-content-item", this.mouseEnter)
        .on("mouseleave", ".altc-content-item", this.mouseLeave);
      window.addEventListener("resize", this.resize);
      // debugger
    },
    // 6
    removeEvent() {
      let input = this.$el.querySelector("input");
      input.removeEventListener("focus", this.focus);
      input.removeEventListener("blur", this.blur);
      // 结束鼠标经过事件
      $(this.$el)
        .off("mouseenter", ".altc-content-item")
        .off("mouseleave", ".altc-content-item");
      window.removeEventListener("resize", this.resize);
    },
    // 6
    blur(e) {
      clearTimeout(this.blurTimeMark);
      this.blurTimeMark = setTimeout(() => this.close(e), 200);
    },
    // 2
    focus() {
      this.open();
      this.$nextTick(() => this.position());
    },
    // 6
    resize() {
      let input = this.$el.querySelector("input");
      input.blur();
    }
  },
  computed: {
    // 1
    dData() {
      // 密码框就返回密码相关，不是就返回用户名
      return this.isPassword
        ? this.data
        : this.data.filter(d => (d.a + "").indexOf(this.value) > -1);
    },
    // 2
    openState() {
      // 鼠标经过且有数据就展开提示框
      let result = this.isOpen && this.dData.length > 0;
      if (result) this.$nextTick(() => this.position());
      // debugger
      return result;
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.addEvent();
    getPasswords();
  },
  beforeDestroy() {
    clearTimeout(this.blurTimeMark);
    this.removeEvent();
  }
};
</script>
<style lang="scss">
//	flex: 1; == .item {flex-grow: 1;    flex-shrink: 1;    flex-basis: 0%;}
// flex-grow:设置当父元素的宽度大于所有子元素的宽度的和时（即父元素会有剩余空间），子元素如何分配父元素的剩余空间。
// flex-shrink:当父元素的宽度小于所有子元素的宽度的和时（即子元素会超出父元素），子元素如何缩小自己的宽度的。
// flex-basis:width。
.app-login-tip-completion {
  flex: 1;
  display: flex;
  position: relative;
  .wai-enter-active,
  .wai-leave-active {
    max-height: 100vh;
    min-height: 0 !important;
    transform-origin: center top;
    transition: transform 0.2s ease, opacity 0.2s ease;
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }

  .wai-enter,
  .wai-leave-to {
    max-height: 0;
    min-height: 0 !important;
    transform-origin: center top;
    transition: transform 0.2s ease, opacity 0.2s ease;
    transform: scale3d(1, 0, 1);
    opacity: 0;
  }
  .hover-diff {
    position: absolute;
    width: 260px;
    top: 13px;
    left: 31px;
    font-size: 14px;
    background-color: white;
    .diff-mark {
      background-color: #1395f6;
      color: white;
    }
  }
  .altc-content {
    overflow-y: auto;
    box-shadow: 0 0 6px 0 rgba(117, 145, 194, 0.64);
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 10px 0;
    font-size: 12px;
    max-height: 260px;
    .altc-title {
      padding: 0 10px 5px;
    }
    .altc-content-item {
      padding: 0 10px;
      height: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #e4e8f1;
      }
      .altc-origin {
        color: #7f91a4;
      }
    }
  }
}
</style>
