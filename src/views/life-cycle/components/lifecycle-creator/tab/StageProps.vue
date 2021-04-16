<template>
  <div class="props-context">
    <div class="props-status">
      <label>{{local.status}}：</label>
      <a-select class="select-wrap" v-model="currentStage.code" :placeholder="local.selectStatus" show-search>
        <a-select-option v-for="item in states" :key="item.code">{{item.name}}</a-select-option>
      </a-select>
    </div>
    <div>
      <label>{{local.versionSeries}}：</label>
      <a-select class="select-wrap" v-model="currentStage.version" :placeholder="local.selectVersionSeries">
        <a-select-option v-for="item in versions" :key="item.code"> {{item.name}}</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
  import LifeCycleData from '../../../js/LifeCycleData'

  export default {
    name: "StageProps",
    props: {
      currentStage: {
        type: Object,
        required: true,
      },
      stageData: {
        type: Array,
        required: true,
      },
    },
    computed: {
      states() {
        let stageCodes = [];
        this.stageData.forEach(stage => stageCodes.push(stage.code));
        return LifeCycleData.states.filter(state => {
          return !stageCodes.includes(state.code);
        });
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
        versions: LifeCycleData.versions,
      }
    },
  }
</script>

<style scoped>
  .props-context {
    padding: 0 0 10px 25px;
  }

  .props-status {
    float: left;
    margin-right: 50px
  }

  .select-wrap {
    width: 150px;
  }
</style>
