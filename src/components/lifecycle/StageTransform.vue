<template>
	<div>
		<a-table
						:columns="columns" :data-source="data" :scroll="{x: stageData.length * 50 + 100}"
						:pagination="false" size="small" bordered>
			<a-checkbox @change="cellClick($event,state)" slot="checkbox" :checked="state.checked"
									slot-scope="state"></a-checkbox>
		</a-table>
	</div>
</template>

<script>
  import {EventBus} from '@/component';
  import lifecycleData from './LifecycleData.json';

  export default {
    name: "StageTransform",
    props: {
      stageData: {
        type: Array,
        required: true,
      },
      stageActive: {
        type: Object,
        required: true,
      }
    },
    created() {
      this.renderData(this.stageActive);
    },
    computed: {
      columns() {
        const stateMap = {};
        lifecycleData.states.forEach(state => {
          stateMap[state.code] = state.name;
        });
        const columns = [
          {title: '', dataIndex: 'name', width: 100, fixed: 'left', align: 'center',}];
        for (let data of this.stageData) {
          columns.push({
            title: stateMap[data.code],
            dataIndex: data.key,
            align: 'center',
            scopedSlots: {customRender: 'checkbox'},
          });
        }
        return columns;
      },
    },
    watch: {
      stageActive(newValue) {
        this.renderData(newValue);
      },
      stageData() {
        this.renderData(this.stageActive);
      }
    },
    data() {
      return {
        transitions: lifecycleData.transitions,
        data: null,
      }
    },
    methods: {
      cellClick(event, cellAttr) {
        this.data[cellAttr.index][cellAttr.state]['checked'] = event.target.checked;
        //穿梭数据
        EventBus.$emit('transformData', this.data[cellAttr.index][cellAttr.state]);

      },
      renderData(stageActive) {
        this.data = [];
        for (let i = 0; i < lifecycleData.transitions.length; i++) {
          let transition = lifecycleData.transitions[i];
          const row = {key: transition.code, name: transition.name,};
          for (let stage of this.stageData) {
            row[stage.key] = {index: i, transition: transition.code, state: stage.key, checked: false};
          }

          for (let transform of stageActive.transform) {
            if (transition.code === transform.transition) {
              for (let state of transform.state) {
                row[state]['checked'] = true;
              }
              break;
            }
          }
          this.data.push(row);
        }
        return this.data;
      }
    }
  }
</script>

<style scoped>

</style>
