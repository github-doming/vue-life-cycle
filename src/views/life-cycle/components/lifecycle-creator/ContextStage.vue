<template>
  <div>
<!--    <div class="stage-title">-->
<!--      {{local.feature}} - {{local.stage}}-->
<!--    </div>-->
<!--    <stage-props :currentStage="currentStage" :stageData="stageData"/>-->
    <div class="stage-tab">
      <a-tabs type="card"  :key="baseType ? 'transform' : 'accessControl'" >
        <a-tab-pane key="transform" :tab="local.stage">
          <stage-transform :currentStage="currentStage" :stageData="stageData"/>
        </a-tab-pane>
        <a-tab-pane key="role" :tab="local.role" :disabled="baseType">
          <stage-role :currentStage="currentStage"/>
        </a-tab-pane>
        <a-tab-pane key="accessControl" :tab="local.accessControl" :disabled="baseType">
          <stage-access-control :roles="currentStage.roles"/>
        </a-tab-pane>
        <a-tab-pane key="workflow" :tab="local.workflow" :disabled="baseType">
          <stage-workflow :workflowData="currentStage.workflow"
                          :lastStage="stageData.length ===0 ||currentStage.key !== stageData[stageData.length-1].key"/>
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script>
  import StageTransform from "./tab/StageTransform";
  import StageRole from "./tab/StageRole";
  import StageAccessControl from "./tab/StageAccessControl";
  import StageWorkflow from "./tab/StageWorkflow";
  import StageProps from "./tab/StageProps";
  import {LifeCycleComputed} from '../js/LifeCycleHelper';

  export default {
    name: "ContextStage",
    components: {StageProps, StageWorkflow, StageAccessControl, StageRole, StageTransform},
    props: {
      lifeCycleData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      activeKey: LifeCycleComputed.activeKey(),
      stageData: LifeCycleComputed.stageData(),
      currentStage() {
        for (let data of this.stageData) {
          if (data.key === this.activeKey) {
            return data;
          }
        }
        return {roles: [], transform: [], workflow: {}, key: null};
      },
      baseType() {
        return this.lifeCycleData.info.type === 'basic';
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
      }
    },
  }
</script>

<style scoped>
  .stage-title {
    padding-left: 20px;
    padding-top: 10px;
    font-size: 20px;
  }

  .stage-tab {
    margin-left: 10px
  }
</style>
