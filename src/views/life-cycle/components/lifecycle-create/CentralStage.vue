<template>
  <div @click="activeKey = ''">
    <a-row class="stage-drag" type="flex" align="middle" justify="center">
      <draggable v-model="stageData" @start="drag=true" @end="drag=false" class="ant-row-flex">
        <stage v-for="(item,index) in stageData" :phaseKey="item.key" :hasGate="index!== stageData.length-1"
               :class="{'stage-current':activeKey === item.key}" @stageClick="stageClick">
          <span slot="phase">{{phaseName(item.code)}}</span>
        </stage>
      </draggable>
    </a-row>
  </div>

</template>

<script>
  import draggable from "vuedraggable";
  import Stage from "./tab/Stage"
  import LifeCycleData from '../../js/LifeCycleData'
  import {LifeCycleComputed} from "../../js/LifeCycleHelper";

  export default {
    name: "Central-Stage",
    props: {
      lifeCycleData: {
        type: Object,
        required: true,
      },
    },
    components: {draggable, Stage},
    computed: {
      stageData: LifeCycleComputed.stageData(),
      activeKey: LifeCycleComputed.activeKey(),
    },
    methods: {
      stageClick(phaseKey) {
        this.activeKey = phaseKey;
      },
      phaseName(phaseCode) {
        if (phaseCode) {
          for (let state of LifeCycleData.states) {
            if (state.code === phaseCode) {
              return state.name;
            }
          }
        }
        return '';
      },

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
