<template>
	<div>
		<div style="float: left;width: 250px;height: 398px;margin-right: 50px">
			<a-table
							:pagination="false" :scroll="{y: 350}" :columns="roleColumns" :data-source="roleData"
							:customRow="rowEvent" size="small">
				<a-radio slot="radio" slot-scope="name" :checked="currentRole.name === name">{{name}}</a-radio>
			</a-table>
		</div>
		<div style="float: left;width: 250px;">
			<a-table :pagination="false" :scroll="{y: 350}" :columns="accessColumns" :data-source="accessData" size="small">
				<template slot="access" slot-scope="option">
					<a-checkbox :key="option.code" :checked="option.checked"
											:disabled="currentRole == null" @change="accessChange($event,option)">{{option.name}}
					</a-checkbox>
				</template>
			</a-table>

		</div>
	</div>
</template>

<script>
  import {EventBus} from "@/component";
  import lifecycleData from './LifecycleData.json';

  const roleColumns = [{title: '选定角色', dataIndex: 'name', key: 'key', scopedSlots: {customRender: 'radio'},}];
  const accessColumns = [{title: '权限', dataIndex: 'option', key: 'key', scopedSlots: {customRender: 'access'},}];

  export default {
    name: "StageAccessControl",
    props: {
      roles: {
        type: Array,
        required: true,
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
    data() {
      return {
        roleColumns,
        accessColumns,
        currentRole: null,
        accessData: null,
        roleData: [],
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

      accessChange(event, option) {
        if (event.target.checked) {
          this.currentRole.access.push(option.key);
        } else {
          this.currentRole.access.splice(this.currentRole.access.indexOf(option.key), 1);
        }
        option.checked = event.target.checked;
        EventBus.$emit('roleAccessData', this.currentRole);
      },
      renderData(access) {
        this.accessData = [];
        for (let data of lifecycleData.accesses) {
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
    },
  }


</script>

<style scoped>


</style>