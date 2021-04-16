<template>
  <div class="un-select">
    <top-button :lifeCycleData="lifeCycleData"/>
    <div class="lc-head">
      <h3>{{local.lifeCycle}}-{{lifeCycleData.info.name}}</h3>
      <div>
        <a-checkbox v-model="lifeCycleData.info.routing"> {{local.isRouting}}</a-checkbox>
        <a-checkbox v-model="lifeCycleData.info.enabled"> {{local.isEnable}}</a-checkbox>
      </div>
    </div>
    <central-stage :lifeCycleData="lifeCycleData"/>
    <div class="lc-context">
      <context-info :lifeCycleData="lifeCycleData" class="context-height" v-show="!activeKey"/>
      <context-stage :lifeCycleData="lifeCycleData" class="context-height" v-show="activeKey"/>
    </div>
    <bottom-button :lifeCycleData="lifeCycleData" ref="bottomButton" class="lc-bottom"/>
  </div>
</template>

<script>
  import TopButton from "./lifecycle-creator/TopButton";
  import CentralStage from "./lifecycle-creator/CentralStage";
  import ContextInfo from "./lifecycle-creator/ContextInfo";
  import ContextStage from "./lifecycle-creator/ContextStage";
  import BottomButton from "./lifecycle-creator/BottomButton";
  import {LifeCycleComputed} from "../js/LifeCycleHelper";

  export default {
    components: {BottomButton, ContextStage, ContextInfo, CentralStage, TopButton},
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
    methods: {
      subData() {
        this.$refs.bottomButton.subData();
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

  .lc-bottom {
    margin-top: 10px;
  }
</style>
