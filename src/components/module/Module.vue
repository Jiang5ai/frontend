<template>
  <div class="module">
    <div style="padding-bottom: 10px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>模块管理</el-breadcrumb-item>
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
            label="模块名称"
            min-width="25%">
        </el-table-column>

        <el-table-column
            prop="module_ForeignKey_project"
            label="关联项目名称"
            min-width="25%">
        </el-table-column>

        <el-table-column
            prop="describe"
            label="描述"
            min-width="20%">
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
        操作栏
        <el-table-column
            fixed="right"
            label="操作"
            min-width="15%">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteModule(scope.row)" type="text" size="small">删除</el-button>
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
    <moduleDialog :showStatus="showDialog" @cancel="cancelModule" :mid=moduleId></moduleDialog>

  </div>
</template>


<script>
import ModuleApi from "../../request/module"
import moduleDialog from "@/components/module/moduleDialog";

export default {
  name: "Module",
  components: {
    //新增项目弹窗组件
    // eslint-disable-next-line vue/no-unused-components
    moduleDialog
  },
  data() {
    return {
      moduleId: 0,
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
    // 获取模块列表
    async initModule() {
      const resp = await ModuleApi.getModules(this.query)
      console.log("获取模块列表resp-->", resp)
      if (resp.success === true) {
        this.tableData = resp.data.moduleList
        this.total = resp.data.total
      } else {
        this.$message.error(resp.error.message);
      }
    },
    //接收子组件的回调
    cancelModule() {
      console.log("子组件把自己关掉了")
      this.showDialog = false
      // 重置moduleId
      this.moduleId = 0
    },
    showCreate() {
      this.showDialog = true
    },
    //显示编辑窗口
    showEdit(row) {
      console.log("row", row)
      this.moduleId = row.id
      this.showDialog = true
    },
    //修改每页显示个数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.size = val
      this.initModule()
    },
    //当前第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.page = val
      this.initModule()
    },
    // 删除模块
    async deleteModule(row) {
      console.log("row---->", row.id)
      this.moduleId = row.id
      const resp = await ModuleApi.deleteModule(this.moduleId)
      if (resp.success === true) {
        this.$message.success("删除成功")
        await this.initModule()
      } else {
        this.$message.error(resp.error.message)
      }
    }
  },
  mounted() {
    this.initModule()
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