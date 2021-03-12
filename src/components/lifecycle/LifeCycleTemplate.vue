<template>
	<div>
		<div>
			<a-button class="top-button" @click="addStage" icon="plus-square"/>
			<a-button class="top-button" @click="cutStage" icon="scissor"/>
			<a-button class="top-button" @click="copyStage" icon="snippets"/>
			<a-button class="top-button" @click="pasteStage" icon="copy"/>
			<a-button class="top-button" @click="deleteStage" icon="close"/>
		</div>
		<div style="padding: 4px">
			<h3>{{local.lifeCycle}}-{{lcData.info.name}}</h3>
			<div>
				<a-checkbox v-model="lcData.info.routing"> {{local.isRouting}}</a-checkbox>
				<a-checkbox v-model="lcData.info.enabled"> {{local.isEnable}}</a-checkbox>
			</div>
		</div>
		<div @click="activeState = ''">
			<a-row style="background: #f7f7f7;height: 150px;overflow: auto;" type="flex" align="middle" justify="center">
				<draggable v-model="stageData" @start="drag=true" @end="drag=false" class="ant-row-flex">
					<Stage
									v-for="(item,i) in stageData" :key="item.key" :phaseKey="item.key" :gate="i!== stageData.length-1"
									:class="{'current-state':activeState === item.key}"
									@stageClick="stageChange">
						<span slot="phase">{{phaseName(item.code)}}</span>
					</Stage>
				</draggable>
			</a-row>
		</div>
		<div style="margin-top: 10px;border-radius: 8px;box-shadow: 0 1px 4px 0 rgba(255, 90, 91, 0.18);">
			<LifeCycleInfo v-show="activeState === '' " :templateInfo="lcData.info" @infoChange="infoChange"/>
			<LifeCycleStage v-show="activeState !== '' " :lcData="lcData" :stageActive="activeStage"
											@stateChange="stateChange" @versionChange="versionChange"/>
		</div>
		<div style="margin-top: 10px">
			<a-button class="bottom-button" type="primary" @click="subData"> {{local.save}}</a-button>
			<a-button class="bottom-button" @click="saveData"> {{local.download}}</a-button>
			<a-button class="bottom-button" @click="cancelData" type="danger"> {{local.cancel}}</a-button>
		</div>
	</div>

</template>

<script>
  const meta = {
    data: {
      templateData: {
        info: {type: 'advanced', name: '测试模板名称', supportClass: 'java.lang.String', routing: true, enabled: true},
        stage: {
          activeState: '',
          data: [{
            code: 'RELEASE', key: '1', version: 'Number',
            roles: [{code: '1', name: 'CAD作者', oid: '1'}, {code: '2', name: 'CAPA实施者', oid: '2', access: ['-1', '2']},
              {code: '12', name: 'CAPA请求者', oid: '12', access: ['5', '8']},],
            transform: [{transition: '1', state: ['1', '2', '3', '4']}, {transition: '2', state: ['5', '3', '4']},
              {transition: '3', state: ['1', '3', '5']}, {transition: '7', state: ['1', '2', '4']},],
            workflow: {
              phase: {process: 'Apple', lastVersion: false},
              gateway: {process: 'Pear', lastVersion: true}
            },
          },
            {code: 'UNDERREVEW', key: '2', roles: [], transform: [], workflow: {},},
            {code: 'SUBMITTING', key: '3', roles: [], transform: [], workflow: {},},
            {code: 'REJECTED', key: '4', roles: [], transform: [], workflow: {},},
            {code: 'CLOSED', key: '5', roles: [], transform: [], workflow: {},}],
        },
      },
      states: [{name: "Release", code: "RELEASE", oid: '1',},
        {name: "In Work", code: "INWORK", oid: '2',},
        {name: "Approved", code: "APPROVED", oid: '3',},
        {name: "Closed", code: "CLOSED", oid: '4',},
        {name: "Open", code: "OPEN", oid: '2',},
        {name: "Rejected", code: "REJECTED", oid: '5',},
        {name: "Released", code: "RELEASED", oid: '6',},
        {name: "Rework", code: "REWORK", oid: '7',},
        {name: "Under Revew", code: "UNDERREVEW", oid: '8',},
        {name: "withdrawn", code: "WITHDRAIN", oid: '9',},
        {name: "Cancelled", code: "CANCELLED", oid: '10',},
        {name: "Reopened", code: "REOPENED", oid: '11',},
        {name: "Submitting", code: "SUBMITTING", oid: '12',},
        {name: "Resolved", code: "RESOLVED", oid: '13',},
        {name: "Pending", code: "PENDING", oid: '14',},
        {name: "In progress", code: "IN PRORESS", oid: '15',},
        {name: "Opening", code: "Opening", oid: '16',},],
      supportClass: [{name: "Object", code: "java.lang.Object"}, {name: "String", code: "java.lang.String"},
        {name: "Short", code: "java.lang.Short"}, {name: "Integer", code: "java.lang.Integer"},
        {name: "Long", code: "java.lang.Long"}, {name: "Double", code: "java.lang.Double"},
        {name: "Float", code: "java.lang.Float"}, {name: "Boolean", code: "java.lang.Boolean"},
        {name: "Character", code: "java.lang.Character"},
      ],
      transitions: [{code: '1', name: '优化'}, {code: '2', name: '修订'}, {code: '3', name: '升级'},
        {code: '4', name: '审阅'}, {code: '5', name: '废弃'}, {code: '6', name: '修改'}, {code: '7', name: '生产已发布'},
        {code: '8', name: '设置状态'}, {code: '9', name: '锁定'}],
      versions: [{name: '无', code: 'sp'}, {name: 'Mil Std', code: 'Mil Std'}, {name: '数字', code: 'Number'},],
      roles: [{code: '1', name: 'CAD作者', oid: '1'}, {code: '2', name: 'CAPA实施者', oid: '2'},
        {code: '3', name: 'CAPA审阅者', oid: '3'},
        {code: '4', name: 'CAPA措施有效性批准者', oid: '4'}, {code: '5', name: 'CAPA措施校验者', oid: 5},
        {code: '6', name: 'CAPA有效性批准者', oid: '6'}, {code: '7', name: 'CAPA检验者', oid: '7'},
        {code: '8', name: 'CAPA确认者', oid: '8'},
        {code: '9', name: 'CAPA管理者', oid: '9'}, {code: '10', name: 'CAPA规划者', oid: '10'},
        {code: '11', name: 'CAPA计划批准者', oid: '11'},
        {code: '12', name: 'CAPA请求者', oid: '12'}, {code: '13', name: 'CAPA调查批准者', oid: '13'}],
      accesses: [{code: '-1', name: '完全控制(全部)'},
        {code: '2', name: '读取'}, {code: '3', name: '下载'},
        {code: '4', name: '修改内容'}, {code: '5', name: '修改'},
        {code: '6', name: '修改标识'}, {code: '7', name: '修改安全标签'},
        {code: '8', name: '通过移动创建'}, {code: '9', name: '创建'},],
      workflows: [
        {oid: '1', name: '测试阶段进程', code: 'Apple'},
        {oid: '2', name: '测试关口进程', code: 'Pear'},
        {oid: '3', name: 'Design Review Workflow', code: '9'},
        {oid: '4', name: 'Package Approval Process', code: '8'},
        {oid: '5', name: 'Package Content Routing Process', code: '7'},
        {oid: '6', name: 'Package Delivery Process', code: '6'},
        {oid: '7', name: 'Peer Review Workflow', code: '5'},
        {oid: '8', name: 'PIALMChangeRequestVf', code: '4'},
        {oid: '9', name: 'PIALMCustomerlnputDocWf', code: '3'},
        {oid: '10', name: 'PIAL _MDefectWf', code: '2'},
        {oid: '11', name: 'PIALMDesignDocWf', code: '1'},
      ],
      local: {
        lifeCycle: '生命周期',
        isRouting: '可用于路由',
        isEnable: '已启用',
        save: '保存',
        download: '下载',
        cancel: '取消',
        ok: '确认',
        feature: '特性',
        type: '类型',
        basic: '基本',
        advance: '高级',
        name: '名称',
        enterLifeCycleName: '请输入生命周期模板名称',
        description: '说明',
        selectSupportClass: '请选择模板支持类',
        clazz: '类',
        stage: '阶段',
        status: '状态',
        selectStatus: '请选择状态',
        versionSeries: '版本系列',
        selectVersionSeries: '请选择版本系列',
        role: '角色',
        accessControl: '访问控制',
        workflow: '工作流',
        selectedRole: '选定角色',
        access: '权限',
        availableRoles: '可用角色',
        add: '添加',
        remove: '移除',
        item: '项',
        emptyList: '列表为空',
        enterSearchContent: '请输入搜索内容',

        process: '进程',
        skim: '浏览',
        lastVersion: '使用最新小版本',
        clear: '清理',
        gate: '关口',
        selectTemplateProcess: '选择模板进程',
      }
    }
  };
  import Stage from "./Stage";
  import LifeCycleInfo from "./LifeCycleInfo"
  import LifeCycleStage from "./LifeCycleStage"
  import {EventBus} from '@/component';
  import lifecycleData from './LifecycleData.json';
  import draggable from 'vuedraggable'

  const createTemplate = {
    info: {type: "advanced", name: "", supportClass: "", description: "", routing: false, enabled: false},
    stage: {activeState: "", data: []}
  };
  export default {
    name: "LifeCycleTemplate",
    components: {Stage, draggable, LifeCycleInfo, LifeCycleStage},
		beforeCreate(){
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
        //用于复制和剪切阶段的临时存放位置
        stageTemp: null,
        lcData: isEmpty(meta.data.templateData) ? createTemplate : meta.data.templateData,
        lcData_bak: JSON.parse(JSON.stringify(meta.data.templateData)),
      };
    },
    created() {
      localStorage.setItem('lifeCycleLocal', JSON.stringify(meta.data.local));
      lifecycleData.states = meta.data.states;
      lifecycleData.supportClass = meta.data.supportClass;
      lifecycleData.transitions = meta.data.transitions;
      lifecycleData.versions = meta.data.versions;
      lifecycleData.roles = meta.data.roles;
      lifecycleData.accesses = meta.data.accesses;
      lifecycleData.workflows = meta.data.workflows;
    },
    computed: {
      activeState: {
        get() {
          return this.lcData.stage.activeState;
        },
        set(key) {
          this.lcData.stage.activeState = key;
        }
      },
      stageData: {
        get() {
          return this.lcData.stage.data;
        },
        set(data) {
          return this.lcData.stage.data = data;
        }
      },
      activeStage() {
        for (let data of this.stageData) {
          if (data.key === this.activeState) {
            return data;
          }
        }
        return {roles: [], transform: [], workflow: {}, key: null};
      },
    },
    methods: {
      // region 顶部操作
      addStage() {
        const newStage = {key: getKey(), code: '', roles: [], transform: [], workflow: {},};
        if (this.activeState === "") {
          this.stageData.push(newStage);
        } else {
          this.putStage(newStage);
        }
      },
      cutStage() {
        if (this.activeState === "") {
          return;
        }
        for (let i = 0; i < this.stageData.length; i++) {
          if (this.stageData[i].key === this.activeState) {
            this.stageTemp = this.stageData[i];
            this.stageData.splice(i, 1);
            break;
          }
        }
        //删除这个阶段存在的信息
        this.correctTransform(this.stageTemp.key);
        this.activeState = "";
      },
      copyStage() {
        if (this.activeState === "") {
          return;
        }
        for (let data of this.stageData) {
          if (data.key === this.activeState) {
            this.stageTemp = JSON.parse(JSON.stringify(data));
            break;
          }
        }
      },
      pasteStage() {
        if (this.stageTemp === null) {
          return;
        }
        this.stageTemp.key = getKey();
        if (this.activeState === "") {
          this.stageData.push(JSON.parse(JSON.stringify(this.stageTemp)));
        } else {
          this.putStage(JSON.parse(JSON.stringify(this.stageTemp)));
        }
      },
      deleteStage() {
        if (this.activeState === "") {
          return;
        }

        this.lcData.stage.data = this.stageData.filter(data => data.key !== this.activeState);

        //删除这个阶段存在的信息
        this.correctTransform(this.activeState);

        this.activeState = "";
      },
      // endregion

      // region 附加方法
      phaseName(itemCode) {
        if (itemCode === '') {
          return '';
        }
        for (let state of lifecycleData.states) {
          if (state.code === itemCode) {
            return state.name;
          }
        }
        return '';
      },
      putStage(stage) {
        for (let i = 0; i < this.stageData.length; i++) {
          if (this.stageData[i].key === this.activeState) {
            this.stageData.splice(i + 1, 0, stage);
            break;
          }
        }
      },
      correctTransform(correctState) {
        for (let data of this.stageData) {
          for (let transform of data.transform) {
            transform.state = transform.state.filter(state => state !== correctState)
          }
        }
      },
      // endregion

      // region 底部操作
      subData() {
        const workflowMap = {};
        lifecycleData.workflows.forEach(active => {
          workflowMap[active.code] = active.oid;
        });
        const stateMap = {};
        lifecycleData.states.forEach(state => {
          stateMap[state.code] = state.oid;
        });

        const stageMap = {};
        this.stageData.forEach(stageData => {
          stageData.oid = stateMap[stageData.code];
          stageMap[stageData.key] = stageData.oid;
          if (!isEmpty(stageData.workflow.phase)) {
            stageData.workflow.phase.oid = workflowMap[stageData.workflow.phase.process];
            stageData.workflow.gateway.oid = workflowMap[stageData.workflow.gateway.process];
          }
        });


        console.log(JSON.stringify(this.lcData));
      },

      saveData() {
        const day = new Date().toLocaleDateString().replace(/\//g, '');
        const data = new Blob([JSON.stringify(this.lcData)], {type: "text/plain;charset=UTF-8"});
        const downloadUrl = window.URL.createObjectURL(data);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = this.lcData.info.name + '_' + day + ".txt";
        anchor.click();
        window.URL.revokeObjectURL(data);
      },

      cancelData() {
        this.lcData = JSON.parse(JSON.stringify(this.lcData_bak));
        console.log("取消数据", this.lcData_bak);
      },

      // endregion

      // region 数据传递
      stageChange(stateCode) {
        this.activeState = stateCode;
      },

      infoChange(info) {
        this.lcData.info = info;
      },

      stateChange(code) {
        this.activeStage.code = code;
      },
      versionChange(version) {
        this.activeStage.version = version;
      },
      // endregion

    },
    mounted() {
      //传输转换数据
      EventBus.$on('transformData', data => {
        for (let transform of this.activeStage.transform) {
          if (transform.transition === data.transition) {
            if (data.checked) {
              transform.state.push(data.state);
            } else {
              transform.state.splice(transform.state.indexOf(name), 1);
            }
            return;
          }
        }
        if (data.checked) {
          this.activeStage.transform.push({transition: data.transition, state: [data.state]});
        }
      });

      EventBus.$on('roleData', data => {
        const newRoles = [];
        for (let role of data) {
          let isNew = true;
          for (let stageRole of this.activeStage.roles) {
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
        this.activeStage.roles = newRoles;
      });

      EventBus.$on('roleAccessData', data => {
        for (let role of this.activeStage.roles) {
          if (role.code === data.key) {
            role.access = data.access;
            break;
          }
        }
      });
      EventBus.$on('workflowData', (data) => {
        this.activeStage.workflow = data;
      });
    },
  }

  function getKey() {
    return (((1 + Math.random()) * new Date().getTime()) | 0).toString(16);
  }

  function isEmpty(object) {
    return object === undefined || object === null;
  }
</script>

<style scoped>
	.current-state {
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
	}

	.top-button {
		margin-left: 3px;
	}

	.bottom-button {
		margin-right: 10px;
	}
</style>
