<template>
  <div id="app" class="un-select">
    <h1>生命周期模板管理</h1>
    <a-row type="flex" justify="center">
      <a-table :columns="columns" :data-source="tableData" :rowKey="record => record.id" :span="20">
        <div slot="operation">
          <a-button class="btn-border" @click="handleEdit()">编辑</a-button>
          <a-button class="btn-border" @click="handleShow()">查看</a-button>
        </div>
      </a-table>
    </a-row>
    <a-modal :centered="true" :maskClosable="false" :title="dialogTitle" :visible.sync="dialogVisible" width="50%"
             @cancel="handleClose">
      <div>
        <component ref="component" :is="dialogComponent" :lifeCycleData="lifeCycleData"></component>
      </div>
      <span slot="footer" class="dialog-footer">
				<a-button @click="handleDisplay">显示XML</a-button>
				<a-button type="danger" @click="handleClose">取 消</a-button>
				<a-button type="primary" @click="handleOk">确 定</a-button>
			</span>
    </a-modal>
  </div>
</template>

<script>
  import LifeCycleTemplate from "@/components/lifecycle/LifeCycleTemplate";
  import CreateTemplate from "@/views/life-cycle/components/CreateTemplate";
  import {LifeCycleFunction} from "@/views/life-cycle/js/LifeCycleHelper";
  import LifecycleData from '@/views/life-cycle/js/LifeCycleData';

  const columns =
      [{title: '生命周期模板标识', dataIndex: 'id', width: 180,}, {title: '生命周期模板名称', dataIndex: 'name', width: 180,},
        {title: '上次更新时间', dataIndex: 'lastUpdateTime', width: 180,}, {title: '版本', dataIndex: 'version', width: 180,},
        {title: '操作', dataIndex: 'operation', scopedSlots: {customRender: 'operation'},},];
  const tableData = [{id: '1', name: '默认文档生命周期', lastUpdateTime: '2021年4月13日', version: '1.0.25.a'},
    {id: '2', name: '船舶齿轮生命周期', lastUpdateTime: '2020年4月13日', version: '2.13.1.e'},];
  const supportClass = [{name: "Object", code: "java.lang.Object"}, {name: "String", code: "java.lang.String"},
    {name: "Short", code: "java.lang.Short"}, {name: "Integer", code: "java.lang.Integer"},
    {name: "Long", code: "java.lang.Long"}, {name: "Double", code: "java.lang.Double"},
    {name: "Float", code: "java.lang.Float"}, {name: "Boolean", code: "java.lang.Boolean"},
    {name: "Character", code: "java.lang.Character"},
  ];
  const states = [{name: "Release", code: "RELEASE", oid: '1',},
    {name: "In Work", code: "INWORK", oid: '2',},
    {name: "Approved", code: "APPROVED", oid: '3',},
    {name: "Closed", code: "CLOSED", oid: '4',},
    {name: "Open", code: "OPEN", oid: '2',},
    {name: "Rejected", code: "REJECTED", oid: '5',},
    {name: "Released", code: "RELEASED", oid: '6',},
    {name: "Rework", code: "REWORK", oid: '7',},
    {name: "Under Revew", code: "UNDERREVEW", oid: '8',},
    {name: "withdrawn", code: "WITHDRAIN", oid: '9',},
    {name: "Cancelled", code: "CANCELLED", oid: '10',},
    {name: "Reopened", code: "REOPENED", oid: '11',},
    {name: "Submitting", code: "SUBMITTING", oid: '12',},
    {name: "Resolved", code: "RESOLVED", oid: '13',},
    {name: "Pending", code: "PENDING", oid: '14',},
    {name: "In progress", code: "IN PRORESS", oid: '15',},
    {name: "Opening", code: "Opening", oid: '16',},];
  const versions = [{name: '无', code: 'sp'}, {name: 'Mil Std', code: 'Mil Std'}, {name: '数字', code: 'Number'},];
  const transitions = [{code: '1', name: '优化'}, {code: '2', name: '修订'}, {code: '3', name: '升级'},
    {code: '4', name: '审阅'}, {code: '5', name: '废弃'}, {code: '6', name: '修改'}, {code: '7', name: '生产已发布'},
    {code: '8', name: '设置状态'}, {code: '9', name: '锁定'}];
  const roles = [{code: '1', name: 'CAD作者', oid: '1'}, {code: '2', name: 'CAPA实施者', oid: '2'},
    {code: '3', name: 'CAPA审阅者', oid: '3'},
    {code: '4', name: 'CAPA措施有效性批准者', oid: '4'}, {code: '5', name: 'CAPA措施校验者', oid: 5},
    {code: '6', name: 'CAPA有效性批准者', oid: '6'}, {code: '7', name: 'CAPA检验者', oid: '7'},
    {code: '8', name: 'CAPA确认者', oid: '8'},
    {code: '9', name: 'CAPA管理者', oid: '9'}, {code: '10', name: 'CAPA规划者', oid: '10'},
    {code: '11', name: 'CAPA计划批准者', oid: '11'},
    {code: '12', name: 'CAPA请求者', oid: '12'}, {code: '13', name: 'CAPA调查批准者', oid: '13'}];
  const accesses = [{code: '-1', name: '完全控制(全部)'},
    {code: '2', name: '读取'}, {code: '3', name: '下载'},
    {code: '4', name: '修改内容'}, {code: '5', name: '修改'},
    {code: '6', name: '修改标识'}, {code: '7', name: '修改安全标签'},
    {code: '8', name: '通过移动创建'}, {code: '9', name: '创建'},];

  const workflows = [
    {oid: '1', name: '测试阶段进程', code: 'Apple'},
    {oid: '2', name: '测试关口进程', code: 'Pear'},
    {oid: '3', name: 'Design Review Workflow', code: '9'},
    {oid: '4', name: 'Package Approval Process', code: '8'},
    {oid: '5', name: 'Package Content Routing Process', code: '7'},
    {oid: '6', name: 'Package Delivery Process', code: '6'},
    {oid: '7', name: 'Peer Review Workflow', code: '5'},
    {oid: '8', name: 'PIALMChangeRequestVf', code: '4'},
    {oid: '9', name: 'PIALMCustomerlnputDocWf', code: '3'},
    {oid: '10', name: 'PIAL _MDefectWf', code: '2'},
    {oid: '11', name: 'PIALMDesignDocWf', code: '1'},
  ];
  export default {
    name: "App",
    components: {LifeCycleTemplate, CreateTemplate},
    mounted() {
      localStorage.setItem('lifeCycleLocal', JSON.stringify(LifeCycleFunction.getLocal()));
      LifecycleData.supportClass = supportClass;
      LifecycleData.states = states;
      LifecycleData.versions = versions;
      LifecycleData.transitions = transitions;
      LifecycleData.roles = roles;
      LifecycleData.accesses = accesses;
      LifecycleData.workflows = workflows;
    },
    data() {
      return {
        columns, tableData, lifeCycleData: {}, dialogTitle: null, dialogComponent: null, dialogVisible: false,
      };
    },

    methods: {
      handleEdit() {
        this.dialogTitle = '生命周期编辑器';
        this.dialogComponent = 'create-template';
        this.lifeCycleData = LifeCycleFunction.getTemplateData();
        this.dialogVisible = true;
      },
      handleShow() {
        this.dialogTitle = '生命周期编辑器';
        this.dialogComponent = 'life-cycle-template';
        this.dialogVisible = true;
      },
      handleDisplay() {
        this.$refs.component.subData();
      },
      handleOk() {
        this.dialogVisible = false;
        this.$refs.component.subData();
      },
      handleClose() {
        this.dialogVisible = false;
      },
    },
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 60px;
  }

  .btn-border {
    margin-right: 10px;
  }

  .un-select {
    -o-user-select: none;
    -moz-user-select: none; /*火狐 firefox*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10+*/
    -khtml-user-select: none; /*早期的浏览器*/
    user-select: none;
  }

</style>
