<template>
  <div>
    <div class="list-group">
      <h2 class="title">FOCUS TIME</h2>
      <div class="focus-group">
        <div class="focus-item">
          <h3>TODAY</h3>
          <div class="tomatos-total">
            <span class="total">{{tomatosToday}}</span>/TOMATO
          </div>
        </div>
        <div class="focus-item">
          <h3>WEEK</h3>
          <div class="tomatos-total">
            <span class="total">{{tomatosWeek}}</span>/TOMATO
          </div>
        </div>
      </div>
    </div>
    <Chart></Chart>
  </div>
</template>
<script>
import Chart from "@/components/Chart";
import { mapGetters } from "vuex";
export default {
  components: { Chart },
  computed: {
    ...mapGetters(["tomatosToday", "tomatosWeek"])
  }
};
</script>
<style lang="scss">
.list-group {
  margin-bottom: 45px;
}
.title {
  font-size: 24px;
  padding: 8px 16px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
  .icon-title {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    .material-icons {
      font-size: 22px;
    }
  }
}
.focus-group {
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
.focus-item {
  flex: 1;
  h3 {
    color: #fff;
  }
}
.tomatos-total {
  color: rgba(255, 255, 255, 0.2);
  font-size: 14px;
  font-weight: normal;
}
.total {
  color: #ff4384;
  font-size: 64px;
  font-weight: bold;
}
</style>
