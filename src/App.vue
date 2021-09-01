<template>
  <div id="app" class="un-select">
    <h1>生命周期模板管理</h1>
    <a-row type="flex" justify="center">
      <a-table :columns="columns" :data-source="tableData" :rowKey="record => record.id" :span="20">
        <div slot="operation">
          <a-button class="btn-border" @click="handleEdit()">编辑</a-button>
          <a-button class="btn-border" @click="handleShow()">查看</a-button>
          <a-button class="btn-border" @click="handleModify()">修改</a-button>
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


  import LifeCycleTemplate from "./components/lifecycle/LifeCycleTemplate";
  import CreatorTemplate from "./views/life-cycle/components/CreatorTemplate";
  import ViewerTemplate from "./views/life-cycle/components/ViewerTemplate";
  import {LifeCycleData, LifeCycleFunction} from "./views/life-cycle/components/js/LifeCycleHelper";
  import cacheData from "./views/life-cycle/components/js/LifeCycleData";

  export default {
    name: "App",
    components: {LifeCycleTemplate, CreatorTemplate, ViewerTemplate},
    mounted() {
      localStorage.setItem('lifeCycleLocal', JSON.stringify(LifeCycleFunction.getLocal()));
      cacheData.supportClass = LifeCycleData.supportClass;
      cacheData.states = LifeCycleData.states;
      cacheData.versions = LifeCycleData.versions;
      cacheData.transitions = LifeCycleData.transitions;
      cacheData.roles = LifeCycleData.roles;
      cacheData.accesses = LifeCycleData.accesses;
      cacheData.accessesAssociate = LifeCycleData.accessesAssociate;
      cacheData.workflows = LifeCycleData.workflows;
      cacheData.roleActors = LifeCycleData.roleActors;
    },
    data() {
      return {
        columns: LifeCycleData.columns, tableData: LifeCycleData.tableData,
        lifeCycleData: {}, dialogTitle: null, dialogComponent: null, dialogVisible: false,
      };
    },

    methods: {
      handleEdit() {
        this.dialogTitle = '生命周期编辑器';
        this.dialogComponent = 'creator-template';
        this.lifeCycleData = LifeCycleFunction.getTemplateData();
        this.dialogVisible = true;
      },
      handleShow() {
        this.dialogTitle = '生命周期显示器';
        this.dialogComponent = 'viewer-template';
        this.lifeCycleData = LifeCycleFunction.getTemplateData();
        this.dialogVisible = true;
      },
      handleModify() {
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
