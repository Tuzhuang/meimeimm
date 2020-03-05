<template>
  <el-cascader v-model="city" :options="options" :props="{ expandTrigger: 'hover',value:'label' }" @change="handleChange"></el-cascader>
</template>

<script>
// 导入级联框城市数据
import { regionDataPlus } from "element-china-area-data";

export default {
  props: {
    value: {
      dafault: ""
    }
  },
  data() {
    return {
      //   城市级联框的value值
      city: this.value,
      // 级联框的数据源
      options: regionDataPlus
    };
  },
  methods:{
      handleChange(){
          // 给父组件传值
          this.$emit('input',this.city);
      }
  }
};
</script>

<style>
</style>