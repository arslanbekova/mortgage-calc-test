<template>
  <div id="app">
    <Calculator />
  </div>
</template>

<script>
import Calculator from '@/components/Calculator';
export default {
  name: `App`,
  components: {
    Calculator,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;

  margin: 0 auto;
  padding-top: 50px;
  width: 1200px;
}
</style>
