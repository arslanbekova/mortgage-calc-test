<template>
  <div id="app">
    <CalcItems />
    <Result />
  </div>
</template>

<script>
import CalcItems from '@/components/CalcItems'
import Result from '@/components/Result'
export default {
  name: 'app',
  components: {
    CalcItems,
    Result,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;

  margin: 0 auto;
  padding-top: 50px;
  width: 1200px;

  display: flex;
  justify-content: space-around;
}
</style>
