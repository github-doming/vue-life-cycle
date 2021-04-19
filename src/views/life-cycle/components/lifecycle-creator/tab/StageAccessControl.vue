<template>
  <div>
    <div class="ac-role ac-table-left">
      <a-table :columns="roleColumns" :data-source="roleData" :customRow="rowEvent"
               :scroll="{y: 300}" size="small" :pagination="false">
        <a-radio slot="radio" slot-scope="name" :checked="currentRole.name === name">{{name}}</a-radio>
      </a-table>
    </div>
    <div class="ac-table-left" style="">
      <a-table :columns="accessColumns" :data-source="accessData" :scroll="{y: 300}" size="small" :pagination="false">
        <a-checkbox slot="access" slot-scope="option" :key="option.code" v-model="option.checked"
                    :disabled="!currentRole" @change="accessChange(option)">{{option.name}}
        </a-checkbox>
      </a-table>

    </div>
  </div>
</template>

<script>
  import LifeCycleData from '../../js/LifeCycleData'

  export default {
    name: "StageAccessControl",
    props: {
      roles: {
        type: Array,
        required: true,
      }
    },
    data() {
      let local = JSON.parse(localStorage.getItem('lifeCycleLocal'));
      return {
        local, roleData: [], currentRole: null, accessData: [],
        roleColumns: [{
          title: local.selectedRole, dataIndex: 'name', key: 'key', scopedSlots: {customRender: 'radio'},
        }],
        accessColumns: [{title: local.access, dataIndex: 'option', key: 'key', scopedSlots: {customRender: 'access'},}],

      }
    },
    watch: {
      roles(newValue) {
        this.roleData = [];
        for (let role of newValue) {
          role.key = role.code;
          this.roleData.push(role);
        }
      },
      roleData(newValue) {
        if (newValue.length === 0) {
          this.currentRole = null;
          return;
        }
        this.currentRole = newValue[0];
        if (this.currentRole.access === undefined) {
          this.currentRole.access = [];
        }
      },
      currentRole(newValue) {
        if (newValue == null) {
          this.renderData([]);
        } else {
          this.renderData(newValue.access);
        }
      }
    },
    created() {
      this.roleData = [];
      for (let role of this.roles) {
        role.key = role.code;
        this.roleData.push(role);
      }
      if (this.roleData.length === 0) {
        this.currentRole = null;
        this.renderData([]);
      } else {
        this.currentRole = this.roleData[0];
        if (this.currentRole.access === undefined) {
          this.currentRole.access = [];
        }
      }
    },
    methods: {
      rowEvent(record) {
        return {
          on: {
            click: () => {
              if (record.access == null) {
                record.access = [];
              }
              this.currentRole = record;
            }
          }
        }
      },
      accessChange(option) {
        if (option.checked) {
          this.currentRole.access.push(option.key);
        } else {
          this.currentRole.access.splice(this.currentRole.access.indexOf(option.key), 1);
        }
      },
      renderData(access) {
        this.accessData = [];
        for (let data of LifeCycleData.accesses) {
          const row = {key: data.code, option: {key: data.code, name: data.name, checked: false}};
          for (let key of access) {
            if (key === data.code) {
              row.option.checked = true;
              break;
            }
          }
          this.accessData.push(row);
        }
      },
    }
  }
</script>

<style scoped>
  .ac-role {
    height: 398px;
    margin-right: 50px;
  }

  .ac-table-left {
    float: left;
    width: 250px;
  }
</style>
