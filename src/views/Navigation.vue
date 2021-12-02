<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
      <img class="logo" alt="Vue logo" src="../assets/logo.png">
      <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#4BD0FF">
        <!--项目管理-->
        <router-link to="/">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">项目管理</span>
          </el-menu-item>
        </router-link>

        <!--模块管理-->
        <router-link to="/module">
          <el-menu-item index="/module">
            <i class="el-icon-s-management"></i>
            <span slot="title" >模块管理</span>
          </el-menu-item>
        </router-link>

        <!--用例管理-->
        <router-link to="/case">
          <el-menu-item index="/case">
            <i class="el-icon-s-grid"></i>
            <span slot="title">用例管理</span>
          </el-menu-item>
        </router-link>

        <router-link to="/task">
          <!--任务管理-->
          <el-menu-item index="/task">
            <i class="el-icon-s-claim"></i>
            <span slot="title">任务管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  created() {
    console.log(this.$route.path)
  }
};
</script>

<style>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.logo {
  background-color: rgb(84, 92, 100);
  height: 25px;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>