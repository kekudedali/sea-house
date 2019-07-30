<template>
	<div class="app-login-tip-completion">
		<slot></slot>
		<div class="hover-diff" v-html="hoverContentDisplay" v-if="isHoverContentItem">
		</div>
		<transition name="wai">
			<div class="altc-content" ref="aContent" v-if="openState">
				<div class="altc-title" v-if="isPassword">使用以下项的密码：
				</div>
				<div v-for="(item,index) in dData" class="altc-content-item" :data-index="index" :key="index" @click.capture="selected(item)">
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
        
		try {
			data = this.isPassword ? Object.values(getPasswords()) : Object.values(getAccounts());
		} catch (e) {
			 // 捕捉try里面的错误
			console.log("storage error!");
		}
		return {
			data,
			isOpen: false,
			isHoverContentItem: false,
			hoverContentDisplay: ""
		}
	},
	methods: {
		close(e) {
			this.isOpen = false;
			this.isHoverContentItem = false;
			e && this.$nextTick(() => this.$parent.$parent.inputBlur(e));
		},
		open() {
			this.isOpen = true;
		},
		getContentInfo() {
			let input = this.$el.querySelector("input"),
				width = input.offsetWidth,
				height = input.offsetHeight + 1,
				offset = $(input).offset(),
				top = offset.top + height,
				left = offset.left;
			return { width, top, left }
		},
		position() {
			let { width, top, left } = this.getContentInfo();
			$(this.$refs["aContent"]).offset({ top, left }).css({ width: `${width}px` });
		},
		selected(item) {
			this.$emit("input", this.isPassword ? item.p : item.a);
			this.$emit("selected", item);
			this.close();
		},
		computedContentDisplay(data, isClear) {
			let a = data.a + "",
				aSplits = [],
				value = isClear ? '' : this.value;
			if (!value && !this.isPassword) aSplits = a.split("");
			else if (value && !this.isPassword) {
				aSplits = a.split(value);
				aSplits.splice(1, 0, `</span>${value}<span class="diff-mark">`);
			}
			else if (this.isPassword) {
				let length = data.p.length;
				aSplits = Array.apply(null, Array(length)).map(() => "•");
			}
			this.hoverContentDisplay = `<span class="diff-mark">${aSplits.join("")}</span>`;
			return this.hoverContentDisplay;
		},
		mouseEnter(e, d) {
			 // e是鼠标经过的元素
			let data = d || this.dData[e.currentTarget.dataset.index];
			// 触发父组件的content-visibly方法
			e && this.$emit('content-visibly', data);
			// 下拉框展示或者鼠标移开下拉框就消失
			(this.isOpen || !e) && this.computedContentDisplay(data, !e);
			this.isHoverContentItem = true;
		},
		mouseLeave(e) {
			e && this.$emit('content-hidden');
			this.isHoverContentItem = false;
		},
		addEvent() {
			let input = this.$el.querySelector("input");
			input.addEventListener("focus", this.focus);
			input.addEventListener("blur", this.blur);
			$(this.$el)
				.on("mouseenter", ".altc-content-item", this.mouseEnter)
				.on("mouseleave", ".altc-content-item", this.mouseLeave);
			window.addEventListener("resize", this.resize);
		},
		removeEvent() {
			let input = this.$el.querySelector("input");
			input.removeEventListener("focus", this.focus);
			input.removeEventListener("blur", this.blur);
			$(this.$el).off("mouseenter", ".altc-content-item").off("mouseleave", ".altc-content-item");
			window.removeEventListener("resize", this.resize);
		},
		blur(e) {
			clearTimeout(this.blurTimeMark);
			this.blurTimeMark = setTimeout(() => this.close(e), 200);
		},
		focus() {
			this.open();
			this.$nextTick(() => this.position());
		},
		resize() {
			let input = this.$el.querySelector("input");
			input.blur();
		}
	},
	computed: {
		dData() {
			return this.isPassword
				? this.data
				: this.data.filter(d => (d.a + "").indexOf(this.value) > -1);
		},
		openState() {
			let result = this.isOpen && this.dData.length > 0;
			if (result) this.$nextTick(() => this.position());
			return result;
		}
	},
	watch: {},
	created() {
	},
	mounted() {
		this.addEvent();
	},
	beforeDestroy() {
		clearTimeout(this.blurTimeMark);
		this.removeEvent();
	}
}
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
