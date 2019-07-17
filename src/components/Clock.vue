<template>
  <div class="clock" :class="[timerState,workState]">
    <svg id="clock-progress" width="550" height="550" viewBox="0 0 530 530">
      <circle
        id="progress-bar"
        cx="265"
        cy="265"
        r="250"
        fill="none"
        stroke-width="20"
        stroke-dasharray="1632.8"
        :style="{
          'stroke-dashoffset':1632.8*progress
        }"
      />
      <circle id="progress-border" cx="265" cy="265" r="260" fill="none" stroke-width="3" />
    </svg>
    <div class="btn-group">
      <button @click="startTime" class="btn-play">
        <i class="material-icons" v-if="timerState==='pause'">play_arrow</i>
        <i class="material-icons" v-else>pause</i>
      </button>
      <button @click="resetTime" class="btn-reset"></button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["timerState", "workState", "time"]),
    ...mapGetters(["progress"])
  },
  methods: {
    ...mapMutations(["resetTime"]),
    ...mapActions(["startTime"])
  }
};
</script>
<style lang="scss" >
@keyframes workprogress {
  0% {
    stroke-dashoffset: 1580;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes breakprogress {
  0% {
    stroke-dashoffset: 1580;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
.clock {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid transparent;
  box-sizing: border-box;
  &.work {
    background: #ff4384;
    .btn-play {
      color: #ff4384;
    }
    #progress-border {
      stroke: #ff4384;
    }
  }
  &.break {
    background: #00a7ff;
    .btn-play {
      color: #00a7ff;
    }
    #progress-border {
      stroke: #00a7ff;
    }
  }
  &.play {
    background: #fff;
    &.work {
      .btn-reset,
      .btn-play {
        color: #fff;
        background: #ff4384;
      }
      border: 3px solid #ff4384;
      #progress-bar {
        stroke: #ff4384;
      }
    }
    &.break {
      .btn-reset,
      .btn-play {
        color: #fff;
        background: #00a7ff;
      }
      border: 3px solid #00a7ff;
      #progress-bar {
        stroke: #00a7ff;
      }
    }
  }
  &.pause {
    #progress-bar {
      stroke: transparent;
    }
  }
}
#clock-progress {
  position: absolute;
  transform: rotate(-90deg);
}
.btn-group {
  position: relative;
}
button {
  background: #fff;
  border: 0;
  outline: 0;
  cursor: pointer;
}
.btn-play {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-reset {
  display: block;
  position: absolute;
  background: #fff;
  width: 10px;
  height: 10px;
  padding: 0;
  right: -10px;
  bottom: 0;
}
</style>


