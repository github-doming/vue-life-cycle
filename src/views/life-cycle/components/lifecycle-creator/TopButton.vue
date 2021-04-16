<template>
  <div>
    <a-tooltip :title="local.addStage" class="top-button" :get-popup-container="(trigger)=>trigger.parentElement">
      <a-button class="top-button" icon="plus-square" @click="addStage"/>
    </a-tooltip>
    <a-tooltip :title="local.cutStage" class="top-button">
      <a-button icon="scissor" @click="cutStage"/>
    </a-tooltip>
    <a-tooltip :title="local.copyStage" class="top-button">
      <a-button icon="snippets" @click="copyStage"/>
    </a-tooltip>
    <a-tooltip :title="local.pasteStage" class="top-button">
      <a-button icon="copy" @click="pasteStage"/>
    </a-tooltip>
    <a-tooltip :title="local.deleteStage" class="top-button">
      <a-button icon="close" @click="deleteStage"/>
    </a-tooltip>
  </div>
</template>

<script>
  import {LifeCycleComputed, LifeCycleFunction} from '../../js/LifeCycleHelper';

  export default {
    name: "TopButton",
    props: {
      lifeCycleData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')), stageTemp: null,
      }
    },
    computed: {
      activeKey: LifeCycleComputed.activeKey(),
      stageData: LifeCycleComputed.stageData(),
    },
    methods: {
      addStage() {
        const newStage = {key: LifeCycleFunction.getKey(), code: '', roles: [], transform: [], workflow: {},};
        if (this.activeKey) {
          this.putStage(newStage);
        } else {
          this.stageData.push(newStage);
        }
      },
      cutStage() {
        if (this.activeKey === "") {
          return;
        }
        //删除这个阶段所有存在信息
        this.correctTransform(this.activeKey);
        for (let i = 0; i < this.stageData.length; i++) {
          if (this.stageData[i].key === this.activeKey) {
            this.stageTemp = JSON.stringify(this.stageData[i]);
            this.stageData.splice(i, 1);
            break;
          }
        }
        this.activeKey = "";
      },
      copyStage() {
        if (this.activeKey === "") {
          return;
        }
        for (let data of this.stageData) {
          if (data.key === this.activeKey) {
            this.stageTemp = JSON.stringify(data);
            break;
          }
        }
      },
      pasteStage() {
        if (this.stageTemp === null) {
          return;
        }
        const temp = JSON.parse(this.stageTemp);
        temp.key = LifeCycleFunction.getKey();
        if (this.activeKey === "") {
          this.stageData.push(temp);
        } else {

          this.putStage(temp);
        }
      },
      deleteStage() {
        if (this.activeKey === "") {
          return;
        }
        for (let i = 0; i < this.stageData.length; i++) {
          if (this.stageData[i].key === this.activeKey) {
            this.stageData.splice(i, 1);
            break;
          }
        }
        //删除这个阶段所有存在信息
        this.correctTransform(this.activeKey);
        this.activeKey = "";
      },

      putStage(stage) {
        for (let i = 0; i < this.stageData.length; i++) {
          if (this.stageData[i].key === this.activeKey) {
            this.stageData.splice(i + 1, 0, stage);
            return;
          }
        }
      },
      correctTransform(correctState) {
        for (let data of this.stageData) {
          for (let transform of data.transform) {
            transform.state = transform.state.filter(state => state !== correctState)
          }
        }
      },
    },
  }
</script>

<style scoped>
  .top-button {
    margin-left: 3px;
  }
</style>
