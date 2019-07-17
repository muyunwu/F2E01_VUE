<template>
  <nav id="nav">
    <ul id="links">
      <li class="link">
        <a href="#" @click="openModel(1)">
          <span class="link-icon">
            <i class="material-icons">list</i>
          </span>
        </a>
      </li>
      <li class="link">
        <a href="#" @click="openModel(2)">
          <span class="link-icon">
            <i class="material-icons">insert_chart</i>
          </span>
        </a>
      </li>
      <li class="link">
        <a href="#" @click="openModel(3)">
          <span class="link-icon">
            <i class="material-icons">library_music</i>
          </span>
        </a>
      </li>
    </ul>
    <h1 id="logo">POMODORO</h1>
  </nav>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["openModel"])
  }
};
</script>
<style lang="scss">
#nav {
  flex: 3;
  font-family: "Roboto", sans-serif;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: flex-end;
  background: #003164;
  padding: 50px 0;
  padding-right: 80px;
  a {
    color: #fff;
  }
}
#logo {
  writing-mode: vertical-rl;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  z-index: 300;
}
.link {
  margin-bottom: 50px;
}
.material-icons {
  font-size: 36px;
}
</style>


