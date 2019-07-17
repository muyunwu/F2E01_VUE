<template>
  <div class="alert-bg" v-if="alert">
    <div class="alert-container" :class="workState">
      <div class="content">
        <span v-if="workState==='break'">TAKE A BREAK !!</span>
        <span v-else>LET'S GET TO WORK !!</span>
      </div>
      <button class="confirm" @click="closeAlarm">OK</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["workState", "alert"])
  },
  methods: {
    ...mapMutations(["closeAlarm"])
  }
};
</script>
<style lang="scss" scoped>
.alert-bg {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 300;
}
.alert-container {
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 24px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  &.work {
    // ff4384
    color: #ff4384;
    background: #ffedf7;
    .confirm {
      background: #ff4384;
    }
  }
  &.break {
    color: #00a7ff;
    background: #e5f3ff;
    .confirm {
      background: #00a7ff;
    }
  }
}
.content {
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
}
.confirm {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  width: 100%;
  color: #fff;
  padding: 5px;
}
</style>

