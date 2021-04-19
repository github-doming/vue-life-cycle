<template>
  <div>
    <div class="info-title">
      {{local.feature}} - {{local.lifeCycle}}
    </div>
    <a-form-model :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-model-item :label="local.type">
        <a-radio-group v-model="form.type">
          <a-radio value="basic">{{local.basic}}</a-radio>
          <a-radio value="advanced"> {{local.advance}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :label="local.name" prop="name">
        <a-input v-model="form.name" :placeholder="local.enterLifeCycleName"/>
      </a-form-model-item>
      <a-form-model-item :label="local.description">
        <a-textarea v-model="form.description" :auto-size="{ minRows: 1, maxRows: 5 }"/>
      </a-form-model-item>
      <a-form-model-item :label="local.clazz" prop="supportClass">
        <a-select v-model="form.supportClass" :placeholder="local.selectSupportClass">
          <a-select-option v-for="item in supportClass" :key="item.code"> {{item.name}}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  import LifeCycleData from '../js/LifeCycleData'

  export default {
    name: "ContextInfo",
    props: {
      lifeCycleData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      form() {
        return this.lifeCycleData.info;
      }
    },
    data() {
      const local = JSON.parse(localStorage.getItem('lifeCycleLocal'));
      return {
        local, supportClass: LifeCycleData.supportClass,
        rules: {
          name: [{required: true, message: local.enterLifeCycleName, trigger: 'blur'}],
          supportClass: [{required: true, message: local.selectSupportClass, trigger: 'blur'}]
        }
      }
    },
  }
</script>

<style scoped>
  .info-title {
    padding-left: 20px;
    padding-top: 10px;
    font-size: 20px;
  }

  .ant-form-item {
    margin-bottom: 10px;
  }
</style>
