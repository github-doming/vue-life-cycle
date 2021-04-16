<template>
  <div>
    <a-button class="bottom-button" type="primary" @click="subData"> {{local.save}}</a-button>
    <a-button class="bottom-button" @click="saveData"> {{local.download}}</a-button>
  </div>
</template>

<script>
  import {LifeCycleFunction} from '../../js/LifeCycleHelper';

  export default {
    name: "BottomButton",
    props: {
      lifeCycleData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        local: JSON.parse(localStorage.getItem('lifeCycleLocal')),
      }
    },
    methods: {
      subData() {
        if (!this.validateLifeCycleData()) {
          return;
        }
        console.log(this.lifeCycleData);
      },
      saveData() {
        if (!this.validateLifeCycleData()) {
          return;
        }
        const day = new Date().toLocaleDateString().replace(/\//g, '');
        const data = new Blob([JSON.stringify(this.lifeCycleData)], {type: "text/plain;charset=UTF-8"});
        const downloadUrl = window.URL.createObjectURL(data);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = this.lifeCycleData.info.name + '_' + day + ".txt";
        anchor.click();
        window.URL.revokeObjectURL(data);
      },

      validateLifeCycleData() {
        let msg;
        let info = this.lifeCycleData.info;
        if (!info.name) {
          msg = this.local.enterLifeCycleName;
        } else if (!info.supportClass) {
          msg = this.local.selectSupportClass;
        } else {
          let data = this.lifeCycleData.stage.data;
          if (data.length === 0) {
            msg = '请创建一个阶段';
          }
          for (let i = 0; i < data.length && !msg; i++) {
            let stageData = data[i];
            if (!stageData.code) {
              msg = this.local.selectStatus;
              continue;
            }
            for (let j = i + 1; j < data.length; j++) {
              if (stageData.code === data[j].code) {
                msg = '不能存在相同的阶段';
                break;
              }
            }
          }
        }
        if (msg) {
          LifeCycleFunction.errorMessage(this, msg);
          return false;
        }
        return true;
      }
    },
  }
</script>

<style scoped>

  .bottom-button {
    margin-right: 10px;
  }
</style>
