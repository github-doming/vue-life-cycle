<template>
  <div>
    <a-transfer :data-source="options" :target-keys="targetKeys" :titles="[local.availableRoles,local.selectedRole]"
                :operations="[local.add, local.remove]" :list-style="{width: '250px',height: '340px',}"
                :locale="{ itemUnit: local.item, itemsUnit: local.item, notFoundContent: local.emptyList, searchPlaceholder: local.enterSearchContent }"
                :render="item => item.title" :selectedKeys="[]">
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
  }
</script>

<style scoped>

</style>
