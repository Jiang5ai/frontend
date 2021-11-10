<template>
  <el-dialog title=showTitle :visible.sync="isVisible" @close="cancelProject()">
    <el-form :model="form" :rules="rules" ref="from" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <span style="float: left">
          <el-switch v-model="form.status"></el-switch>
        </span>
      </el-form-item>

      <el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmit('from')">立即创建</el-button>
          <el-button @click="cancelProject()">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import ProjectApi from "@/request/project";

export default {
  name: "projectDialog",
  props: ["showStatus", "pid"],
  data() {
    return {
      showTitle: '',
      form: {
        name: '',
        status: true,
        describe: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
        ],
      },
      formLabelWidth: '100px',
      // 定义一个isVisible来接收传递过来的值
      isVisible: this.showStatus
    }
  },
  created() {
    if (this.pid === 0) {
      this.showTitle="新建项目"
    }
    else {
      this.showTitle="编辑项目"
    }
  },
  // 调用方法
  methods: {
    //  关闭自己
    cancelProject() {
      this.$emit('cancel', {})
    },
    // 创建项目
    async onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const resp = await ProjectApi.createProject(this.form)
          if (resp.success === true) {
            this.$message.success("创建成功");
            this.cancelProject()
          } else {
            this.$message.error(resp.error.message);
          }
        } else {
          this.$message.error("创建失败");
          return false;
        }
      });
    }
  },
  watch: {
    showStatus(val) {
      this.isVisible = val;//新增isVisible的watch，监听变更并同步到isVisible上
    }
  },
}
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>