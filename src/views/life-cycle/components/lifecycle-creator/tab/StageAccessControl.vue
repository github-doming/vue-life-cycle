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
        <a-checkbox slot="access" slot-scope="boolean,record" :key="record.key" v-model="record.checked"
                    :disabled="!currentRole" @change="accessChange(record)">{{record.name}}
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
        accessColumns: [{title: local.access, dataIndex: 'access', key: 'key', scopedSlots: {customRender: 'access'},}],

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
        const access = this.currentRole.access;
        const associate = LifeCycleData.accessesAssociate;
        const key = option.key;
        const data = this.accessData;
        if (option.checked) {
          access.push(key);
          if (associate[key]) {
            associate[key].forEach(item => {
              access.push(item);
              data.forEach(datum => {
                if (datum.key === item) {
                  console.log(datum);
                  datum.checked = true;
                }
              })
            })
          }
        } else {
          access.splice(access.indexOf(key), 1);
          if (associate[key]) {
            associate[key].forEach(item => {
              access.splice(access.indexOf(item), 1);
              data.forEach(datum => {
                if (datum.key === item) {
                  datum.checked = false;
                }
              })
            })
          }
        }
      },
      renderData(access) {
        this.accessData = [];
        for (let data of LifeCycleData.accesses) {
          const row = {key: data.code,name: data.name, checked: false};
          for (let key of access) {
            if (key === data.code) {
              row.checked = true;
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
