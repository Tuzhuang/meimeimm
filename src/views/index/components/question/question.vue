<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="myCard">
      <el-form
        ref="formInline"
        :inline="true"
        :model="formInline"
        class="demo-form-inline quesFormIn"
      >
        <el-form-item label="学科" prop="subject">
          <!-- 将学科列表封装成全局的组件 -->
          <subjectSelect :isSub="true" v-model="formInline.subject"></subjectSelect>
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="所有阶段" value></el-option>
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <!-- 将企业列表封装成全局的组件 -->
          <businessSelect :isBusi="true" v-model="formInline.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="所有题型" value></el-option>
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="所有难度" value></el-option>
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="formInline.username" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="所有状态" value></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker v-model="formInline.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="myTitle" prop="title">
          <el-input class="title" v-model="formInline.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button @click="getQuesData" type="primary">搜索</el-button>
          <el-button @click="clear" type="primary">清除</el-button>
          <el-button @click="quesAdd" type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容卡片 -->
    <el-card>
      <!-- 表格部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="题目" width="180">
          <template slot-scope="scope">
            <p v-html="scope.row.title"></p>
          </template>
        </el-table-column>
        <el-table-column label="学科 · 阶段" width="180">
          <template slot-scope="scope">{{scope.row | filterSub}}</template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">单选</span>
            <span v-else-if="scope.row.type === 2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click="quesEdit(scope.row)" type="primary" size="mini" plain round>编辑</el-button>
            <el-button @click="quesStatus(scope.row.id)" type="warning" size="mini" plain round>{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button @click="quesDel(scope.row.id)" type="danger" size="mini" plain round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页部分 -->
      <el-pagination
        background
        class="myPagin"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 使用表单的对话框 -->
    <questionDialog ref="quesDialog"></questionDialog>
  </div>
</template>

<script>
// 导入获取题库列表的接口文件
import { getQuesData, quesStatus, quesRemove } from "@/api/question.js";
// 导入新增表单子组件
import questionDialog from "./components/questionDialog.vue";

export default {
  name: "question",
  // 注册使用
  components: {
    questionDialog
  },
  data() {
    return {
      // 行内表单的数据源
      formInline: {},
      // 表格数据源
      tableData: [],
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 总页数
      total: 0,
      // 用来判断当前点击的是不是上一次点击的哪一行
      oldItem: null
    };
  },
  methods: {
    // 页容量改变时触发的事件
    sizeChange(size) {
      // 给页容量赋值
      this.pagesize = size;
      // 重新获取数据
      this.getQuesData();
    },
    // 当前页改变时触发的事件
    currentChange(page) {
      // 给当前页赋值
      this.pagenum = page;
      // 重新请求数据
      this.getQuesData();
    },
    // 重新请求数据的方法
    getQuesData() {
      getQuesData({
        page: this.pagenum,
        limit: this.pagesize,
        ...this.formInline
      }).then(res => {
        // console.log(res);
        // 判断
        if (res.data.code === 200) {
          // 给表格数据源赋值
          this.tableData = res.data.data.items;
          // 给分页总页数赋值
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // 编辑按钮的点击事件
    quesEdit(item) {
      // 弹出对话框
      this.$refs.quesDialog.dialogFormVisible = true;
      // 把判断是否是新增的bool值改为false
      this.$refs.quesDialog.isAdd = false;
      // 给对话框的内容赋值
      // 赋值之前判断一下，是不是之前点击的哪一行，如果是的话就不赋值，不是的话才赋值
      if (item != this.oldItem) {
        this.$refs.quesDialog.form = { ...item };
        // 赋值的时候因为城市需要的诗句是数组格式，但是获取到的是字符串格式，所以需要转换一下
        this.$refs.quesDialog.form.city = this.$refs.quesDialog.form.city.split(
          ","
        );
        // 多选题同样的问题
        this.$refs.quesDialog.form.multiple_select_answer = this.$refs.quesDialog.form.multiple_select_answer.split(
          ","
        );
      }
    },
    // 新增的点击事件
    quesAdd() {
      // 弹出对话框
      this.$refs.quesDialog.dialogFormVisible = true;
      // 把判断是否是新增的bool值改为true
      this.$refs.quesDialog.isAdd = true;
    },
    // 行内表单清空按钮的点击事件
    clear() {
      // 清空表单
      this.$refs.formInline.resetFields();
      // 重新请求数据
      this.getQuesData();
    },
    // 状态修改的点击事件
    quesStatus(id) {
      quesStatus({ id }).then(res => {
        // console.log(res);
        // 判断
        if (res.data.code === 200) {
          this.$message.success("题目状态设置成功");
          // 重新请求数据
          this.getQuesData();
        } else {
          // 错误的消息提示
          this.$message.error(res.data.message);
        }
      });
    },
    // 删除按钮的点击事件
    quesDel(id) {
      // 弹出对话框，询问是否删除
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          quesRemove({ id }).then(res => {
            // console.log(res);
            // 判断
            if (res.data.code === 200) {
              this.$message.success("题目删除成功");
              // 重新请求数据
              this.getQuesData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "谢谢你留下了我"
          });
        });
    }
  },
  created() {
    // 页面一加载就请求题库的列表数据
    this.getQuesData();
  },
  // 过滤器
  filters: {
    filterSub: val => {
      let stepName = "";
      if (val.step === 1) {
        stepName = "初级";
      } else if (val.step === 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }
      return val.subject_name + " -- " + stepName;
    }
  }
};
</script>

<style lang="less">
.myCard {
  padding-left: 20px;
  margin-bottom: 21px;
  .quesFormIn {
    .el-form-item:not(.button) {
      box-sizing: border-box;
      margin-right: 40px;
      // width: 200px;
      .el-input__inner {
        width: 220px;
        margin-left: 31px;
      }
      .el-input__prefix {
        left: 36px;
      }
    }
    .myTitle {
      width: 625px !important;
      .el-input__inner {
        width: 552px !important;
      }
    }
  }
}
.myPagin {
  text-align: center;
  margin-top: 31px;
}
</style>