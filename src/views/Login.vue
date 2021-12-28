<template>
  <div class="login" >
    <el-card class="box-card">
      <h1>测试平台</h1>
      <el-form :model="Form" status-icon :rules="rules" ref="Form" label-width="100px" class="demo-Form">
        <div>
          <el-form-item label="用户名" prop="username">
            <el-input type="username" v-model="Form.username" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="Form.password" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('Form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>
<script>
import UserApi from "@/request/user";

export default {
  name: "Login",
  data() {
    return {
      Form: {
        password: '06150318Js',
        username: 'admin1',
      },
      rules: {
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const resp = await UserApi.login(this.Form)
          if (resp.success) {
            sessionStorage.token = resp.data.Token
            sessionStorage.user = resp.data.User
            await this.$router.push({path: '/main/project'})
            this.$message.success("登录成功");
          } else {
            console.log(resp.error.message)
            this.$message.error(resp.error.message);
          }
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

.box-card {
  width:40%;
  margin:60px auto;

}

</style>