<template>
  <el-dialog :title=showTitle :visible.sync="isVisible" @close="cancelTask()">
    <el-form v-if="inResize === true" :model="form" :rules="rules" ref="form" label-width="80px">
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
      data2:[],
      data: [{
        label: '项目 1',
        children: [{
          label: '模块 1-1',
          children: [{
            id: 9,
            label: '用例 1-1-1'
          }, {
            id: 10,
            label: '用例 1-1-2'
          }]
        }]
      }, {
        label: '项目 2',
        children: [{
          label: '模块 2-1'
        }, {
          label: '模块 2-2'
        }]
      }, {
        label: '项目 3',
        children: [{
          label: '模块 3-1'
        }, {
          label: '模块 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
    this.initCaseTree()
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
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      if(data.id != undefined){
        console.log("选中的叶子节点",data.id)
      }
    },
    // 选择监控
    handleNodeClick(data) {
      console.log(data);
    },
    //获取用例树
    async initCaseTree() {
      const resp = await CaseApi.getCaseTree()
      console.log("获取用例树resp-->", resp)
      this.data2 = resp.data
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