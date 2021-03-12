<template>
	<div>
		<div class="tab-title">
			{{local.feature}} - {{local.stage}}
		</div>
		<div class="tab-props">
			<div style="float: left;margin-right: 50px">
				<label>{{local.status}}：</label>
				<a-select style="width: 150px" :placeholder="local.selectStatus" :key="stageActive.code" :default-value="stageActive.code"
									@change="stateChange" show-search>
					<a-select-option v-for="item in states" :key="item.code">{{item.name}}</a-select-option>
				</a-select>
			</div>
			<div>
				<label>{{local.versionSeries}}：</label>
				<a-select style="width: 150px" :placeholder="local.selectVersionSeries" :key="stageActive.version"
									:default-value="stageActive.version" @change="versionChange">
					<a-select-option v-for="item in versions" :key="item.code">
						{{item.name}}
					</a-select-option>
				</a-select>
			</div>
		</div>
		<div style="margin-left: 10px">
			<a-tabs  size="small" type="card"  :key="baseType ? 'transform' : ''" :default-active-key="baseType ? 'transform' : ''">
				<a-tab-pane key="transform" :tab="local.stage">
					<StageTransform :stageData="stageData" :stageActive="stageActive"/>
				</a-tab-pane>
				<a-tab-pane key="role" :tab="local.role" :disabled="baseType">
					<StageRole :stageActive="stageActive"/>
				</a-tab-pane>
				<a-tab-pane key="accessControl" :tab="local.accessControl" :disabled="baseType">
					<StageAccessControl :roles="stageActive.roles"/>
				</a-tab-pane>
				<a-tab-pane key="workflow" :tab="local.workflow" :disabled="baseType">
					<StageWorkflow
									:workflowData="stageActive.workflow"
									:lastStage="stageData.length===0 ||stageActive.key !== stageData[stageData.length-1].key"/>
				</a-tab-pane>
			</a-tabs>
		</div>

	</div>
</template>

<script>
  import StageTransform from "./StageTransform";
  import StageRole from "./StageRole";
  import StageAccessControl from "./StageAccessControl";
  import StageWorkflow from "./StageWorkflow";
  import lifecycleData from './LifecycleData.json';

  export default {
    name: "LifeCycleStage",
    props: {
      lcData: {
        type: Object,
        required: true,
      },
      stageActive: {
        type: Object,
        required: true,
      },
    },
    components: {StageWorkflow, StageAccessControl, StageRole, StageTransform},
    computed: {
      stageData() {
        return this.lcData.stage.data;
      },
      baseType() {
        return this.lcData.info.type === 'basic';
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
        states: lifecycleData.states, versions: lifecycleData.versions, roles: [],
      }
    },
    methods: {
      stateChange(stateCode) {
        this.$emit('stateChange', stateCode);
      },
      versionChange(versionCode) {
        this.$emit('versionChange', versionCode);
      },
    },
  }
</script>

<style scoped>
	.tab-title {
		padding-left: 4px;
		padding-top: 0;
		font-size: 20px;
	}

	.tab-props {
		padding: 0 0 10px 25px;
	}
</style>
