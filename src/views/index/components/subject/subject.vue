<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <!-- 重置表单的时候要给表单的每一项都加一个prop属性 -->
      <el-form
        ref="formInline"
        :inline="true"
        :model="subjectForm"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="subjectForm.rid" placeholder="学科编号"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="long" v-model="subjectForm.name" placeholder="学科名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="subjectForm.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="long" v-model="subjectForm.status" placeholder="状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="subjectSearch" style="margin-left:50px" type="primary">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="subjectClear" style="margin-left:20px">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="subjectAdd"
            style="margin-left:20px"
            type="primary"
            icon="el-icon-plus"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容部分卡片 -->
    <el-card class="box-card">
      <!-- 表格部分 -->
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="220"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 使用过滤器修改时间格式 -->
            {{scope.row.create_time | filterTime}}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <!-- 根据用户权限来判断，当前是否可以操作这个权限 -->
        <el-table-column label="操作" v-if="['超级管理员','管理员','老师'].includes($store.state.role)">
          <template slot-scope="scope">
            <el-button @click="subjectEdit(scope.row)" type="primary" size="mini" round>编辑</el-button>
            <el-button
              @click="subjectStatus(scope.row.id)"
              type="warning"
              size="mini"
              round
            >{{scope.row.status === 1?'禁用':'启用'}}</el-button>
            <!-- 同上 -->
            <el-button v-if="['超级管理员','管理员'].includes($store.state.role)" @click="subjectDel(scope.row.id)" type="danger" size="mini" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页部分 -->
      <el-pagination
        class="sub-Pagin"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增学科对话框 -->
    <!-- <subjectAdd ref="subAdd"></subjectAdd> -->
    <!-- 编辑学科对话框 -->
    <!-- <subjectEdit ref="subEdit"></subjectEdit> -->
    <!-- 将新增框和编辑框合为一体 -->
    <subjectDialog ref="subDialog"></subjectDialog>
  </div>
</template>

<script>
// 导入接口地址
import { getSubData, subStatus, subjectDel } from "@/api/subject";
// 导入其他子组件
// import subjectAdd from "./components/subjectAdd";
// import subjectEdit from "./components/subjectEdit";
import subjectDialog from "./components/subjectDialog";

export default {
  // 注册组件
  components: {
    // subjectAdd,
    // subjectEdit
    subjectDialog
  },
  name: "subject",
  data() {
    return {
      // 顶部卡片内容的数据源
      subjectForm: {},
      // 表格的数据源
      tableData: [],
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 分页数据总条数
      total: 0,
      // 记录上次点击的是哪一行的数据
      oldItem: null
    };
  },
  methods: {
    // 当前页码改变时触发的事件
    currentChange(page) {
      // 把当前点击的页码赋值给当前页码
      this.pagenum = page;
      // 重新请求数据
      this.getDataList();
    },
    // 页容量改变时触发的事件
    sizeChange(size) {
      // 把当前选择的页容量赋值给当前页容量
      this.pagesize = size;
      // 先把当前页码设置为1再请求数据
      this.pagenum = 1;
      // 重新请求数据
      this.getDataList();
    },
    // 修改用户状态的点击事件
    subjectStatus(id) {
      // 请求接口修改状态
      subStatus(id).then(res => {
        // console.log(res);
        // 判断
        if (res.data.code === 200) {
          this.$message.success("用户状态设置成功");
          // 重新获取数据
          this.getDataList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 把获取表格数据的方法封装成函数
    getDataList() {
      getSubData({
        page: this.pagenum,
        limit: this.pagesize,
        // 运用展开符遍历数据
        ...this.subjectForm
      }).then(res => {
        // console.log(res);
        // 给表格的数据源赋值
        this.tableData = res.data.data.items;
        // 给分页数据总条数赋值
        this.total = res.data.data.pagination.total;
      });
    },
    // 筛选按钮的点击事件
    subjectSearch() {
      // 先把当前页设置为1
      this.pagenum = 1;
      // 请求数据
      this.getDataList();
    },
    // 清除按钮的点击事件
    subjectClear() {
      // 重置表单即可
      this.$refs.formInline.resetFields();
      // 把当前页设置为第一页,然后再请求数据
      this.pagenum = 1;
      this.getDataList();
    },
    // 新增学科的点击事件
    subjectAdd() {
      // 让对话框显示出来
      this.$refs.subDialog.dialogFormVisible = true;
      // 把子组件对话框的isAdd改为true
      this.$refs.subDialog.isAdd = true;
    },
    // 编辑学科的点击事件
    subjectEdit(item) {
      // 让编辑对话框显示出来
      this.$refs.subDialog.dialogFormVisible = true;
      // 把子组件里面的isAdd改为false
      this.$refs.subDialog.isAdd = false;
      // 要做一个判断，判断当前点击的是第一次点击的话就赋值，如果不是的话就不赋值
      if (item != this.oldItem) {
        // 给编辑面板的数据赋值  防止地址传递数据双向修改，所以重新拷贝一个新的对象
        this.$refs.subDialog.form = { ...item };
        // 再给当前oldItem赋值
        this.oldItem = item;
      }
    },
    // 删除按钮的点击事件
    subjectDel(id) {
      // 弹出确认框
      this.$confirm("此操作将永久删除该学科, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 请求接口删除学科
          subjectDel({ id: id }).then(res => {
            // console.log(res);
            // 判断
            if (res.data.code === 200) {
              this.$message.success("删除学科成功");
              // 判断当前删除的时候是不是最后一条，如果是的话就让当前页减一
              if (this.tableData.length === 1 && this.pagenum !== 1) {
                this.pagenum--;
              }
              // 重新请求数据
              this.getDataList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message.info("感谢你还没有删掉我，谢谢您，爱你~哦");
        });
    }
  },
  // 页面一加载的时候就请求接口获取数据
  created() {
    // 调用获取表格数据的方法
    this.getDataList();
  }
};
</script>

<style lang="less">
.box-card {
  margin-bottom: 20px;
  .short {
    width: 180px;
  }
  .long {
    width: 230px;
  }
}
.sub-Pagin {
  margin-top: 20px;
  text-align: center;
}
</style>