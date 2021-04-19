<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" :scroll="{x: stageData.length * 50 + 100,y:300}"
             :pagination="false" size="small" bordered>
      <a-checkbox slot="checkbox" :checked="state.checked" slot-scope="state"/>
    </a-table>
  </div>
</template>

<script>
  import LifeCycleData from '../../js/LifeCycleData'

  export default {
    name: "StageTransform",

    props: {
      stageData: {
        type: Array,
        required: true,
      },
      currentStage: {
        type: Object,
        required: true,
      }
    },
    computed: {
      columns() {
        const stateMap = {};
        LifeCycleData.states.forEach(state => {
          stateMap[state.code] = state.name;
        });
        const columns = [
          {title: '', dataIndex: 'name', width: 100, fixed: 'left', align: 'center',}];
        for (let data of this.stageData) {
          columns.push({
            title: stateMap[data.code], dataIndex: data.key, align: 'center', scopedSlots: {customRender: 'checkbox'},
          });
        }
        return columns;
      },
    },
    data() {
      return {
        dataSource: [],
      }
    },
    created() {
      this.renderData(this.currentStage);
    },
    watch: {
      stageData() {
        this.renderData(this.currentStage);
      },
      currentStage(newValue) {
        this.renderData(newValue);
      },
    },

    methods: {
      renderData(currentStage) {
        let data = [];
        for (let i = 0; i < LifeCycleData.transitions.length; i++) {
          let transition = LifeCycleData.transitions[i];
          const row = {key: transition.code, name: transition.name,};
          for (let stage of this.stageData) {
            row[stage.key] = {index: i, transition: transition.code, state: stage.key, checked: false};
          }
          for (let transform of currentStage.transform) {
            if (transition.code === transform.transition) {
              for (let state of transform.state) {
                row[state]['checked'] = true;
              }
              break;
            }
          }
          data.push(row);
        }
        this.dataSource = data;
      }
    }
  }
</script>

<style scoped>

</style>
