<template>
  <el-dialog title="创建项目" :visible.sync="isVisible" @close="cancelProject()">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <span style="float: left">
          <el-switch v-model="form.delivery"></el-switch>
        </span>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmit()">立即创建</el-button>
          <el-button @click="cancelProject()">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: "projectDialog",
  props: ["showStatus"],
  data() {
    return {
      form: {
        name: '',
        delivery: true,
        desc: '',
      },
      formLabelWidth: '100px',
      // 定义一个isVisible来接收传递过来的值
      isVisible: this.showStatus
    }
  },
  // 调用方法
  methods: {
    //  关闭自己
    cancelProject() {
      this.$emit('cancel', {})
    },
    onSubmit() {
      console.log("创建项目")
    }
  },
  //
  // created() {
  //   console.log("created---自动被执行")
  //   console.log("子组件-->", this.showStatus)
  // },
  // mounted() {
  //   console.log("mounted---自动被执行")
  //   // this.initProject()
  // },
  watch: {
    showStatus(val) {
      this.isVisible = val;//新增isVisible的watch，监听变更并同步到IsShowPage上
    }
  },
}
</script>

<style scoped>
.dialog-footer {
  float: right;
}
</style>