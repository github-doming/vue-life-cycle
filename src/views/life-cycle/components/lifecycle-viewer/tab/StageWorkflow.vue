<template>
  <div>
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 20 }">
      <a-form-item :label="local.stage + local.process">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-button type="link" @click="showModal('phase')">{{workflowMap[workflowData.phase.process]}}</a-button>
          </a-col>
          <a-col :span="3">
            <a-button @click="showModal('phase')">{{local.skim}}...</a-button>
          </a-col>
          <a-col :span="7">
            <a-checkbox :checked="workflowData.phase.lastVersion">{{local.lastVersion}}</a-checkbox>
          </a-col>
          <a-col :span="2">
            <a-button type="dashed" disabled>
              {{local.clear}}
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="local.gate+local.process" v-show="lastStage">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-button type="link" @click="showModal('gateway')">{{workflowMap[workflowData.gateway.process]}}</a-button>
          </a-col>
          <a-col :span="3">
            <a-button @click="showModal('gateway')">{{local.skim}}...</a-button>
          </a-col>
          <a-col :span="7">
            <a-checkbox :checked="workflowData.gateway.lastVersion">{{local.lastVersion}}</a-checkbox>
          </a-col>
          <a-col :span="2">
            <a-button type="dashed"  disabled>
              {{local.clear}}
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
    <a-modal v-model="visible" :title="local.selectTemplateProcess" :ok-text="local.ok" :cancel-text="local.cancel"
             @ok="visible=false">
      <a-radio-group :value="process">
        <a-radio class="radios-style" v-for="item in workflows" :key="item.code" :value="item.code">{{item.name}}
        </a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>

<script>

  import LifeCycleData from '../../../js/LifeCycleData'

  export default {
    name: "StageWorkflow",
    props: {
      workflowData: {
        type: Object,
        required: true,
      },
      lastStage: {
        type: Boolean,
        required: true,
      },
    },
    watch: {
      workflowData() {
        this.type = null;
        this.process = null;
        this.renderData();
      },
    },
    data() {
      const workflows = LifeCycleData.workflows;
      const workflowMap = {};
      workflows.forEach(active => workflowMap[active.code] = active.name);
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
        workflows, workflowMap, type: null, process: null, visible: false,
      }
    },
    created() {
      this.renderData();
    },
    methods: {
      showModal(type) {
        this.type = type;
        this.process = this.workflowData[type].process;
        this.visible = true;
      },
      renderData() {
        if (Object.keys(this.workflowData).length === 0) {
          this.$set(this.workflowData, 'phase', {process: null, lastVersion: false});
          this.$set(this.workflowData, 'gateway', {process: null, lastVersion: false});
        }
      },
    }
  }
</script>

<style scoped>
  .radios-style {
    display: block;
    height: 30px;
    line-height: 30px;
  }
</style>
