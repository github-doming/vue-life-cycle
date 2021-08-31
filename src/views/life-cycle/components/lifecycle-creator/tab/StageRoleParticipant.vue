<template>
  <a-row type="flex" justify="space-between" align="middle">
    <a-col :xs="{ span: 12}">
      <a-tabs v-model="activeSource" size="small" style="height: 540px;" @change="changeTab">
        <a-tab-pane key="group" :tab="local.group">
          <div>
            <a-form :label-col="fromCol.labelCol" :wrapper-col="fromCol.wrapperCol">
              <!--  <a-form-item label="服务">-->
              <!--  <a-input/>-->
              <!--    </a-form-item>-->
              <a-form-item :label="local.group+local.name">
                <a-input class="from-input" v-model="from.group.groupName"/>
                <a-button type="primary" class='from-btn' @click="findParticipant">{{local.find}}</a-button>
              </a-form-item>
            </a-form>
            <a-table :columns="groupColumns" :data-source="groupData" :scroll="{ x:900, y: 385 }"
                     :pagination="false" size="small" :customRow="sourceRow"
                     :row-selection="{ selectedRowKeys: sourceRowKeys, onChange: onSourceChange }"/>
          </div>
        </a-tab-pane>
        <a-tab-pane key="user" :tab="local.user">
          <div>
            <a-form :label-col="fromCol.labelCol" :wrapper-col="fromCol.wrapperCol">
              <!--  <a-form-item label="服务">-->
              <!--  <a-input/>-->
              <!--    </a-form-item>-->
              <a-form-item :label="local.username">
                <a-input v-model="from.user.userName"/>
              </a-form-item>
              <a-form-item :label="local.fullName">
                <a-input class="from-input" v-model="from.user.fullName"/>
                <a-button type="primary" class='from-btn' @click="findParticipant">{{local.find}}</a-button>
              </a-form-item>
            </a-form>
            <a-table :columns="userColumns" :data-source="userData" :scroll="{ x:1000, y: 320 }"
                     :pagination="false" size="small" :customRow="sourceRow"
                     :row-selection="{ selectedRowKeys: sourceRowKeys, onChange: onSourceChange }"/>
          </div>
        </a-tab-pane>
        <a-tab-pane key="org" :tab="local.organization">
          <div>
            <a-form :label-col="fromCol.labelCol" :wrapper-col="fromCol.wrapperCol">
              <!--  <a-form-item label="服务">-->
              <!--  <a-input/>-->
              <!--    </a-form-item>-->
              <a-form-item :label="local.organization+local.name">
                <a-input class="from-input" v-model="from.org.orgName"/>
                <a-button type="primary" class='from-btn' @click="findParticipant">{{local.find}}</a-button>
              </a-form-item>
            </a-form>
            <a-table :columns="orgColumns" :data-source="orgData" :scroll="{ x:900, y: 385 }"
                     :pagination="false" size="small" :customRow="sourceRow"
                     :row-selection="{ selectedRowKeys: sourceRowKeys, onChange: onSourceChange }"/>

          </div>
        </a-tab-pane>
        <a-tab-pane key="actor" :tab="local.operator">
          <a-table :columns="actorColumns" :data-source="actorData"
                   :pagination="false" size="small" :customRow="sourceRow"
                   :row-selection="{ selectedRowKeys: sourceRowKeys, onChange: onSourceChange }"/>
        </a-tab-pane>
        <a-tab-pane key="role" :tab="local.role">
          <a-table :columns="roleColumns" :data-source="roleData" :scroll="{  y: 385 }"
                   :pagination="false" size="small" :customRow="sourceRow"
                   :row-selection="{ selectedRowKeys: sourceRowKeys, onChange: onSourceChange }"/>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col :xs="{ span: 2 }">
      <div class="ant-transfer-operation" style="padding-left: 15px;">
        <a-button type="button" @click="add">{{local.add}}</a-button>
        <a-button type="button" @click="remove">{{local.remove}}</a-button>
      </div>
    </a-col>
    <a-col :xs="{ span: 10 }">
      <a-tabs default-active-key="1" size="small" style="height: 540px;">
        <a-tab-pane key="1" :tab="local.participant">
          <a-table ref="participantTable" :columns="participantColumns" :data-source="participants"
                   :scroll="{x:900, y:450 }" :pagination="false" size="small" :customRow="sourceRow"
                   :row-selection="{ selectedRowKeys: participantRowKeys, onChange: onParticipantChange }"/>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>


</template>

<script>

  import {Http} from "../../js/LifeCycleHelper";
  import LifeCycleData from "../../js/LifeCycleData";


  export default {
    name: "StageRoleParticipant",
    props: {
      participants: {
        type: Array,
        required: true,
      }
    },
    data() {
      const local = JSON.parse(localStorage.getItem('lifeCycleLocal'));
      const participantColumns = [
        {title: local.participant, dataIndex: 'name', key: 'name', fixed: 'left', width: 100},
        {title: local.service, dataIndex: 'service', key: 'service', width: 150},
        {title: local.qualifier, dataIndex: 'qualifier', key: 'qualifier'},
      ];
      const groupColumns = [
        {title: local.group + local.name, dataIndex: 'name', key: 'name', fixed: 'left', width: 100},
        {title: local.service, dataIndex: 'service', key: 'service', width: 150},
        {title: local.qualifier, dataIndex: 'qualifier', key: 'qualifier'},
      ];
      const userColumns = [
        {title: local.fullName, dataIndex: 'fullName', key: 'fullName', fixed: 'left', width: 100},
        {title: local.username, dataIndex: 'name', key: 'name', width: 100},
        {title: local.service, dataIndex: 'service', key: 'service', width: 150},
        {title: local.qualifier, dataIndex: 'qualifier', key: 'qualifier'},
      ];
      const orgColumns = [
        {title: local.organization, dataIndex: 'name', key: 'name', fixed: 'left', width: 100},
        {title: local.service, dataIndex: 'service', key: 'service', width: 150},
        {title: local.qualifier, dataIndex: 'qualifier', key: 'qualifier'},
      ];
      const actorColumns = [
        {title: local.operator, dataIndex: 'name', key: 'name'},
      ];
      const roleColumns = [
        {title: local.role, dataIndex: 'name', key: 'name'},
      ];
      const roles = [];
      LifeCycleData.roles.forEach(role => {
        roles.push({code: role.code, name: role.name, type: 'role', service: '', qualifier: ''})
      });
      const roleActor = [{code: "creator", name: local.creator, type: 'actor', service: '', qualifier: ''}];
      return {
        local, fromCol: {labelCol: {span: 3}, wrapperCol: {span: 16}}, activeSource: 'group', roles, roleActor,
        groupColumns, userColumns, participantColumns, orgColumns, actorColumns, roleColumns, groupData: [],
        userData: [], orgData: [], actorData: [], roleData: [], sourceRowKeys: [], participantRowKeys: [],
        from: {group: {groupName: ''}, user: {userName: '', fullName: ''}, org: {orgName: ''}}
      }
    },
    computed: {
      optionData() {
        if (this.activeSource === 'group') {
          return this.groupData;
        } else if (this.activeSource === 'user') {
          return this.userData;
        } else if (this.activeSource === 'org') {
          return this.orgData;
        } else if (this.activeSource === 'actor') {
          return this.actorData;
        } else if (this.activeSource === 'role') {
          return this.roleData;
        }
        return [];
      }
    },
    methods: {
      findParticipant() {
        let that = this;
        Http.getParticipant(this.activeSource, this.from[this.activeSource]).then(result => {
          that.parseLeftList(result);
        });
      },
      parseLeftList(resultData) {
        let that = this;
        that.optionData.length = 0;
        resultData.forEach(item => {
          for (let i = 0; i < that.participants.length; i++) {
            let participant = that.participants[i];
            if (participant.key === item.code) {
              return;
            }
          }
          item.key = item.code;
          item.type = that.activeSource;
          that.optionData.push(item);
        });
      },
      sourceRow() {
        return {
          on: { // 事件
            click: (event) => {
              event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
            },
          },

        };
      },
      onSourceChange(selectedRowKeys) {
        this.sourceRowKeys = selectedRowKeys;
      },
      onParticipantChange(selectedRowKeys) {
        this.participantRowKeys = selectedRowKeys;
      },
      add() {
        let that = this;
        that.sourceRowKeys.forEach(key => {
          that.optionData.forEach((item, index) => {
            if (item.key === key) {
              that.optionData.splice(index, 1);
              that.participants.push(item);
            }
          });
        });
        that.sourceRowKeys = [];
      },
      remove() {
        let that = this;
        that.participantRowKeys.forEach(key => {
          that.participants.forEach((item, index) => {
            if (item.key === key) {
              that.participants.splice(index, 1);
              if (that.activeSource === item.type) {
                that.optionData.push(item);
              }
            }
          });
        });
        that.participantRowKeys = [];
      },
      changeTab() {
        this.sourceRowKeys = [];
        if (this.activeSource === 'actor') {
          this.parseLeftList(this.roleActor)
        } else if (this.activeSource === 'role') {
          this.parseLeftList(this.roles)
        }
      },
    },

  }
</script>

<style scoped>
  .table-left {
    width: 100%;
    border: 1px #ddd solid;
    background: #fff;
    overflow: auto;
  }

  .from-input {
    display: inline-block;
    width: calc(100% - 74px);
  }

  .from-btn {
    margin-left: 10px
  }

  table {
    width: 100%;
    height: 100%;
  }

  table th, table td {
    padding: 5px 10px;
    text-align: left;
    border: 1px #ddd solid;
  }

  table td {
    border: none;
    border-bottom: 1px #ddd solid;
  }

  table tr:hover {
    background: #f8f8f8;
  }

  table th {
    border-top: none;
    background: #e9e9e9;
  }

  table th:first-child {
    border-left: none;
  }

  table th:last-child {
    border-right: none;
  }

  table tr.hover {
    background: #eeeeee;
  }
</style>
