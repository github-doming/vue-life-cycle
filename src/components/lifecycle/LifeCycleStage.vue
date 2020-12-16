<template>
	<div>
		<div class="tab-title">
			特性 - 阶段
		</div>
		<div class="tab-props">
			<div style="float: left;margin-right: 50px">
				<label>状态：</label>
				<a-select style="width: 150px" placeholder="请选择状态" :key="stageActive.code" :default-value="stageActive.code"
									@change="stateChange" show-search>
					<a-select-option v-for="item in states" :key="item.code">{{item.name}}</a-select-option>
				</a-select>
			</div>
			<div>
				<label>版本系列：</label>
				<a-select style="width: 150px" placeholder="请选择版本系列" :key="stageActive.version"
									:default-value="stageActive.version" @change="versionChange">
					<a-select-option v-for="item in versions" :key="item.code">
						{{item.name}}
					</a-select-option>
				</a-select>
			</div>
		</div>
		<div style="margin-left: 10px">
			<a-tabs type="card" :key="baseType ? 'transform' : ''" :default-active-key="baseType ? 'transform' : ''">
				<a-tab-pane key="transform" tab="转换">
					<StageTransform :stageData="stageData" :stageActive="stageActive"/>
				</a-tab-pane>
				<a-tab-pane key="role" tab="角色" :disabled="baseType">
					<StageRole :stageActive="stageActive"/>
				</a-tab-pane>
				<a-tab-pane key="accessControl" tab="访问控制" :disabled="baseType">
					<StageAccessControl :roles="stageActive.roles"/>
				</a-tab-pane>
				<a-tab-pane key="workflow" tab="工作流" :disabled="baseType">
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
		padding: 10px 0 25px 25px;
		font-size: 20px;
	}

	.tab-props {
		padding: 0 0 10px 25px;
	}
</style>