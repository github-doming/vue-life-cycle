<template>
	<div style="height: 56vh">
		<div class="tab-title">
			{{local.feature}} - {{local.lifeCycle}}
		</div>
		<a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 8 }">
			<a-form-item :label="local.type">
				<a-radio-group @change="typeChange" :default-value="templateInfo.type">
					<a-radio value="basic">{{local.basic}}</a-radio>
					<a-radio value="advanced"> {{local.advance}}</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item :label="local.name">
				<a-input :default-value="templateInfo.name" @change="nameChange" :placeholder="local.enterLifeCycleName"/>
			</a-form-item>
			<a-form-item :label="local.description">
				<a-textarea @change="descriptionChange" :auto-size="{ minRows: 1, maxRows: 5 }"
										:default-value="templateInfo.description"/>
			</a-form-item>
			<a-form-item :label="local.clazz">
				<a-select :default-value="templateInfo.supportClass" @change="classChange" :placeholder="local.selectSupportClass">
					<a-select-option v-for="item in supportClass" :key="item.code" :value="item.code">
						{{item.name}}
					</a-select-option>
				</a-select>
			</a-form-item>
		</a-form>

	</div>
</template>

<script>
  import lifecycleData from './LifecycleData.json';

  export default {
    name: "LifeCycleInfo",
    props: {
      templateInfo: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
        supportClass: lifecycleData.supportClass,
        infoData: this.templateInfo,
      }
    },

    methods: {
      typeChange(event) {
        this.infoData.type = event.target.value;
        this.$emit('infoChange', this.infoData);
      },
      nameChange(event) {
        this.infoData.name = event.target.value;
        this.$emit('infoChange', this.infoData);
      },

      descriptionChange(event) {
        this.infoData.description = event.target.value;
        this.$emit('infoChange', this.infoData);
      },

      classChange(value) {
        this.infoData.supportClass = value;
        this.$emit('infoChange', this.infoData);
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
</style>
