<template>
  <el-container class="ind-container">
    <el-header class="ind-header">
      <div class="left">
        <i
          @click="isCollapse = !isCollapse"
          class="icon"
          :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'"
        ></i>
        <img src="./images/index-logo.png" alt />
        <span class="tit">Face To Face</span>
      </div>
      <div class="right">
        <img :src="$store.state.avatar" alt />
        <span class="name">你好 {{$store.state.username}}</span>
        <el-button @click="btnLogout" type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="ind-aside">
        <!-- 侧边导航  :router 允许跳转路由 -->
        <el-menu
          :router="true"
          :collapse="isCollapse"
          default-active="/index/chart"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-office-building"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="ind-main">
        <!-- 子路由嵌套的路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入抽取后的接口方法库
import { logout } from "@/api/index.js";
// 导入抽取后的token文件
import { removeToken, getToken } from "@/utilis/token.js";

export default {
  data() {
    return {
      //   导航菜单默认展开
      isCollapse: false
    };
  },
  methods: {
    // 退出按钮的点击事件
    btnLogout() {
      // 弹出确认框
      this.$confirm(
        this.$store.state.username + " -- 此操作会退出整个系统，你确定这样做吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          // 调用退出登录的接口
          logout().then(() => {
            //   console.log(res);
            // 先清除token  调用清除token的方法
            removeToken();
            // 跳转到登录页
            this.$router.push("/login");
            // 还要把vuex中的数据删除掉
            this.$store.commit('usernameChange','');
            this.$store.commit('avatarChange','');
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "谢谢你的认可，爱你哦~~"
          });
        });
    }
  },
  // 最早执行的钩子函数
  beforeCreate() {
    // 判断用户是否登录就直接访问主页面，如果没登录需要先登录并跳转到登录页
    if (getToken() == null) {
      // 说明没登录
      // 消息提示，并跳转到登录页
      this.$message.error("请先登录才可以访问主页");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less">
.ind-container {
  height: 100%;
  .ind-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
      i.icon {
        font-size: 26px;
        margin-right: 18px;
        transform: rotateX(180deg);
        transition: all 1s;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span.tit {
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      span.name {
        height: 15px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
        margin-right: 28px;
      }
    }
  }
}
.ind-aside .el-menu {
  height: 100%;
}
// 导航菜单的动画切换
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.ind-main {
  background-color: peru;
}
</style>