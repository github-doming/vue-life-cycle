<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 16}">
        <a-transfer :data-source="options" :target-keys="targetKeys" :titles="[local.availableRoles,local.selectedRole]"
                    :operations="[local.add, local.remove]" :list-style="{width: '250px',height: '340px',}"
                    :locale="{ itemUnit: local.item, itemsUnit: local.item, notFoundContent: local.emptyList, searchPlaceholder: local.enterSearchContent }"
                    :filter-option="(inputValue, option)=> option.title.indexOf(inputValue) > -1"
                    @change="handleChange" @selectChange="handleSelectChange" :render="item => item.title" show-search>
        </a-transfer>
      </a-col>
      <a-col :xs="{ span: 2, offset: 1 }">
        <div style="width: 250px">
          <a-table :columns="participantColumns" :data-source="participants" :scroll="{ y: 340 }"
                   :pagination="false" size="small" :showHeader="false">
            <template slot="title">
              <span class="ant-transfer-list-header-selected">
                <span>{{participantTitle}}</span>
                <a-button type="link" size="small" class="ant-transfer-list-header-title"
                          @click="selectParticipant">{{local.select+local.participant}}</a-button>
              </span>
            </template>
          </a-table>
        </div>
      </a-col>
    </a-row>

    <a-modal v-model="participantShow" :title="participantTitle" @ok="handleParticipant" :maskClosable="false"
             width="80%" :bodyStyle="{ 'padding': '5px 8px 8px' }" :ok-text="local.ok" :cancel-text="local.cancel">
      <div>
        <stage-role-participant :participants="participantData"></stage-role-participant>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import LifeCycleData from '../../js/LifeCycleData'
  import StageRoleParticipant from "./StageRoleParticipant";

  export default {
    name: "StageRole",
    components: {StageRoleParticipant},
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
      participantTitle() {
        for (let i = 0; i < this.options.length; i++) {
          let role = this.options[i];
          if (role.key === this.lastTargetKey) {
            return this.local.participant + " - " + role.title;
          }
        }
        return this.local.participant + " - ";
      },
      participants() {
        if (!this.lastTargetKey) {
          return [];
        }
        for (let stageRole of this.currentStage.roles) {
          if (this.lastTargetKey === stageRole.code) {
            return stageRole.participants;
          }
        }
        return [];
      },
    },
    data() {
      const local = JSON.parse(localStorage.getItem('lifeCycleLocal'));
      const participantColumns = [
        {title: local.participant, dataIndex: 'name', key: 'name'},
      ];
      return {
        options: JSON.parse(JSON.stringify(LifeCycleData.roles).replace(/code/g, 'key').replace(/name/g, 'title')),
        local, lastTargetSelectedKeys: [], lastTargetKey: null, participantShow: false, participantColumns,
        participantData:[],
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
              newRoles.push({code: role.code, name: role.name, oid: role.oid, participants: []});
            }
          }
        }
        this.currentStage.roles = newRoles;
        this.lastTargetKey = null;

      },
      handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.lastTargetKey = this.getArrDifference(targetSelectedKeys, this.lastTargetSelectedKeys)[0];
        this.lastTargetSelectedKeys = targetSelectedKeys;
      },
      handleParticipant() {
        for (let stageRole of this.currentStage.roles) {
          if (this.lastTargetKey === stageRole.code) {
            stageRole.participants = this.participantData;
          }
        }
        this.participantShow = false;
      },
      selectParticipant() {
        if (this.lastTargetKey) {
          this.participantShow = true;
          this.participantData = this.participants.concat();
        }
      },
      getArrDifference(arr1, arr2) {
        return arr1.concat(arr2).filter(function (v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v);
        });

      },
    }
  }
</script>

<style scoped>

</style>
