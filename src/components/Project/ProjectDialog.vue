<template>
  <el-dialog :title=showTitle :visible.sync="isVisible" @close="cancelProject()">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <span style="float: left">
          <el-switch v-model="form.status"></el-switch>
        </span>
      </el-form-item>

      <el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
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
  // 调用方法
  methods: {
    init(){
      console.log('init')
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    //  关闭自己
    cancelProject() {
      this.$emit('cancel', {})
      this.init()
    },
    //判断是否新增
    createOrEdit() {
      if (this.pid === 0) {
        console.log(this.pid)
        this.showTitle = "创建项目"
      } else {
        this.showTitle = "编辑项目"
        console.log(this.pid)
        this.getProject()
      }
    },
    // 创建项目
    async onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.pid === 0) {
            console.log("新建保存")
            const resp = await ProjectApi.createProject(this.form)
            if (resp.success === true) {
              //创建成功后关闭弹窗，调用父组件的获取列表接口
              this.$message.success("创建成功");
              this.$parent.initProject()
              this.cancelProject()
            } else {
              this.$message.error(resp.error.message);
            }
          } else {
            console.log("编辑保存")
            const resp = await ProjectApi.updateProject(this.pid, this.form)
            if (resp.success === true) {
              //创建成功后关闭弹窗，调用父组件的获取列表接口
              this.$message.success("更新成功");
              this.$parent.initProject()
              this.cancelProject()
            } else {
              this.$message.error(resp.error.message);
            }
          }
        } else {
          return false;
        }
      });
    },
    // 获取单个项目信息
    async getProject() {
      const resp = await ProjectApi.getProject(this.pid)
      console.log("resp-->", resp)
      if (resp.success === true) {
        this.form = resp.data
      } else {
        this.$message.error(resp.error.message);
      }
    }
  },
  watch: {
    showStatus(val) {
      this.isVisible = val;//新增isVisible的watch，监听变更并同步到isVisible上
      this.createOrEdit()
    },
  },
}
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>