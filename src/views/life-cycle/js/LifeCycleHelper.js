const local = {
  lifeCycle: '生命周期', isRouting: '可用于路由', isEnable: '已启用', save: '保存', download: '下载', cancel: '取消',
  ok: '确认', feature: '特性', type: '类型', basic: '基本', advance: '高级', name: '名称',
  enterLifeCycleName: '请输入生命周期模板名称', description: '说明', selectSupportClass: '请选择模板支持类', clazz: '类',
  stage: '阶段', status: '状态', selectStatus: '请选择状态', versionSeries: '版本系列', selectVersionSeries: '请选择版本系列',
  role: '角色', accessControl: '访问控制', workflow: '工作流', selectedRole: '选定角色', access: '权限',
  availableRoles: '可用角色', add: '添加', remove: '移除', item: '项', emptyList: '列表为空', enterSearchContent: '请输入搜索内容',
  process: '进程', skim: '浏览', lastVersion: '使用最新小版本', clear: '清理', gate: '关口', selectTemplateProcess: '选择模板进程',
};
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
    return createTemplate;
    // return templateData;
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
