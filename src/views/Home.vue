<template>
  <div class="wraper">
    <Content></Content>
    <Nav></Nav>
  </div>
</template>

<script>
// @ is an alias to /src
import Content from "@/components/Content";
import Nav from "@/components/Nav";
export default {
  name: "home",
  components: {
    Content,
    Nav
  }
};
</script>

<style lang="scss">
</style>

