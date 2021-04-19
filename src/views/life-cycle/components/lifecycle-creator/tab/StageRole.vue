<template>
  <div>
    <a-transfer :data-source="options" :target-keys="targetKeys" :titles="[local.availableRoles,local.selectedRole]"
                :operations="[local.add, local.remove]" :list-style="{width: '250px',height: '340px',}"
                :locale="{ itemUnit: local.item, itemsUnit: local.item, notFoundContent: local.emptyList, searchPlaceholder: local.enterSearchContent }"
                :filter-option="(inputValue, option)=> option.title.indexOf(inputValue) > -1"
                @change="handleChange" :render="item => item.title" show-search>
    </a-transfer>
  </div>
</template>

<script>
  import LifeCycleData from '../../js/LifeCycleData'

  export default {
    name: "StageRole",

    props: {
      currentStage: {
        type: Object,
        required: true,
      }
    },
    computed: {
      targetKeys() {
        const targetKeys = [];
        for (let role of this.currentStage.roles) {
          targetKeys.push(role.code);
        }
        return targetKeys;
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
        options: JSON.parse(JSON.stringify(LifeCycleData.roles).replace(/code/g, 'key').replace(/name/g, 'title')),
      }
    },

    methods: {
      handleChange(targetKeys) {
        const newRoles = [];
        for (let role of LifeCycleData.roles) {
          if (targetKeys.indexOf(role.code) > -1) {
            let isNew = true;
            for (let stageRole of this.currentStage.roles) {
              if (role.code === stageRole.code) {
                newRoles.push(stageRole);
                isNew = false;
                break;
              }
            }
            if (isNew) {
              newRoles.push({code: role.code, name: role.name, oid: role.oid});
            }
          }
        }
        this.currentStage.roles = newRoles;
      },
    }
  }
</script>

<style scoped>

</style>
