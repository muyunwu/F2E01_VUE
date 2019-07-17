<template>
  <div>
    <div class="list-group">
      <h2 class="title">WORK</h2>
      <ul class="list">
        <li class="list-item">
          <label class="label-music">
            <input type="radio" name id v-model="workId" :value="0" />
            <span class="icon-radio"></span>
            <span>NONE</span>
          </label>
        </li>
        <li class="list-item" v-for="item in alarmList" :key="item.id">
          <label class="label-music">
            <input type="radio" name id v-model="workId" :value="item.id" />
            <span class="icon-radio"></span>
            <span>{{item.title}}</span>
          </label>
        </li>
      </ul>
    </div>
    <div class="list-group">
      <h2 class="title">BREAK</h2>
      <ul class="list">
        <li class="list-item">
          <label class="label-music">
            <input type="radio" name id v-model="breakId" :value="0" />
            <span class="icon-radio"></span>
            <span>NONE</span>
          </label>
        </li>
        <li class="list-item" v-for="item in alarmList" :key="item.id">
          <label class="label-music">
            <input type="radio" name id v-model="breakId" :value="item.id" />
            <span class="icon-radio"></span>
            <span>{{item.title}}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["alarmList", "alarmWorkId", "alarmBreakId"]),
    workId: {
      get() {
        return this.alarmWorkId;
      },
      set(value) {
        this.setWorkId(value);
      }
    },
    breakId: {
      get() {
        return this.alarmBreakId;
      },
      set(value) {
        this.setBreakId(value);
      }
    }
  },
  methods: {
    ...mapMutations(["setWorkId", "setBreakId"])
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
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  flex-basis: 33.33%;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
  cursor: pointer;
}
.label-music {
  cursor: pointer;
  display: flex;
  align-items: center;
  input:checked {
    & + .icon-radio {
      border: 2px solid #ff4384;
      &:after {
        display: block;
      }
    }
  }
}
.icon-radio {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-right: 5px;
  &:after {
    position: absolute;
    content: "";
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #ff4384;
    width: 8px;
    height: 8px;
  }
}
input {
  display: none;
}
</style>
