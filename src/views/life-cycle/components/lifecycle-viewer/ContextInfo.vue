<template>
  <div>
    <div class="info-title">
      {{local.feature}} - {{local.lifeCycle}}
    </div>
    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
      <a-form-model-item :label="local.type">
        <a-radio-group :value="form.type">
          <a-radio value="basic">{{local.basic}}</a-radio>
          <a-radio value="advanced"> {{local.advance}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :label="local.name">
        <a-input v-model="form.name" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.description">
        <a-textarea v-model="form.description" :auto-size="{ minRows: 1, maxRows: 5 }" read-only/>
      </a-form-model-item>
      <a-form-model-item :label="local.clazz">
        <a-select v-model="form.supportClass" :open="false">
          <a-select-option v-for="item in supportClass" :key="item.code"> {{item.name}}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  import LifeCycleData from '../../js/LifeCycleData'

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
