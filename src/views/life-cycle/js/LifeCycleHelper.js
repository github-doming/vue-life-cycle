const local = {
  lifeCycle: '生命周期', isRouting: '可用于路由', isEnable: '已启用', save: '保存', download: '下载', cancel: '取消',
  ok: '确认', feature: '特性', type: '类型', basic: '基本', advance: '高级', name: '名称',
  enterLifeCycleName: '请输入生命周期模板名称', description: '说明', selectSupportClass: '请选择模板支持类', clazz: '类',
  stage: '阶段', status: '状态', selectStatus: '请选择状态', versionSeries: '版本系列', selectVersionSeries: '请选择版本系列',
  role: '角色', accessControl: '访问控制', workflow: '工作流', selectedRole: '选定角色', access: '权限',
  availableRoles: '可用角色', add: '添加', remove: '移除', item: '项', emptyList: '列表为空', enterSearchContent: '请输入搜索内容',
  process: '进程', skim: '浏览', lastVersion: '使用最新小版本', clear: '清理', gate: '关口', selectTemplateProcess: '选择模板进程',
  addStage: '新增阶段',cutStage: '剪切阶段',copyStage: '复制阶段',pasteStage: '粘贴阶段',deleteStage: '删除阶段',
};

const columns =
    [{title: '生命周期模板标识', dataIndex: 'id', width: 180,}, {title: '生命周期模板名称', dataIndex: 'name', width: 180,},
      {title: '上次更新时间', dataIndex: 'lastUpdateTime', width: 180,}, {title: '版本', dataIndex: 'version', width: 180,},
      {title: '操作', dataIndex: 'operation', scopedSlots: {customRender: 'operation'},},];
const tableData = [{id: '1', name: '默认文档生命周期', lastUpdateTime: '2021年4月13日', version: '1.0.25.a'},
  {id: '2', name: '船舶齿轮生命周期', lastUpdateTime: '2020年4月13日', version: '2.13.1.e'},];
const supportClass = [{name: "Object", code: "java.lang.Object"}, {name: "String", code: "java.lang.String"},
  {name: "Short", code: "java.lang.Short"}, {name: "Integer", code: "java.lang.Integer"},
  {name: "Long", code: "java.lang.Long"}, {name: "Double", code: "java.lang.Double"},
  {name: "Float", code: "java.lang.Float"}, {name: "Boolean", code: "java.lang.Boolean"},
  {name: "Character", code: "java.lang.Character"},
];
const states = [{name: "Release", code: "RELEASE", oid: '1',},
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
  {name: "Opening", code: "OPENING", oid: '16',},];
const versions = [{name: '无', code: 'sp'}, {name: 'Mil Std', code: 'Mil Std'}, {name: '数字', code: 'Number'},];
const transitions = [{code: '1', name: '优化'}, {code: '2', name: '修订'}, {code: '3', name: '升级'},
  {code: '4', name: '审阅'}, {code: '5', name: '废弃'}, {code: '6', name: '修改'}, {code: '7', name: '生产已发布'},
  {code: '8', name: '设置状态'}, {code: '9', name: '锁定'}];
const roles = [{code: '1', name: 'CAD作者', oid: '1'}, {code: '2', name: 'CAPA实施者', oid: '2'},
  {code: '3', name: 'CAPA审阅者', oid: '3'},
  {code: '4', name: 'CAPA措施有效性批准者', oid: '4'}, {code: '5', name: 'CAPA措施校验者', oid: 5},
  {code: '6', name: 'CAPA有效性批准者', oid: '6'}, {code: '7', name: 'CAPA检验者', oid: '7'},
  {code: '8', name: 'CAPA确认者', oid: '8'},
  {code: '9', name: 'CAPA管理者', oid: '9'}, {code: '10', name: 'CAPA规划者', oid: '10'},
  {code: '11', name: 'CAPA计划批准者', oid: '11'},
  {code: '12', name: 'CAPA请求者', oid: '12'}, {code: '13', name: 'CAPA调查批准者', oid: '13'}];
const accesses = [{code: '-1', name: '完全控制(全部)'},
  {code: '2', name: '读取'}, {code: '3', name: '下载'},
  {code: '4', name: '修改内容'}, {code: '5', name: '修改'},
  {code: '6', name: '修改标识'}, {code: '7', name: '修改安全标签'},
  {code: '8', name: '通过移动创建'}, {code: '9', name: '创建'},];
const workflows = [
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
];
const templateData = {
  info: {type: 'advanced', name: '测试模板名称', supportClass: 'java.lang.String', routing: true, enabled: true},
  stage: {
    activeKey: '',
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
};
const createTemplate = {
  info: {
    type: "advanced", name: undefined, supportClass: undefined, description: undefined, routing: false, enabled: true
  },
  stage: {activeKey: "", data: []}
};

export const LifeCycleFunction = {
  getLocal() {
    return local;
  },
  getTemplateData() {
    // return createTemplate;
    return templateData;
  },
  getKey() {
    return (((1 + Math.random()) * new Date().getTime()) | 0).toString(16);
  },
  errorMessage(that, err) {
    that.$notification.error({
      message: '提示:',
      description: err,
    });
  },
};
export const LifeCycleComputed = {
  activeKey() {
    return {
      get() {
        return this.lifeCycleData.stage.activeKey;
      },
      set(activeState) {
        return this.lifeCycleData.stage.activeKey = activeState;
      }
    }
  },
  stageData() {
    return {
      get() {
        return this.lifeCycleData.stage.data;
      },
      set(data) {
        return this.lifeCycleData.stage.data = data;
      }
    }
  },
};
export const LifeCycleMethod = {
  stageClick() {
    return function (phaseKey) {
      this.activeKey = phaseKey;
    }
  },
  phaseName(){
    return function (phaseCode) {
      if (phaseCode) {
        for (let state of LifeCycleData.states) {
          if (state.code === phaseCode) {
            return state.name;
          }
        }
      }
      return '';
    }
  }

};

export const LifeCycleData = {
  columns,tableData,supportClass,states,versions,transitions,roles,accesses,templateData,workflows,
};
