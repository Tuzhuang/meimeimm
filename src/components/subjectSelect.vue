<template>
  <div>
    <el-select v-model="subject" @change="subSelect" placeholder="请选择学科">
      <el-option v-if="isSub" label="所有学科" value></el-option>
      <el-option v-for="(item, index) in subData" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
// 导入获取学科的接口文件
import { getSubData } from "@/api/subject.js";

export default {
  name: "subjectSelect",
  props: {
    value: {
      default: ""
    },
    // 判断当前的状态是否可以存在所有学科
    isSub: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 选择学科的双向绑定数据
      subject: this.value,
      // 下拉框的数据源
      subData: []
    };
  },
  methods: {
    subSelect() {
      // 给父组件传值
      this.$emit("input", this.subject);
    }
  },
  created() {
    // 页面一加载先获取所有学科  要获取当前模式为启用的学科
    getSubData({ status: 1 }).then(res => {
      // console.log(res);
      // 判断
      if (res.data.code === 200) {
        // 给学科下拉框的数据赋值
        this.subData = res.data.data.items;
      }
    });
  },
  // 侦听器
  watch: {
    "value":function(val){
      // 给学科列表赋值
      this.subject = val;
    }
  }
};
</script>

<style>
</style>