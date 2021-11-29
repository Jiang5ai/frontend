<template>
  <div class="case">
    <!--面包屑-->
    <div v-if="isList" style="height: 30px;">
      <div style="padding-bottom: 10px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用例管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div v-else style="height: 30px;">
      <div style="padding-bottom: 10px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a @click="showDebug()">用例管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用例调试</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!--卡片-->
    <el-card class="box-card">
      <div v-if="isList" class="filter-line">
        <el-button @click='showDebug()' type="primary" size="medium ">创建</el-button>
      </div>
      <div v-else class="filter-line">
        <el-page-header @back="showDebug()" content="API"></el-page-header>
      </div>
      <!--表格-->
      <div v-if="isList">
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading">

          <el-table-column
              prop="name"
              label="用例名称"
              min-width="10%"
              align="center">
          </el-table-column>

          <el-table-column
              prop="module_name"
              label="关联模块名称"
              min-width="15%"
              align="center">
          </el-table-column>

          <el-table-column
              prop="url"
              label="url"
              min-width="20%"
              align="center">
          </el-table-column>

          <el-table-column
              prop="method"
              label="method"
              min-width="10%"
              align="center">
          </el-table-column>

          <el-table-column
              prop="assert_type"
              label="断言方式"
              min-width="25%"
              align="center">
          </el-table-column>
          <!--        操作栏-->
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
      </div>
      <div v-else>
        <CaseDebug :cid=caseId></CaseDebug>
      </div>
    </el-card>
  </div>
</template>


<script>
import CaseApi from "../../request/case"
import CaseDebug from "@/components/Case/CaseDebug";
// import caseDialog from "@/components/case/CaseDialog";


export default {
  name: "Module",
  components: {
    //新增项目弹窗组件
    // eslint-disable-next-line vue/no-unused-components
    CaseDebug
  },
  data() {
    return {
      isList: true,
      loading: true,
      caseId: 0,
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
    // 获取用例列表
    async initCase() {
      const resp = await CaseApi.getCases(this.query)
      console.log("获取用例列表resp-->", resp)
      if (resp.success === true) {
        this.tableData = resp.data.caseList
        this.total = resp.data.total
      } else {
        this.$message.error(resp.error.message);
      }
      this.loading = false
    },
    // 显示调试页面
    showDebug() {
      if (this.isList === true) {
        this.isList = false
      } else {
        this.isList = true
        this.caseId=0
      }
    },
    //显示编辑窗口
    showEdit(row) {
      this.caseId = row.id
      this.showDebug()
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
    // 删除用例
    async deleteModule(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.caseId = row.id
        const resp = await CaseApi.deleteCase(this.caseId)
        if (resp.success === true) {
          this.$message.success("删除成功")
          await this.initModule()
        } else {
          this.$message.error(resp.error.message)
        }
      })
    },
  },
  mounted() {
    this.initCase()
  }
}

</script>


<style scoped>

/*.filter-line {*/
/*  float: right*/
/*}*/

.filter-line {
  height: 50px;
  text-align: left;
}
.foot-page {
  margin-top: 70px;
}
</style>