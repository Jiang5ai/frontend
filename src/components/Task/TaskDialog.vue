<template>
  <el-dialog :title=showTitle :visible.sync="isVisible" @close="cancelTask()">
    <el-form v-if="inResize === true" :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="dialog-footer">
<!--          <el-button type="primary" @click="onSubmit('form')">保存</el-button>-->
          <el-button @click="cancelTask()">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "TaskDialog",
  props: ["showStatus", "tid"],
  data() {
    return {
      inResize:true,
      showTitle: "",
      // 定义一个isVisible来接收传递过来的值
      isVisible: this.showStatus,
      // 表单字段
      form: {
        name: '',
        describe: '',
      },
      // 校验规则
      rules: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
        ],
      },
    }
  },
  watch: {
    showStatus(val) {
      this.isVisible = val;//新增isVisible的watch，监听变更并同步到isVisible上
      this.createOrEdit()
    },
  },
  created() {
    // 强制刷新
    this.inResize = false;
    this.$nextTick(() => {
      this.inResize = true;
    })
  },
  methods: {
    // 关闭自己
    cancelTask() {
      this.$emit('cancel', {})
    },
    // 判断是否新增
    createOrEdit() {
      if (this.tid === 0) {
        console.log(this.tid)
        this.showTitle = "创建任务"
      } else {
        this.showTitle = "编辑任务"
        // this.getProject()
      }
    },
  }
}
</script>

<style scoped>

</style>