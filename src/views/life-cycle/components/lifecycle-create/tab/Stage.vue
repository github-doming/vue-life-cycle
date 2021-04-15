<template>
  <div @click.stop="selectStage">
    <a-row type="flex" align="middle" >
      <a-col class="phase">
        <slot name="phase"><span></span></slot>
      </a-col>
      <a-col class="gate" v-if="hasGate"/>
      <a-col class="hidden-gate" v-else/>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "Stage",
    props: {
      hasGate: {
        type: Boolean,
        required: true,
      },
      phaseKey: {
        type: String,
        required: true,
      },
    },
    methods:{
      selectStage() {
        this.$emit('stageClick',this.phaseKey);
      },
    },
  }
</script>

<style scoped>
  .phase {
    height: 35px;
    line-height: 35px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #C0C0C0;
  }


  .gate {
    width: 25px;
    height: 60px;
    background-color: #FFC800;
  }
  .hidden-gate {
    width: 0;
    height: 60px;
  }
</style>
