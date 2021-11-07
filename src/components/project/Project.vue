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
          style="width: 100%">

        <el-table-column
            prop="name"
            label="名称"
            min-width="30%">
        </el-table-column>

        <el-table-column
            prop="describe"
            label="描述"
            min-width="45%">
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--showDialog=true 展示组件    -->
    <projectDialog :showStatus="showDialog" @cancel="cancelProject"></projectDialog>
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
      tableData: [],
      showDialog: false,
      query: {
        page: 1,
        size: 5,
      }
    }
  },
  // 调用方法
  methods: {
    async initProject() {
      const resp = await ProjectApi.getProjects(this.query)
      console.log("resp-->", resp)
      if (resp.success === true) {
        this.tableData = resp.data.projectList
      } else {
        this.$message.error(resp.error.message);
      }
    },
    //显示创建窗口
    showCreate() {
      this.showDialog = true
      console.log("显示创建窗口")
    },
   //接收子组件的回调
    cancelProject(){
      console.log("自组件把自己关掉了")
      this.showDialog= false
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
</style>