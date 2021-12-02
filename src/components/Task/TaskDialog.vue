<template>
  <el-dialog :title=showTitle :visible.sync="isVisible" @close="cancelTask()">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>

      <el-form-item label="选择用例" prop="describe">
        <div class="div-tree">
          <el-tree :data="data" :props="defaultProps" show-checkbox
                   @node-click="handleNodeClick"
                   @check-change="handleCheckChange"
                   node-key="id">
          </el-tree>
        </div>
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
import CaseApi from '../../request/case'
export default {
  name: "TaskDialog",
  props: ["showStatus", "tid"],
  data() {
    return {
      showTitle: "",
      // 定义一个isVisible来接收传递过来的值
      isVisible: this.showStatus,
      // 表单字段
      form: {
        name: '',
        describe: '',
        cases:[]
      },
      // 校验规则
      rules: {
        name: [
          {required: true, message: '请输入项目名称', trigger: 'blur'},
        ],
      },
      data:[],
      defaultProps: {
        children: 'children',
        label: 'label'
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
    this.initCaseTree()
  },
  methods: {
    init(){
      console.log('init')
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    // 关闭自己
    cancelTask() {
      this.$emit('cancel', {})
      this.init()
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
    handleCheckChange(data, checked) {
      // console.log("aaa", data, checked);
      // console.log("aaa1", data.id);
      if(data.id != undefined) {
        console.log("操作的叶子节点", data.id, checked);
        if(checked == true) {
          this.form.cases.push(data.id)
        } else {
          // this.form.cases.remove(data.id)
          // arr2.splice(1,2,'ttt');
          for (var i = 0; i < this.form.cases.length; i++) {
            if(this.form.cases[i] == data.id) {
              this.form.cases.splice(i, 1);
            }
          }
        }
      }
      console.log("cases", this.form.cases)
    },
    // 选择监控
    handleNodeClick(data) {
      console.log(data);
    },
    //获取用例树
    async initCaseTree() {
      const resp = await CaseApi.getCaseTree()
      console.log("获取用例树resp-->", resp)
      this.data = resp.data
    },
  }
}
</script>

<style scoped>
.div-tree {
  max-height: 180px;
  overflow: auto;
}
</style>