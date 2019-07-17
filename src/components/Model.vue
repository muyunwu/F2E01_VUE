<template>
  <transition name="fade">
    <div id="model" v-show="modelState" @keyup.esc="openModel(0)">
      <div class="model-wraper">
        <a href="#" class="btn-close" @click.prevent="openModel(0)">
          <i class="material-icons">close</i>
        </a>
        <nav class="nav" :class="workState">
          <a
            href="#"
            @click.prevent="openModel(1)"
            class="link"
            :class="[modelState === 1 ?'link-active' : '']"
          >
            <span class="link-icon">
              <i class="material-icons">list</i>
            </span>
            to-do list
          </a>
          <a
            href="#"
            @click.prevent="openModel(2)"
            class="link"
            :class="[modelState === 2 ? 'link-active' : '']"
          >
            <span class="link-icon">
              <i class="material-icons">insert_chart</i>
            </span>
            analytics
          </a>
          <a
            href="#"
            @click.prevent="openModel(3)"
            class="link"
            :class="[modelState === 3 ? 'link-active' : '']"
          >
            <span class="link-icon">
              <i class="material-icons">library_music</i>
            </span>
            ringtones
          </a>
          <div class="model-clock" :class="workState">
            <div class="clock-bg">
              <button class="clock-play" @click="startTime">
                <i class="material-icons" v-if="timerState==='pause'">play_arrow</i>
                <i class="material-icons" v-else>pause</i>
              </button>
            </div>
            <div class="time" v-if="todos.length">
              <span>{{min}}</span>
              <span>:</span>
              <span>{{sec}}</span>
            </div>
            <div class="todo-title" v-if="todos.length">{{doing.title}}</div>
          </div>
        </nav>
        <div class="content">
          <Todo v-show="modelState===1"></Todo>
          <Analytic v-show="modelState===2"></Analytic>
          <Ringtones v-show="modelState===3"></Ringtones>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import Todo from "@/components/Todo";
import Ringtones from "@/components/Ringtones";
import Analytic from "@/components/Analytic";
export default {
  components: {
    Todo,
    Ringtones,
    Analytic
  },
  computed: {
    ...mapState(["modelState", "workState", "timerState"]),
    ...mapGetters(["min", "sec", "doing", "todos"])
  },
  methods: {
    ...mapMutations(["openModel"]),
    ...mapActions(["startTime"])
  }
};
</script>
<style lang="scss" scoped>
#model {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #003164;
  z-index: 200;
}
.model-wraper {
  width: 100%;
  min-width: 1110px;
  margin: 0 auto;
  height: 100vh;
  min-height: 400px;
  display: flex;
  justify-content: flex-start;
  position: relative;
  padding: 50px 80px;
  padding-bottom: 0;
  font-family: "Roboto", sans-serif;
}
.nav {
  margin-right: 250px;
  position: relative;
  &.work {
    .link {
      &:hover,
      &.link-active {
        color: #ff4384;
      }
    }
  }
  &.break {
    .link {
      &:hover,
      &.link-active {
        color: #00a7ff;
      }
    }
  }
}
.content {
  width: 450px;
}
.btn-close {
  position: absolute;
  top: 50px;
  right: 80px;
  font-size: 48px;
  color: #fff;
  cursor: pointer;
}
.link {
  display: block;
  text-transform: uppercase;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.2);
  font-family: "Roboto", sans-serif;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: bold;
}
.link-icon {
  margin-right: 8px;
}
.model-clock {
  position: absolute;
  width: 350px;
  text-align: center;
  bottom: 0;
  font-weight: bold;
  &.work {
    .time {
      color: #ff4384;
    }
    .clock-play {
      background: #ff4384;
      &::after {
        border-color: #ff4384;
      }
    }
    .clock-bg {
      background: #ffedf7;
    }
  }
  &.break {
    .time {
      color: #00a7ff;
    }
    .clock-play {
      background: #00a7ff;
      &::after {
        border-color: #00a7ff;
      }
    }
    .clock-bg {
      background: #e5f3ff;
    }
  }
}
.clock-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(50%);
  width: 100%;
  height: 350px;
  border-radius: 50%;
}
.time {
  font-size: 64px;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}
.todo-title {
  color: #003164;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
}
.clock-play {
  width: 100px;
  height: 100px;
  border: 15px solid #003164;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85px;
    height: 85px;
    border-radius: 50%;
    border: 1px solid transparent;
  }
}
</style>
