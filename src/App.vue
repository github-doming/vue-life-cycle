<template>
	<div style="margin: 5px">
		<LifeCycleTemplate/>
	</div>
</template>

<script>
  import LifeCycleTemplate from "./components/lifecycle/LifeCycleTemplate";

  export default {
    name: "App",
    components: {LifeCycleTemplate},
    data() {
      return {
        message: "这是一个生命周期模板的编辑页面! "
      };
    },
    methods: {},
  };
</script>

<style></style>
