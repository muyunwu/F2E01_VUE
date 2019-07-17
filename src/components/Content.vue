<template>
  <div id="content" :class="workState">
    <div class="work-group">
      <Input />
      <Working />
      <HomeList />
      <Clock></Clock>
    </div>
  </div>
</template>
<script>
import Input from "@/components/Input";
import Working from "@/components/Working";
import HomeList from "@/components/HomeList";
import Clock from "@/components/Clock";
import { mapState } from "vuex";
export default {
  components: {
    Input,
    Working,
    HomeList,
    Clock
  },
  computed: {
    ...mapState(["workState"])
  }
};
</script>
<style lang="scss" scoped>
#content {
  flex: 7;

  padding: 50px 0;
  padding-left: 80px;
  height: 100vh;
  position: relative;
  &.work {
    background: #ffedf7;
  }
  &.break {
    background: #e5f3ff;
  }
}
.work-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 445px;
  height: 100%;
}
</style>


