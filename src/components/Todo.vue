<template>
  <div class="todolist">
    <Input />
    <div class="list-group">
      <h2 class="title" @click="todoPannel=!todoPannel">
        TO-DO
        <span class="icon-title">
          <i class="material-icons" v-if="todoPannel">arrow_drop_up</i>
          <i class="material-icons" v-else>arrow_drop_down</i>
        </span>
      </h2>
      <ul class="list" :style="{height : todoPannel ? 'auto' : 0}">
        <li class="clock-item" v-for="todo in todos" :key="todo.id">
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
      </ul>
    </div>
    <div class="list-group">
      <h2 class="title" @click="donePannel=!donePannel">
        DONE
        <span class="icon-title">
          <i class="material-icons" v-if="donePannel">arrow_drop_up</i>
          <i class="material-icons" v-else>arrow_drop_down</i>
        </span>
      </h2>
      <ul class="list" :style="{height : donePannel ? 'auto' : 0}">
        <li class="clock-item" v-for="todo in done" :key="todo.id">
          <div class="clock-group">
            <div class="compelete-group isDone">
              <span class="icon-done">
                <i class="material-icons">done</i>
              </span>
              <button class="compelete"></button>
            </div>
            <div class="clock-title isDone">{{todo.title}}</div>
          </div>
          <ul class="tomatos">
            <li v-for="(tomato,idx) in todo.tomatos" class="tomato" :key="idx"></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Input from "@/components/Input";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Input
  },
  data() {
    return {
      todoPannel: true,
      donePannel: true
    };
  },
  computed: {
    ...mapGetters(["todos", "done"])
  },
  methods: {
    ...mapMutations(["compeleteTodo", "changeTodo"])
  }
};
</script>
<style lang="scss" scoped>
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
.list-group {
  margin-top: 50px;
  overflow: hidden;
}
.clock-item {
  width: 100%;
  display: flex;
  color: #fff;
  text-transform: uppercase;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: space-between;
}
.clock-group {
  display: flex;
  align-items: center;
}
.clock-title {
  &.isDone {
    text-decoration: line-through;
  }
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
  border: 2px solid #fff;
  outline: 0;
  background: transparent;
  box-sizing: border-box;
  cursor: pointer;
}
.compelete-group {
  margin-right: 4px;
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
  color: #fff;
  .material-icons {
    font-size: 12px;
  }
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
  background: #fff;
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 4px;
}
</style>


