<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Your common layout/header/footer goes here -->

    <!-- The router outlet where components will be rendered -->
    <router-view></router-view>

    <!-- Your common layout/footer goes here -->
  </div>
</template>

<script>
export default {
  // Component logic goes here
};
</script>

<style>
input,
textarea {
  outline: groove;
}
</style>
