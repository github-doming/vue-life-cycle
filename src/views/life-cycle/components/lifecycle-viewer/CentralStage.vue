<template>
  <div @click="activeKey = ''">
    <a-row class="stage-drag" type="flex" align="middle" justify="center">
      <stage v-for="(item,index) in stageData" :phaseKey="item.key" :hasGate="index!== stageData.length-1"
             :class="{'stage-current':activeKey === item.key}" @stageClick="stageClick" :key="item.key">
        <span slot="phase">{{phaseName(item.code)}}</span>
      </stage>
    </a-row>
  </div>
</template>

<script>
  import Stage from "../tab/Stage"
  import {LifeCycleComputed,LifeCycleMethod} from "../js/LifeCycleHelper";

  export default {
    name: "CentralStage",
    components: {Stage},
    props: {
      lifeCycleData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      stageData: LifeCycleComputed.stageData(),
      activeKey: LifeCycleComputed.activeKey(),
    },

    methods: {
      stageClick: LifeCycleMethod.stageClick(),
      phaseName: LifeCycleMethod.phaseName(),
    },
  }
</script>

<style scoped>
  .stage-drag {
    background: #f7f7f7;
    height: 150px;
    overflow: auto;
  }

  .stage-current {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
  }

</style>
