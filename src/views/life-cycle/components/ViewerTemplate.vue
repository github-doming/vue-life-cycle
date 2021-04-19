<template>
  <div class="un-select">
    <div class="lc-head">
      <h3>{{local.lifeCycle}}-{{lifeCycleData.info.name}}</h3>
      <div>
        <a-checkbox :checked="lifeCycleData.info.routing"> {{local.isRouting}}</a-checkbox>
        <a-checkbox :checked="lifeCycleData.info.enabled"> {{local.isEnable}}</a-checkbox>
      </div>
    </div>
    <central-stage :lifeCycleData="lifeCycleData"/>
    <div class="lc-context">
      <context-info :lifeCycleData="lifeCycleData" class="context-height" v-show="!activeKey"/>
      <context-stage :lifeCycleData="lifeCycleData" class="context-height" v-show="activeKey"/>
    </div>
  </div>

</template>

<script>
  import ContextStage from "./lifecycle-viewer/ContextStage";
  import CentralStage from "./lifecycle-viewer/CentralStage";
  import ContextInfo from "./lifecycle-viewer/ContextInfo";
  import {LifeCycleComputed} from "./js/LifeCycleHelper";
  export default {
    name: "ViewerTemplate",

    components: {CentralStage,ContextInfo,ContextStage},
    props: {
      lifeCycleData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      activeKey: LifeCycleComputed.activeKey(),
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
      }
    },
  }
</script>

<style scoped>
  .lc-head {
    padding: 4px;
  }

  .lc-context {
    margin-top: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 4px 0 rgba(255, 90, 91, 0.18);
  }

  .context-height {
    height: 52vh;
  }

</style>
