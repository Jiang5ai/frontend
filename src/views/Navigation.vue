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
        <router-link to="/main/project">
          <el-menu-item index="/main/project">
            <i class="el-icon-menu"></i>
            <span slot="title">项目管理</span>
          </el-menu-item>
        </router-link>

        <!--模块管理-->
        <router-link to="/main/module">
          <el-menu-item index="/main/module">
            <i class="el-icon-s-management"></i>
            <span slot="title">模块管理</span>
          </el-menu-item>
        </router-link>

        <!--用例管理-->
        <router-link to="/main/case">
          <el-menu-item index="/main/case">
            <i class="el-icon-s-grid"></i>
            <span slot="title">用例管理</span>
          </el-menu-item>
        </router-link>

        <!--任务管理-->
        <router-link to="/main/task">
          <el-menu-item index="/main/task">
            <i class="el-icon-s-claim"></i>
            <span slot="title">任务管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="center">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ user.name }}</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import UserApi from "@/request/user";

export default {
  data() {
    return {
      'user': {
        "id": '',
        "name": ''
      }
    }
  },
  created() {
    const user = sessionStorage.getItem('user')
    // 字符串转json
    this.user = JSON.parse(user)
  },
  methods: {
    async handleCommand(command) {
      if (command === 'logout') {
        const data = {
          'id': this.user.id,
        }
        const resp = await UserApi.logout(data)
        console.log(resp)
        if (resp.success) {
          // 清缓存
          sessionStorage.clear()
          await this.$router.push({path: '/login'})
        } else {
          this.$message.error("退出失败");
        }
      }

    }
  },
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