<template>
  <el-select v-model="enterprise" @change="busiSelect" placeholder="请选择企业">
    <el-option v-if="isBusi" label="所有企业" value></el-option>
    <el-option v-for="(item, index) in busiData" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// 导入获取企业的接口文件
import { getBusiData } from "@/api/business.js";

export default {
  // 父组件给子组件 传值
  props: {
    value: {
      default: ""
    },
    // 判断当前的状态是否可以存在所有企业的选项
    isBusi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 企业下拉框双向绑定的数据
      enterprise: this.value,
      // 企业下拉框的数据
      busiData: []
    };
  },
  methods: {
    busiSelect() {
      // 给父组件传值
      this.$emit("input", this.enterprise);
    }
  },
  created() {
    // 页面一加载就获取所有企业，当然也要添加数据获取当前被启用的企业
    getBusiData({ status: 1 }).then(res => {
      // console.log(res);
      // 判断
      if (res.data.code === 200) {
        // 给企业的下拉框的数据赋值
        this.busiData = res.data.data.items;
      }
    });
  },
  // 侦听器
  watch: {
    value: function(val) {
      // 给企业列表赋值
      this.enterprise = val;
    }
  }
};
</script>

<style>
</style>