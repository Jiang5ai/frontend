<template>
  <div class="Task">
    <!--  面包屑  -->
    <div style="padding-bottom: 10px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div class="filter-line">
        <el-button @click='showCreate()' type="primary" size="medium ">创建</el-button>
      </div>
      <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading">

        <el-table-column
            prop="name"
            label="名称"
            min-width="10%"
            align="center">
        </el-table-column>

        <el-table-column
            prop="status"
            label="状态"
            min-width="25%"
            align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0"><el-tag type="warning">未执行</el-tag></span>
            <span v-else-if="scope.row.status === 1"><el-tag type="success">执行中</el-tag></span>
            <span v-else-if="scope.row.status === 2"><el-tag type="info">执行完成</el-tag></span>
            <span v-else><el-tag type="danger">排队中</el-tag></span>
          </template>
        </el-table-column>
        <!--       操作栏        -->
        <el-table-column
            fixed="right"
            label="操作"
            min-width="15%">
          <template slot-scope="scope">
            <el-button @click="runTask(scope.row)" type="text" size="small">运行</el-button>
            <el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteTask(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="foot-page">
        <!--   分页     -->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5,10, 20, 30, 40]"
            :page-size=query.size
            layout="total, sizes, prev, pager, next, jumper"
            :total=total>
        </el-pagination>
      </div>
    </el-card>
    <TaskDialog :showStatus="showDialog" @cancel="cancelTask" :tid=taskId></TaskDialog>
  </div>
</template>


<script>
import TaskApi from "../../request/task"
import TaskDialog from "@/components/Task/TaskDialog";


export default {
  name: "testTask",
  // eslint-disable-next-line vue/no-unused-components
  components: {TaskDialog},
  data() {
    return {
      loading: true,
      showDialog: false,
      tableData: [],
      taskId:0,
      total: 0,
      query: {
        page: 1,
        size: 5,
      }
    }
  },
  methods: {
    //运行任务
    async runTask(row){
      const resp = await TaskApi.runTask(row.id)
      if (resp.success){
        this.$message.success("运行成功")
        this.initTask()
      }else{
        this.$message.error("运行失败")
      }
    },
    //显示编辑窗口
    showEdit(row) {
      console.log("row", row)
      this.taskId = row.id
      this.showDialog = true

    },
    //修改每页显示个数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.size = val
      this.initTask()
    },
    //当前第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.page = val
      this.initTask()
    },
    //初始化任务列表
    async initTask() {
      const resp = await TaskApi.getTasks(this.query)
      console.log("获取任务列表resp------>", resp)
      if (resp.success === true) {
        this.tableData = resp.data.taskList
        this.total = resp.data.total
      } else {
        this.$message.error(resp.error.message)
      }
      this.loading = false
    },
    //删除任务
    async deleteTask(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.taskId = row.id
        const resp = await TaskApi.deleteTask(this.taskId)
        console.log("删除任务---->",resp)
        if (resp.success === true) {
          this.$message.success("删除成功")
          // 为了在删除最后一页的最后一条数据时能成功跳转回最后一页的上一页
          let deleteAfterPage = Math.ceil((this.total - 1) / this.query.size)
          let currentPage = this.query.page > deleteAfterPage ? deleteAfterPage : this.query.page
          this.query.page = currentPage < 1 ? 1 : currentPage
          await this.initTask(this.query)
        } else {
          this.$message.error(resp.error.message)
        }
      })
    },
    //接收子组件的回调
    cancelTask() {
      console.log("子组件把自己关掉了")
      this.showDialog = false
      this.taskId = 0
    },
    //显示创建窗口
    showCreate() {
      this.showDialog = true
      console.log("显示创建窗口")
    },
  },
  mounted() {
    this.initTask()
  }
}
</script>

<style scoped>
.filter-line {
  float: right
}

.foot-page {
  margin-top: 70px;
}
</style>