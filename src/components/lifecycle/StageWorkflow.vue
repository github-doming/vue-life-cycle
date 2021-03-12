<template>
	<div style="height: 398px;">
		<a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 20 }">
			<a-form-item :label="local.stage+local.process">
				<a-row :gutter="24">
					<a-col :span="12">
						<a-button type="link" @click="showModal('phase')">{{workflowMap[data['phase'].process]}}</a-button>
					</a-col>
					<a-col :span="3">
						<a-button @click="showModal('phase')"> {{local.skim}}...</a-button>
					</a-col>
					<a-col :span="7">
						<a-checkbox v-model="data.phase.lastVersion" @change="lastVersionChange()"
												:disabled="emptyProcess('phase')">{{local.lastVersion}}
						</a-checkbox>
					</a-col>
					<a-col :span="2">
						<a-button type="dashed" @click="clearProcess('phase')"
											:disabled="emptyProcess('phase')"> {{local.clear}}
						</a-button>
					</a-col>
				</a-row>
			</a-form-item>
			<a-form-item :label="local.gate+local.process" v-show="lastStage">
				<a-row :gutter="24">
					<a-col :span="12">
						<a-button type="link" @click="showModal('gateway')">{{workflowMap[data['gateway'].process]}}
						</a-button>
					</a-col>
					<a-col :span="3">
						<a-button @click="showModal('gateway')"> {{local.skim}}...</a-button>
					</a-col>
					<a-col :span="7">
						<a-checkbox v-model="data.gateway.lastVersion" @change="lastVersionChange"
												:disabled="emptyProcess('gateway')">{{local.lastVersion}}
						</a-checkbox>
					</a-col>
					<a-col :span="2">
						<a-button type="dashed" @click="clearProcess('gateway')"
											:disabled="emptyProcess('gateway')"> {{local.clear}}
						</a-button>
					</a-col>
				</a-row>
			</a-form-item>
		</a-form>
		<a-modal v-model="visible" :title="local.selectTemplateProcess" @ok="workflowOk" :ok-text="local.ok" :cancel-text="local.cancel">
			<a-radio-group v-model="process" @change="workflowChange">
				<a-radio class="radios-style" v-for="item in workflows" :key="item.code" :value="item.code">{{item.name}}
				</a-radio>
			</a-radio-group>
		</a-modal>
	</div>
</template>

<script>
  import lifecycleData from './LifecycleData.json';
  import {EventBus} from "@/component";

  export default {
    name: "StageWorkflow",
    props: {
      workflowData: {
        type: Object,
        required: true,
      },
      lastStage: {
        type: Boolean,
        required: true,
      },
    },
    watch: {
      workflowData(newValue) {
        this.data = newValue.gateway === undefined ? {
          phase: {process: null, lastVersion: false},
          gateway: {process: null, lastVersion: false},
        } : newValue;
      },
    },
    computed: {
      workflowMap() {
        const workflowMap = {};
        lifecycleData.workflows.forEach(active => {
          workflowMap[active.code] = active.name;
        });
        return workflowMap;
      },
    },
    created() {
      this.data = this.workflowData.gateway === undefined ? {
        phase: {process: null, lastVersion: false},
        gateway: {process: null, lastVersion: false},
      } : this.workflowData;
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
        visible: false,
        workflows: lifecycleData.workflows,
        data: null,
        type: null,
        process: null,
      }
    },
    methods: {

      emptyProcess(type) {
        return this.data[type].process === null || this.workflowMap[this.data[type].process] === null;
      },
      showModal(type) {
        this.type = type;
        this.process = this.data[type].process;
        this.visible = true;
      },
      workflowChange(event) {
        this.process = event.target.value
      },
      workflowOk() {
        this.data[this.type].process = this.process;
        EventBus.$emit('workflowData', this.data);
        this.visible = false;
      },
      lastVersionChange() {
        EventBus.$emit('workflowData', this.data);
      },

      clearProcess(type) {
        this.data[type].process = null;
        this.data[type].lastVersion = false;
        EventBus.$emit('workflowData', this.data);
      },
    },
  }
</script>

<style scoped>
	.radios-style {
		display: block;
		height: 30px;
		lineHeight: 30px;
	}
</style>
