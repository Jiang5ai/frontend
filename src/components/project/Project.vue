<template>
  <div class="project">
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
            min-width="20%">
        </el-table-column>

        <el-table-column
            prop="describe"
            label="描述"
            min-width="25%">
        </el-table-column>

        <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="30%">
        </el-table-column>

        <el-table-column
            prop="status"
            label="状态"
            min-width="25%">
          <template slot-scope="scope">
            <span v-if="scope.row.status === true"><el-tag type="success">开启</el-tag></span>
            <span v-else><el-tag type="danger">关闭</el-tag></span>
          </template>
        </el-table-column>
        <!--       操作栏        -->
        <el-table-column
            fixed="right"
            label="操作"
            min-width="15%">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteProject(scope.row)" type="text" size="small">删除</el-button>
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
    <!--showDialog=true 展示组件    -->
    <projectDialog :showStatus="showDialog" @cancel="cancelProject" :pid=projectId></projectDialog>

  </div>
</template>

<script>
import ProjectApi from "../../request/project"
import projectDialog from "@/components/project/projectDialog";

export default {
  name: "Project",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    //新增项目弹窗组件
    projectDialog
  },
  data() {
    return {
      loading: true,
      projectId: 0,
      tableData: [],
      showDialog: false,
      total: 0,
      query: {
        page: 1,
        size: 5,
      }
    }
  },
  // 调用方法
  methods: {
    // 获取项目列表
    async initProject() {
      const resp = await ProjectApi.getProjects(this.query)
      // console.log("获取项目列表resp-->", resp)
      if (resp.success === true) {
        this.tableData = resp.data.projectList
        this.total = resp.data.total

      } else {
        this.$message.error(resp.error.message);
      }
      this.loading=false
    },
    //删除项目接口调用
    async deleteProject(row) {
      this.projectId = row.id
      const resp = await ProjectApi.deleteProject(this.projectId)
      if (resp.success === true) {
        this.$message.success("删除成功")
        await this.initProject()
      } else {
        this.$message.error(resp.error.message)
      }
    },
    //显示创建窗口
    showCreate() {
      this.showDialog = true
      console.log("显示创建窗口")
    },
    //显示编辑窗口
    showEdit(row) {
      console.log("row", row)
      this.projectId = row.id
      this.showDialog = true

    },
    //接收子组件的回调
    cancelProject() {
      console.log("子组件把自己关掉了")
      this.showDialog = false
      this.projectId = 0
    },
    //修改每页显示个数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.size = val
      this.initProject()
    },
    //当前第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.page = val
      this.initProject()
    }
  },
  created() {
    console.log("created---自动被执行")
    console.log("父组件---->", this.showDialog)
  },
  mounted() {
    console.log("mounted---自动被执行")
    //调用获取项目列表接口方法
    this.initProject()
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