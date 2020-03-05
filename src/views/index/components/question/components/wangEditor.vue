<template>
  <div class="editorBox">
    <!-- 菜单栏 -->
    <div ref="toolbar" class="toolbar"></div>
    <!-- 内容区 -->
    <div ref="content" class="content">
      <p v-html="value"></p>
      <!-- <i>请在这里输入</i> -->
    </div>
  </div>
</template>

<script>
// 导入wangEditor插件
import wangEditor from "wangeditor";

export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    let editor = new wangEditor(this.$refs.toolbar, this.$refs.content); // 两个参数也可以传入 elem 对象，class 选择器
    // 监听富文本值改变事件
    // function声明的函数，里面的this默认是window,
    // 所以我们这里不要用function，因为它会改变this指向
    // 用箭头函数就不会改变
    editor.customConfig.onchange = html => {
      // 给父组件传值
      this.$emit("input", html);
    };
    editor.create();
  }
};
</script>

<style>
.toolbar {
  width: 74%;
  border: 1px solid #ccc;
}
.content {
  width: 74%;
  border: 1px solid #ccc;
  height: 50px;
  margin-top: -1px;
}
.editorBox {
  margin-top: 60px;
  position: relative;
  left: 36px;
}
</style>