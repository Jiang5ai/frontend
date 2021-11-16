<template>
  <el-dialog :title=showTitle :visible.sync="isVisible" @close="cancelModule()">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="模块名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="项目名称" prop="project_id">
        <!--   v-model 里的值就是接口的传参     -->
        <el-select v-model="form.project_id" placeholder="请选择项目" style="width: 100%">
          <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
          <el-button @click="cancelModule()">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import ModuleApi from "@/request/module";
import ProjectApi from "@/request/project";

export default {
  name: "moduleDialog",
  props: ["showStatus", "mid"],
  data() {
    return {
      showTitle: '',
      projectOptions: [],
      form: {
        name: '',
        project_id: '',
        status: true,
        describe: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入模块名称', trigger: 'blur'},
        ],
        project_id:[
          {required: true, message: '请选择项目', trigger: 'blur'},
        ]
      },
      formLabelWidth: '100px',
      // 定义一个isVisible来接收传递过来的值
      isVisible: this.showStatus,
      query: {
        page: 1,
        size: 1000,
      }
    }
  },
  // 调用方法
  methods: {
    // 获取项目列表
    async getProject() {
      const resp = await ProjectApi.getProjects(this.query)

      // console.log("获取项目列表resp-->", resp)
      if (resp.success === true) {
        const ProjectList = resp.data.projectList
        for (let i=0;i<ProjectList.length;i++){
          console.log(ProjectList[i])
          this.projectOptions.push({
            value: ProjectList[i].id,
            label: ProjectList[i].name
          })
        }
      } else {
        this.$message.error(resp.error.message);
      }
      this.loading=false
    },
    //  关闭自己
    cancelModule() {
      this.$emit('cancel', {})
    },
    //判断是否新增
    createOrEdit() {
      if (this.mid === 0) {
        this.showTitle = "创建模块"
      } else {
        this.showTitle = "编辑模块"
        this.getModule()
      }
    },
    // 创建模块
    async onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.mid === 0) {
            console.log("新建保存")
            const resp = await ModuleApi.createModule(this.form)
            if (resp.success === true) {
              //创建成功后关闭弹窗，调用父组件的获取列表接口
              this.$message.success("创建成功");
              this.$parent.initModule()
              this.cancelModule()
            } else {
              this.$message.error(resp.error.message);
            }
          } else {
            console.log("编辑保存")
            const resp = await ModuleApi.updateModule(this.pid, this.form)
            if (resp.success === true) {
              //创建成功后关闭弹窗，调用父组件的获取列表接口
              this.$message.success("更新成功");
              this.$parent.initModule()
              this.cancelModule()
            } else {
              this.$message.error(resp.error.message);
            }
          }
        } else {
          return false;
        }
      });
    },
    // 获取单个模块信息
    async getModule() {
      const resp = await ModuleApi.getModule(this.mid)
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
    }
  },
  mounted() {
    console.log("mounted---自动被执行")
    //调用获取项目列表接口方法
    this.getProject()
  }
}
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>