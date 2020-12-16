<template>
	<div>
		<a-transfer
						:data-source="options" :target-keys="targetKeys()" :render="item => item.title"
						:titles="['可用角色', '选定角色']" :operations="['添加', '移除']" :list-style="{width: '250px',height: '398px',}"
						:locale="{ itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容' }"
						@change="handleChange" :filter-option="filterOption" show-search>
		</a-transfer>
	</div>
</template>

<script>
  import {EventBus} from "@/component";
  import lifecycleData from './LifecycleData.json';

  export default {
    name: "StageRole",
    props: {
      stageActive: {
        type: Object,
        required: true,
      },
    },

    computed:{
      options(){
        return JSON.parse(JSON.stringify(lifecycleData.roles).replace(/code/g, 'key').replace(/name/g, 'title'));
      }
    },
    methods: {
      filterOption(inputValue, option) {
        return option.title.indexOf(inputValue) > -1;
      },
      targetKeys(){
        const targetKeys = [];
        for (let role of this.stageActive.roles) {
          targetKeys.push(role.code);
        }
        return targetKeys;
			},
      handleChange(targetKeys) {
        const role = [];
        for (let data of lifecycleData.roles) {
          if (targetKeys.indexOf(data.code) > -1) {
            role.push(data);
          }
        }
        EventBus.$emit('roleData', role);
      },
    }
  }
</script>

<style scoped>

</style>