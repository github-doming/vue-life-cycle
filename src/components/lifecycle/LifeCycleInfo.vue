<template>
	<div style="height: 561px;">
		<div class="tab-title">
			特性 - 生命周期
		</div>
		<a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 8 }">
			<a-form-item label="类型">
				<a-radio-group @change="typeChange" :default-value="templateInfo.type">
					<a-radio value="basic"> 基本</a-radio>
					<a-radio value="advanced"> 高级</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="名称">
				<a-input :default-value="templateInfo.name" @change="nameChange" placeholder="请输入生命周期模板名称"/>
			</a-form-item>
			<a-form-item label="说明">
				<a-textarea @change="descriptionChange" :auto-size="{ minRows: 1, maxRows: 5 }"
										:default-value="templateInfo.description"/>
			</a-form-item>
			<a-form-item label="类">
				<a-select :default-value="templateInfo.supportClass" @change="classChange" placeholder="请选择模板支持类">
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
		font-size: 15px;
		padding: 10px 0 0 25px;
	}
</style>