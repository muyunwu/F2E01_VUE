<template>
  <transition name="fade">
    <div class="clock-item" v-if="todos.length">
      <div class="clock-top">
        <div class="compelete-group">
          <span class="icon-done">
            <i class="material-icons">done</i>
          </span>
          <button class="compelete" @click="compeleteTodo(doing.id);"></button>
        </div>
        <div class="clock-group">
          <div class="clock-title">{{doing.title}}</div>
          <ul class="tomatos">
            <li class="tomato" v-for="tomato in doing.tomatos" :key="tomato.id"></li>
          </ul>
        </div>
      </div>
      <div class="time" :class="workState">
        <span>{{min}}</span>
        <span>:</span>
        <span>{{sec}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["workState"]),
    ...mapGetters(["doing", "min", "sec", "todos"])
  },
  methods: {
    ...mapMutations(["compeleteTodo"])
  }
};
</script>
<style lang="scss" scoped>
.clock-top {
  display: flex;
  margin-bottom: 15px;
}
.clock-title {
  color: #003164;
  font-size: 16px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.tomatos {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.tomato {
  width: 8px;
  height: 8px;
  background: #003164;
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 4px;
}
.time {
  font-size: 135px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  &.work {
    color: #ff4384;
  }
  &.break {
    color: #00a7ff;
  }
}
button {
  border: 0;
  outline: 0;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
}
.compelete {
  border: 2px solid #003164;
  width: 38px;
  height: 38px;
}
.compelete-group {
  margin-right: 16px;
  position: relative;
  &:hover,
  &.isDone {
    .icon-done {
      display: inline;
    }
  }
}
.compelete {
  position: relative;
  z-index: 2;
}
.icon-done {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: #003164;
  cursor: pointer;
  .material-icons {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>


