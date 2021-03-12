<template>
	<div>
		<a-transfer
						:data-source="options" :target-keys="targetKeys()" :render="item => item.title"
						:titles="[local.availableRoles,local.selectedRole]" :operations="[local.add, local.remove]" :list-style="{width: '250px',height: '398px',}"
						:locale="{ itemUnit: local.item, itemsUnit: local.item, notFoundContent: local.emptyList, searchPlaceholder: local.enterSearchContent }"
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
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
      };
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
