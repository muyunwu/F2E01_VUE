<template>
  <div class="home-list-group">
    <ul id="home-list">
      <transition name="fade" v-for="todo in homelist" :key="todo.id">
        <li class="clock-item">
          <div class="clock-group">
            <div class="compelete-group">
              <span class="icon-done">
                <i class="material-icons">done</i>
              </span>
              <button class="compelete" @click="compeleteTodo(todo.id);"></button>
            </div>

            <div class="clock-title">{{todo.title}}</div>
          </div>
          <button class="play" @click="changeTodo(todo.id)">
            <i class="material-icons">play_arrow</i>
          </button>
        </li>
      </transition>
    </ul>
    <a href="#" @click.prevent="openModel(1)" class="more" v-if="homelist.length">MORE</a>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["homelist"])
  },
  methods: {
    ...mapMutations(["changeTodo", "compeleteTodo", "openModel"])
  }
};
</script>
<style lang="scss" scoped>
.home-list-group {
  height: 130px;
}
#home-list {
  margin-bottom: 10px;
}
.clock-item {
  width: 100%;
  display: flex;
  color: #003164;
  text-transform: uppercase;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 49, 100, 0.2);
  align-items: center;
  justify-content: space-between;
}
.clock-group {
  display: flex;
  align-items: center;
}
.more {
  color: #ff4384;
  font-size: 16px;
  display: block;
  text-align: right;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  text-decoration: none;
}
button {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #003164;
  outline: 0;
  background: transparent;
  box-sizing: border-box;
  cursor: pointer;
}
.compelete-group {
  margin-right: 4px;
  position: relative;
  &:hover {
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
  cursor: pointer;
  .material-icons {
    font-size: 13px;
    font-weight: bold;
  }
}
.play {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #003164;
  .material-icons {
    font-size: 12px;
  }
}
</style>


