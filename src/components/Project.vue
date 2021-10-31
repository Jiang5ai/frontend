<template>
  <div class="project">
    <div style="padding-bottom: 10px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <el-button @click="initProject()">默认按钮</el-button>
      <el-table
          :data="tableData"
          style="width: 100%">

        <el-table-column
            prop="date"
            label="日期"
            min-width="30%">
        </el-table-column>

        <el-table-column
            prop="name"
            label="姓名"
            min-width="30%">
        </el-table-column>

        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
import ProjectApi from "../request/project"

export default {
  name: "Project",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
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
    }
  }
}

</script>

<style scoped>

</style>