<template>
  <div id="input-container">
    <input
      type="text"
      placeholder="add a new mission…"
      :class="workState"
      v-model.trim="title"
      @keyup.enter="addTodo(title);title=''"
    />
    <button class="btn-add" :class="workState">+</button>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      title: ""
    };
  },
  computed: {
    ...mapState(["workState"])
  },
  methods: {
    ...mapMutations(["addTodo"])
  }
};
</script>
<style lang="scss" scoped>
#input-container {
  width: 100%;
  position: relative;
  height: 48px;
  font-family: "Roboto", sans-serif;
}
input {
  width: 100%;
  height: 48px;
  font-size: 14px;
  padding: 18px 16px;
  background: #fff;
  border: 0;
  outline: 0;
  text-transform: uppercase;
  font-weight: bold;
  font-style: italic;
  font-family: "Roboto", sans-serif;
  position: relative;
  &.work {
    color: #ff4384;
    &::placeholder {
      color: #ff4384;
    }
  }
  &.break {
    color: #00a7ff;
    &::placeholder {
      color: #00a7ff;
    }
  }
}
.btn-add {
  position: absolute;
  right: 16px;
  top: 50%;
  font-size: 24px;
  transform: translateY(-50%);
  outline: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  &.work {
    color: #ff4384;
  }
  &.break {
    color: #00a7ff;
  }
}
</style>


