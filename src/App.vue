<template>
  <div id="app">
    <Alert></Alert>
    <Model></Model>
    <router-view />
  </div>
</template>
<script>
import Model from "@/components/Model";
import Alert from "@/components/Alert";
import { mapGetters } from "vuex";
export default {
  components: {
    Model,
    Alert
  },
  computed: {}
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700,900i&display=swap");
html {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
*,
*::before,
*::after {
  box-sizing: inherit;
  font-family: inherit;
}

#app {
  position: relative;
}

.wraper {
  width: 100%;
  min-width: 1110px;
  margin: 0 auto;
  height: 100vh;
  min-height: 400px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
